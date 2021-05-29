/* eslint-disable react-hooks/exhaustive-deps */
import { faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { IHourly } from '../../../common/OneCall'
import { getPrecFromHourly, getTemperature, getTempThemeMobile, getWindSpeed, iconImagePath } from '../../models/weatherManager';
import { WeatherContext } from '../../Weather';

interface IHourForeCast {
    hourly: IHourly;
}

const DayTheme = {
    background: "linear-gradient(to right, #fc4a1a, #f7b733);"
}

const NightTheme = {
    background: "linear-gradient(to right, #526069, #414345);" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

const TransTheme = {
    background: "linear-gradient(to right, #352121, #e74c3c);"
}

const Container = styled.div`
    width: 100%;
    height: 60px;
    display: grid;
    grid-template-columns: 55px auto 70px 70px 70px;
    text-align: center;
    background: ${props => props.theme.background};
    img{
        width: 60px;
        margin: auto;
    }
    border: 1px rgba(50, 114, 141, 0.6) solid;
`;

const TimeDiv = styled.div`
    background: linear-gradient(to left, #434343, #000000);
    padding-top: 16px;
    font-weight: bold;   
`;

const TempDiv = styled.div`
    background: ${props => props.theme.background};
    font-size: 18px;
    font-weight: bold;
    padding-top: 16px;
    border-left: 1px solid black;
    border-right: 1px solid black;
`;

const SecondaryIcon = styled(FontAwesomeIcon)`
    font-size: 30px;
    margin-top: 7px;
`;

export const HourForecastM: React.FC<IHourForeCast> = ({ hourly }) => {
    const [mainTheme, setMainTheme] = useState(NightTheme);
    const { current } = useContext(WeatherContext);

    useEffect(() => {
        const sunriseHour = new Date(current.sunrise * 1000).getHours();
        const sunsetHour = new Date(current.sunset * 1000).getHours();
        const currentHour = new Date(hourly.dt * 1000).getHours();
        if (currentHour === sunriseHour || currentHour === sunsetHour) {
            setMainTheme(TransTheme);
            return;
        }
        if (currentHour > sunriseHour && currentHour < sunsetHour) {
            setMainTheme(DayTheme);
            return;
        }
        setMainTheme(NightTheme);
        return;
    }, []);

    return (
        <ThemeProvider theme={mainTheme}>
            <Container>
                <TimeDiv>
                    {new Date(hourly.dt * 1000).getHours()}:00
                </TimeDiv>
                <img src={iconImagePath(hourly.weather[0].icon)} alt={`Órás előrejelzés - ${new Date(hourly.dt * 1000).getHours()}:00`} />
                <ThemeProvider theme={getTempThemeMobile(hourly.temp)}>
                    <TempDiv>
                        {getTemperature(hourly.temp)}
                    </TempDiv>
                </ThemeProvider>
                <div>
                    <SecondaryIcon icon={faWind} />
                    <br />
                    <span>{getWindSpeed(hourly.wind_speed)}</span>
                </div>
                <div>
                    {getPrecFromHourly(hourly) !== 0 ?
                        (<Fragment>
                            <SecondaryIcon icon={faTint} />
                            <br />
                            <span>{getPrecFromHourly(hourly)} mm</span>
                        </Fragment>) :
                        (<Fragment></Fragment>)}
                </div>
            </Container>
        </ThemeProvider>
    )
}
export default HourForecastM;