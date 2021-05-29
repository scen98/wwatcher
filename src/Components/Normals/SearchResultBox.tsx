/* eslint-disable react-hooks/exhaustive-deps */
import { faCheckSquare, faSave, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import styled from 'styled-components'
import { arecitiesEqual, ICity } from '../../models/geoManager';
import { WeatherContext } from '../../Weather';

interface ISearchResultBox {
    location: ICity;
    onButtonClicked: ()=>any;
    save?: boolean;
    allCities?: ICity[];
}

const Container = styled.div`
    cursor: pointer;
    background: RGBA(33,147,176, 1);
    width: 100%;
    display: grid;
    grid-template-columns: auto 80px;
    margin-top: 15px;
    border-radius: 10px;
    box-shadow: 0 0 5px #4e4ef1;
    transition: 0.3s all;
    button{
        border: none; 
        :hover{
            box-shadow: 0 0 10px lightblue;      
        }
        transition: 1s all;
    }
    :hover{
        box-shadow: 0 0 15px white;
        background: #00B4DB;
    }
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: 80px auto;
`

const Infobox = styled.div`
    padding: 13px;
`;

const LocationName = styled.span`
    font-size: 18px;
    font-weight: bold;
`;

const LocationDesc = styled.span`
    margin-top: 10px;
`;

const CountryFlag = styled.img`
    margin: auto;
    width: 90%;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
`;

const SaveButton = styled.button`
    background: #6dd5ed;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    svg{
        font-size: 30px;
        color: #210b9e;
        transition: 1s color;
    }
    :hover{    
        svg{
            color: #116811;
            
        }       
        background:#15f171;                    
    }
    
`;

const DeleteButton = styled.button`
    background: #93291E;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    svg{
        color: #cec2c2;
        font-size: 30px;
        transition: 1s color;
    }
    :hover{    
        svg{
            color: white;          
        }       
        background:#dd1818;
        box-shadow: 0 0 10px lightblue;                    
    }
    transition: 1s all;
`;

export const SearchResultBox: React.FC<ISearchResultBox> = ({ location, save = true, onButtonClicked, allCities = [] } ) => {
    const history = useHistory();
    const { setCurrentLocation, updateOneCall } = useContext(WeatherContext);
    const [saveIcon, setSaveIcon] = useState<IconDefinition>(faSave);

    useEffect(()=>{
        if(allCities.some(c => arecitiesEqual(c, location))){
            setSaveIcon(faCheckSquare);
        } else {
            setSaveIcon(faSave);
        }
    }, [location, allCities]);

    function onRowClick(){
        setCurrentLocation(location);
        updateOneCall(location);
        history.push("/wwatcher/fooldal");
    }

    return (
        <Container>
            <Content onClick={onRowClick} >
                <CountryFlag src={`https://www.countryflags.io/${location.country}/shiny/64.png`} />
                <Infobox>
                    <LocationName>{location.name} ({location.country})</LocationName>
                    <br />
                    <LocationDesc>Koordináták: [{location.lat}, {location.long}]</LocationDesc>
                </Infobox>
            </Content>
            
            {save ?
            (<SaveButton onClick={onButtonClicked} ><FontAwesomeIcon icon={saveIcon} /></SaveButton>):
            (<DeleteButton onClick={onButtonClicked} ><FontAwesomeIcon icon={faTrash} /></DeleteButton>)}
            
        </Container>
    )
}

export default SearchResultBox;