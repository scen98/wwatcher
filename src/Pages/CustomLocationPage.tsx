/* eslint-disable react-hooks/exhaustive-deps */
import { faLocationArrow, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components';
import SearchInput from '../Components/Normals/SearchInput';
import SearchResultBox from '../Components/Normals/SearchResultBox';
import { arecitiesEqual, deleteLocation, getCities, getDefaultCoordinates, getLocationByName, getLocationName, ICity, loadLocations, saveLocation } from '../models/geoManager';
import { ILocationPagePreferences, defaultStorage, getPreferences, setLocationPagePreferences } from "../models/uiPreferenceManager"
import { ContainerName, Title } from './WeatherPage';
const PageTitle = styled.h2`
    text-align: center;
`;

const Container = styled.div`
    padding-top: 20px;
    margin: auto;
    min-width: 70%;
    min-height: 900px;
`;

const SearchContainer = styled.div`
  margin-top: 10px;
  padding: 0;
`;

const ResultContainer = styled.div`
    margin: auto;
    width: 85%;
    background: rgba(46, 92, 104, 0.6);
    padding: 0 10px 15px 10px;
    border-radius: 10px;
    margin-top: 15px;
`;

const MyContainer = styled.div`
    margin: auto;
    width: 85%;
    background: rgba(186, 54, 238, 0.6);
    padding: 0 10px 15px 10px;
    border-radius: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
`;

const BoxText = styled.p`
    font-size: 17px;
    padding-top: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: center;
    
`;

const DefaultContainer = styled.div`
    margin: auto;
    width: 85%;
    background: rgba(46, 92, 104, 0.6);
    padding: 0 10px 15px 10px;
    border-radius: 10px;
`;

const CurrentLocationDiv = styled.div`
    width: 150px;
    margin: auto;
    margin-bottom: 15px;
    button{
        width: 100%;
        margin: auto;       
        border-radius: 10px;
        padding: 7px;
        background: #ad5389;
        border: none;
        font-size: 18px;
        color: white;
        :hover{
            background: #89216B;
            box-shadow: 0 0 10px #89216B;
        }
        svg{
            margin-right: 5px;
            font-size: 20px;
        }
    }
`;

const CurrentLocationButton = styled.button`

`;


export default function CustomLocationPage() {
    const [searchedLocations, setSearchedLocations] = useState<ICity[]>([]);
    const [myLocations, setMyLocations] = useState<ICity[]>([]);
    const [defaultLocations, setDefaultLocations] = useState<ICity[]>([]);
    const [preferences, setPreferences] = useState<ILocationPagePreferences>(defaultStorage.locationPage);
    const [boxMessage, setBoxMessage] = useState("");

    useEffect(() => {
        getLocations();
        setDefaultOpens();
    }, []);

    useEffect(() => {
        if (preferences.popular) {
            if (defaultLocations.length === 0) {
                requestDefaults();
            }
        }
    }, [preferences.popular]);

    async function requestLocations(query: string) {
        const response = await getLocationByName(query);
        if (response.length > 0) {
            setSearchedLocations(response.map(l => {
                return { name: l.name, lat: l.lat, long: l.lon, country: l.country }
            }));
            setBoxMessage("");
        } else {
            setSearchedLocations([]);
            setBoxMessage("Nincs találat.");
        }
    }

    async function requestDefaults() {
        const locations = await getCities();
        if (locations != null) {
            setDefaultLocations(locations);
        }
    }

    function getLocations() {
        setMyLocations(loadLocations());
    }

    function addLocation(city: ICity) {
        if (myLocations.some(m => arecitiesEqual(m, city))) {
            alert("Ez a koordináta már el van mentve.");
            return false;
        }
        saveLocation(city);
        setMyLocations([...myLocations, city]);
        return true;
    }

    function removeLocation(city: ICity) {
        deleteLocation(city);
        setMyLocations(myLocations.filter(l => !(l.name === city.name && l.lat === city.lat, l.long === city.long)));
    }

    async function requestCurrentLocation() {
        const coordinates = await getDefaultCoordinates();
        const location = await getLocationName(coordinates);
        console.log(location)
        setSearchedLocations([location]);
    }

    function setDefaultOpens() {
        setPreferences(getPreferences().locationPage);
    }

    function switchPopular() {
        const newPreferences = setLocationPagePreferences({ ...preferences, popular: !preferences.popular });
        setPreferences(newPreferences.locationPage);
    }

    function switchSearch() {
        const newPreferences = setLocationPagePreferences({ ...preferences, search: !preferences.search });
        setPreferences(newPreferences.locationPage);
    }

    function switchSaved() {
        const newPreferences = setLocationPagePreferences({ ...preferences, saved: !preferences.saved });
        setPreferences(newPreferences.locationPage);
    }

    return (
        <Container>
            <PageTitle>Időjárás helyének beállítása</PageTitle>
            <ResultContainer>
                <Title>
                    <ContainerName>Keresés</ContainerName>
                    <button onClick={() => { switchSearch(); }}>
                        {preferences.search ?
                            (<FontAwesomeIcon icon={faMinus} />) :
                            (<FontAwesomeIcon icon={faPlus} />)}
                    </button>
                </Title>

                {preferences.search ?
                    (<Fragment>
                        <CurrentLocationDiv>
                            <button onClick={requestCurrentLocation}>
                                <FontAwesomeIcon icon={faLocationArrow} />
                            Jelenlegi hely
                </button>
                        </CurrentLocationDiv>
                        <SearchContainer>
                            <SearchInput onSearch={(s) => { requestLocations(s) }} />
                        </SearchContainer>
                        {searchedLocations.length > 0 ?
                            (<BoxText>{boxMessage}</BoxText>) :
                            (<BoxText>{boxMessage}</BoxText>)}
                        {searchedLocations.map(l => {
                            return <SearchResultBox key={`result-${l.lat}-${l.long}`} location={l} onButtonClicked={() => { addLocation(l) }} allCities={myLocations} />
                        })}
                    </Fragment>) :
                    (<Fragment></Fragment>)}

            </ResultContainer>
            <MyContainer>
                <Title>
                    <ContainerName>Mentett helyeim</ContainerName>
                    <button onClick={() => { switchSaved(); }}>
                        {preferences.saved ?
                            (<FontAwesomeIcon icon={faMinus} />) :
                            (<FontAwesomeIcon icon={faPlus} />)}
                    </button>
                </Title>
                {preferences.saved ?
                    (<Fragment>
                        {myLocations.length > 0 ?
                            (<Fragment></Fragment>) :
                            (<BoxText>Egyelőre egy helyet sem mentettél el.</BoxText>)}
                        {myLocations.map(m => {
                            return <SearchResultBox key={`my-${m.lat}-${m.long}`} location={m} onButtonClicked={() => { removeLocation(m) }} save={false} />
                        })}
                    </Fragment>) :
                    (<Fragment></Fragment>)}

            </MyContainer>
            <DefaultContainer>
                <Title>
                    <ContainerName>Népszerű</ContainerName>
                    <button onClick={() => { switchPopular() }}>
                        {preferences.popular ?
                            (<FontAwesomeIcon icon={faMinus} />) :
                            (<FontAwesomeIcon icon={faPlus} />)}
                    </button>
                </Title>
                {preferences.popular ?
                    (<Fragment>
                        {defaultLocations.map(d => {
                            return <SearchResultBox key={`default-${d.name}`} location={d} onButtonClicked={() => { addLocation(d) }} allCities={myLocations} />
                        })}
                    </Fragment>) :
                    (<Fragment></Fragment>)}
            </DefaultContainer>
        </Container>

    )
}

