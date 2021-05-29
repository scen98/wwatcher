/* eslint-disable react-hooks/exhaustive-deps */
import { faCalendar, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, Fragment } from 'react'
import styled, { css, ThemeProvider } from 'styled-components'
import { IDaily } from '../../../common/OneCall'
import { getTemperature, getWindSpeed, iconImagePath } from '../../models/weatherManager';

interface IDayForecast {
    day: IDaily;
    selectedDay: IDaily | null;
    click: (day: IDaily) => void;
    dayName: string;
}

const SelectedTheme = {
    bordercolor: "#654ea3",
    background: "linear-gradient(to top, #654ea3, #eaafc8);",
    boxshadow: "0 0 15px purple;",
    overflow: "100"
}

const UnSelectedTheme = {
    bordercolor: "rgba(46, 44, 44, 0.3);",
    background: "none",
    boxshadow: "none",
    overflow: "10"
}

const Container = styled.div`
    border-style: solid;
    border-width: 1px;
    border-color: ${props => props.theme.bordercolor};
    min-width: 90px;
    max-width: 90px;
    text-align: center;
    cursor: pointer;
    background: ${props => props.theme.background};
    box-shadow: ${props => props.theme.boxshadow};
    overflow-y: ${props => props.theme.overflow};
    :hover{
        background-color: rgba(235, 235, 235, 0.2);
    }
`;

const CalendarContainer = styled.div`
    position: relative;
`;

const Icon = styled(FontAwesomeIcon)`
    font-size: 60px;
    margin: auto;
`;

const CalendarText = styled.span`
    margin: 0;
    position: absolute;
    top: 60%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: black;
    font-size: 20px;
    font-weight: bold;
`;

const WeatherImage = styled.img`
    width: 90px;
    margin: auto;
`
const Temp = css`
    text-align: center;
    height: 30px;
    font-size: 18px;
    padding-top: 8px;
`;

const MaxTemp = styled.div`
    ${Temp}
    background: linear-gradient(to top, #93291E, #ED213A); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const MinTemp = styled.div`
    ${Temp}
    background: linear-gradient(to top, #667db6, #0082c8, #0082c8, #667db6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const SubIcon = styled(FontAwesomeIcon)`
    width: 100%;
    font-size: 35px;
    margin-top: 3px;
    margin-bottom: 3px;
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

export const WeekdayTheme = {
    color: "gray"
}

export const WeekendTheme = {
    color: "#973d3d"
}

const DayText = styled.span`
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    font-style: italic;
    color: ${props => props.theme.color};
    -webkit-text-stroke: 0.2px black;
`;

export const DayForecast: React.FC<IDayForecast> = ({ day, click, selectedDay, dayName }) => {
    const [prec, setPrec] = useState(0);
    const [currentTheme, setCurrentTheme] = useState(UnSelectedTheme);
    const [weekTheme, setWeekTheme] = useState(WeekdayTheme);

    useEffect(() => {
        let result = 0;
        if (day.rain != null) {
            result += day.rain;
        }
        if (day.snow != null) {
            result += day.snow;
        }
        setPrec(Math.round(result * 10) / 10);
    }, [day.rain, day.snow]);

    useEffect(() => {
        if (selectedDay === day) {
            setCurrentTheme(SelectedTheme);
        } else {
            setCurrentTheme(UnSelectedTheme);
        }
    }, [selectedDay]);

    useEffect(() => {
        const dayNumber = new Date(day.dt * 1000).getDay();
        if (dayNumber === 0 || dayNumber === 6) {
            setWeekTheme(WeekendTheme);
        } else {
            setWeekTheme(WeekdayTheme);
        }
    }, [day.dt]);

    return (
        <ThemeProvider theme={currentTheme} >
            <Container onClick={() => { click(day); }} >
                <CalendarContainer>
                    <Icon icon={faCalendar} />
                    <CalendarText>{new Date(day.dt * 1000).getDate()}</CalendarText>
                </CalendarContainer>
                <ThemeProvider theme={weekTheme}>
                    <DayText>{dayName}</DayText>
                </ThemeProvider>

                <WeatherImage src={iconImagePath(day.weather[0].icon)} />
                <MaxTemp>
                    {getTemperature(day.temp.max)}
                </MaxTemp>
                <MinTemp>
                    {getTemperature(day.temp.min)}
                </MinTemp>
                <SubIcon icon={faWind} />
                <IconText>{getWindSpeed(day.wind_speed)}</IconText>
                {prec > 0 ?
                    (<Fragment>
                        <SubIcon icon={faTint} />
                        <IconText>{prec} mm</IconText>
                    </Fragment>) :
                    (<Fragment></Fragment>)}
            </Container>
        </ThemeProvider>
    )
}

export default DayForecast;