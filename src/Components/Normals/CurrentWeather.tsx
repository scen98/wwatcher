import dateFormat from 'dateformat';
import React, { useContext, useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components';
import { coldTheme, getTemperature, getTempTheme, iconImagePath } from '../../models/weatherManager';
import { WeatherContext } from '../../Weather'
import Sunrise from './Sunrise';
import { Sunset } from './Sunset';

const CurrentBox = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    border-radius: 10px;
    background: ${props=> props.theme.background};
    color: white;
    padding: 5px;
    padding-bottom: 10px;
    max-height: 250px;
    margin-top: 40px;
    margin-left: 10px;
    margin-right: 10px;
    box-shadow: 0 0 10px #fff;
    -webkit-text-stroke: 0.2px black;
    text-align: center;
`;

const TempDiv = styled.div`
    font-size: 50px;
    font-weight: bold;
    margin-top: 25px;
    padding-left: 20px;
`;

const WeatherIcon = styled.img`
    margin: auto;
    margin-top: 0;
    margin-bottom: 0;
    width: 110px;
`

const StandardCell = styled.div`
    font-size: 18px;
    padding: 0px;
`;

const Title = styled.span`
    color: #f8f5f5;
`;

const Data = styled.span`
    font-weight: bold;
    font-size: 18px;
`;

export default function CurrentWeather() {
    const { current } = useContext(WeatherContext);
    const [currentTheme, setCurrentTheme] = useState(coldTheme);

    useEffect(()=>{
        if(!current){
            setCurrentTheme(coldTheme);
        } else {
            setCurrentTheme(getTempTheme(current.temp));
        }       
    }, [current]);

    return (
        <div>
            <ThemeProvider theme={currentTheme} >
                <CurrentBox>
                    <TempDiv>
                        {getTemperature(current.temp)}
                    </TempDiv>
                    <WeatherIcon src={iconImagePath(current.weather[0].icon)} alt="Időjárás ikon" />
                    <StandardCell>
                        <Title>Hőérzet</Title>
                        <br/>
                        <Data>{getTemperature(current.feels_like)}</Data>
                    </StandardCell>
                    <StandardCell>
                        <Title>Fronthatás</Title>
                        <br/>
                        <Data>{current.weather[0].description}</Data>
                    </StandardCell>
                    <StandardCell>
                        <Title>Szélsebesség</Title>
                        <br/>
                        <Data>{Math.round(current.wind_speed)} km/h</Data> 
                    </StandardCell>
                    <StandardCell>
                        <Title>Páratartalom</Title>
                        <br/>
                        <Data>{current.humidity}%</Data> 
                    </StandardCell>
                </CurrentBox>
                <Sunrise content={dateFormat(new Date(current.sunrise * 1000), "H:MM")} />
                <Sunset content={dateFormat(new Date(current.sunset * 1000), "H:MM")} />
            </ThemeProvider>
        </div>
    )
}
