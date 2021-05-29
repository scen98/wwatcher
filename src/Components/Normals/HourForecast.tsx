/* eslint-disable react-hooks/exhaustive-deps */
import { faSnowflake, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useContext, useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { IHourly } from '../../../common/OneCall'
import { getTemperature, getTempTheme, getWindSpeed, iconImagePath } from '../../models/weatherManager';
import { WeatherContext } from '../../Weather';

interface IHourForecast {
    hour: IHourly;
}

const Container = styled.div`
    border: 1px solid #b4b4b4;
    min-width: 80px;
    margin-right: 5px;
    margin-left: 5px;
    border-radius: 15px;
    height: 100%;
    background-color: ${props => props.theme.background};
`;

export const DayTheme = {
    background:"rgba(190, 169, 49, 0.459)"
}

export const NightTheme = {
    background:"rgba(70, 68, 59, 0.459)"
}

export const TransTheme = {
    background:"rgba(197, 89, 16, 0.459)"
}

const Time = styled.div`
    width: 100%;
    height: 35px;
    background: #000000;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #434343, #000000);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #434343, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    padding-top: 15px;
    font-size: 16px;
    font-weight: bold;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
`;

const WeatherIcon = styled.img`
    width: 100%;
`;

const Temperature = styled.div`
    font-weight: bold;
    width: 100%;
    background: ${props => props.theme.background};
    margin: auto;
    padding-top: 10px;
    height: 40px;
    font-size: 21px;
    -webkit-text-stroke: 0.2px black;
`;

const IconContainer = styled.div`
    padding-top: 8px;
    height: 30px;
    width: 100%;
`

const Icon = styled(FontAwesomeIcon)`
    font-size: 30px;
    width: 100%;
    margin: auto;
`;

const IconText = styled.p`
    font-weight: bold;
    background: #485563;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #29323c, #485563);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #29323c, #485563); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    width: 100%;
    margin-top: 3px;
    font-size: 17px;
`;

export const HourForecast: React.FC<IHourForecast> = ({ hour }) => {
    const { current } = useContext(WeatherContext);
    const [currentTheme, setCurrentTheme] = useState(DayTheme);

    useEffect(()=>{
        setTheme();
    }, [hour.dt]);

    function setTheme(){
        const sunriseHour = new Date(current.sunrise * 1000).getHours();
        const sunsetHour = new Date(current.sunset * 1000).getHours();
        const currentHour = new Date(hour.dt * 1000).getHours();
        if(currentHour === sunriseHour || currentHour === sunsetHour){
            setCurrentTheme(TransTheme);
            return;
        }
        if(currentHour > sunriseHour && currentHour < sunsetHour){
            setCurrentTheme(DayTheme);
            return;
        }
        setCurrentTheme(NightTheme);
        return;
    }

    return (
        <ThemeProvider theme={currentTheme}>
        <Container>
            <Time>
                {`${new Date(hour.dt * 1000).getHours()}:00`}
            </Time>
            <WeatherIcon src={iconImagePath(hour.weather[0].icon)} />
            <ThemeProvider theme={getTempTheme(hour.temp)} >
                <Temperature title="Hőmérséklet">
                    {getTemperature(hour.temp)}
                </Temperature>
            </ThemeProvider>
            <IconContainer>
                <Icon icon={faWind} />
            </IconContainer>
            <IconText>{getWindSpeed(hour.wind_speed)}</IconText>
            {hour.rain != null ?
                (<Fragment>
                    <IconContainer>
                        <Icon icon={faTint} />
                    </IconContainer>
                    <IconText>{Object.values(hour.rain)[0] as string} mm</IconText>
                </Fragment>) :
                (<Fragment></Fragment>)}
            {hour.snow != null ?
                (<Fragment>
                    <IconContainer>
                        <Icon icon={faSnowflake} />
                    </IconContainer>
                    <IconText>{Object.values(hour.snow)[0] as string} mm</IconText>
                </Fragment>) :
                (<Fragment></Fragment>)}
          
        </Container>
        </ThemeProvider>
    )
}
