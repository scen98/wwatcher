/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { IDaily, IHourly } from '../../common/OneCall';
import { useRatio } from '../Components/customHooks';
import SearchInput from '../Components/Normals/SearchInput';
import { getLocationByName, WindyOverlay } from '../models/geoManager';
import { getParameter } from '../models/urlManager';
import { getOneCall } from '../models/weatherManager';
import { WeatherContext } from '../Weather';
import DailyTempChart from '../Components/Charts/DailyTempChart';
import { DailyPrecChart } from '../Components/Charts/DailyPrecChart';
import HourlyTempChart from '../Components/Charts/HourlyTempChart';
import HourlyPrecChart from '../Components/Charts/HourlyPrecChart';


const MainContainer = styled.div`
    margin: auto;
    padding: 15px;
    max-width: 1300px;
    min-height: 600px;
`

const Frame = styled.iframe`
    width: 100%;
    height: 800px;
    margin-top: 30px;
    border-radius: 10px;
    box-shadow: 0 0 15px white;
    border: 2px solid #278dec;
`;

const SearchContainer = styled.div`
    padding-top: 10px;
`;

const Errorbox = styled.p`
    margin: 0;
    text-align: center;
    padding-top: 10px;
`;

const ChartDiv = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    margin-top: 20px;
    @media screen and (max-width: 800px){
        display: block;
    }
`;

export default function MapPage() {
    const [frame, listenFrame, cleanFrameListener] = useRatio<HTMLIFrameElement>(0.5625);
    const { currentLocation, dailies, hourlies, updateOneCall, setCurrentLocation } = useContext(WeatherContext);
    const [msg, setMsg] = useState("");

    useEffect(()=>{
        listenFrame();
        return ()=>{
            cleanFrameListener();
        }
    }, []);

    async function search(query: string){
        const locations = await getLocationByName(query);
        if(locations == null || locations.length === 0){
            setMsg("Nincs találat");
        } else {
            updateOneCall({ lat: locations[0].lat, long: locations[0].lon });
            setCurrentLocation({ lat: locations[0].lat, long: locations[0].lon, name: locations[0].name, country: locations[0].country });
            setMsg("");
        }
    }
    
    return (
        <MainContainer>
            <SearchContainer>
                <SearchInput onSearch={(s)=>{ search(s) }} placeHolder="Gyorskeresés" />
                <Errorbox>{msg}</Errorbox>
            </SearchContainer>    
            <Frame ref={frame} src={`https://embed.windy.com/embed2.html?lat=${currentLocation.lat}&lon=${currentLocation.long}&detailLat=${currentLocation.lat}&detailLon=${currentLocation.long}&width=${window.innerWidth * 0.8}&height=${window.innerWidth * 0.8 * 0.5625}&zoom=${9}&level=surface&overlay=${getParameter("overlay")}&product=radar&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`} />
            {getParameter("overlay") === WindyOverlay.radar ?
            (<Fragment>
                <ChartDiv>
                    <HourlyTempChart title={`Hőmérséklet a következő 24 órában (${currentLocation.name})`} hourlies={hourlies.slice(0, 25)} />
                    <HourlyPrecChart hourlies={hourlies.slice(0, 25)} title={`Csapadék a következő 24 órában (${currentLocation.name})`} />
                </ChartDiv>
            </Fragment> 
            ):
            (<Fragment></Fragment>)}
            
            {getParameter("overlay") === WindyOverlay.temperature ?
            (<Fragment>
                <ChartDiv>
                    <DailyTempChart title={`Hőmérséklet a kövtkező 7 napban (${currentLocation.name})`} dailies={dailies} />
                    <HourlyTempChart title={`Hőmérséklet a következő 24 órában (${currentLocation.name})`} hourlies={hourlies.slice(0, 25)} />
                </ChartDiv>
                
            </Fragment>):
            (<Fragment></Fragment>)}
             {getParameter("overlay") === WindyOverlay.clouds ?
            (<Fragment>
                <ChartDiv>
                    <DailyPrecChart title={`Csapadék a következő 7 napban (${currentLocation.name})`} dailies={dailies} />
                    <HourlyPrecChart hourlies={hourlies.slice(0, 25)} title={`Csapadék a következő 24 órában (${currentLocation.name})`} />
                </ChartDiv>
            </Fragment>):
            (<Fragment></Fragment>)}
        </MainContainer>
    )
}
