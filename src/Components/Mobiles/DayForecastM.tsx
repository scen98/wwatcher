import { faCalendar, faCaretDown, faCaretUp, faCloud, faSun, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useEffect, useState } from 'react'
import styled, { css, ThemeProvider } from 'styled-components'
import { IDaily } from '../../../common/OneCall'
import { getTemperature, getWindSpeed, iconImagePath } from '../../models/weatherManager';
import { WeekdayTheme, WeekendTheme } from '../Normals/DayForecast';
import Precipitation from '../Normals/Precipitation';
import Sunrise from '../Normals/Sunrise';
import TempTable from '../Normals/TempTable';
import dateFormat from 'dateformat';
import { Sunset } from '../Normals/Sunset';

interface IDayForecastM {
    day: IDaily;
    dayName: string;
}

const RegularTheme = {
    background: "linear-gradient(to right, #56ab2f, #a8e063);"
}

const ExpandedTheme = {
    background: "linear-gradient(to top,#654ea3,#eaafc8);"
}

const RowContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 60px auto 60px 60px 40px;    
    background: ${props => props.theme.background};
    border-top: 1px solid rgba(30, 105, 139, 0.6); 
    img{
        width: 80px;
    }
`;

const CalendarContainer = styled.div`
    position: relative;
    text-align: center;
    svg{
        font-size: 60px;
        margin: auto;
        margin-left: 5px;
    }
`;

const CalendarText = styled.span`
    margin: 0;
    position: absolute;
    top: 40%;
    left: 53%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: black;
    font-size: 18px;
    font-weight: bold;
`;

const WeekDayText = styled.span`
    margin: 0;
    position: absolute;
    top: 60%;
    left: 53%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: black;
    font-weight: bold;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    font-style: italic;
    color: ${props => props.theme.color};
    -webkit-text-stroke: 0.2px black;
`;

const Temp = css`
    text-align: center;
    font-size: 18px;
    padding-top: 25px;
    width: 100%;
    font-weight: bolder;
`;

const MaxTemp = styled.div`
    ${Temp}
    background: linear-gradient(to right, #93291E, #ED213A); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const MinTemp = styled.div`
    ${Temp}
    background: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const ExpandBtn = styled.button`
    background: #654ea3;
    color: white;
    border: none;
    box-shadow: 0 0 3px #3d093d;
    svg{
        font-size: 35px;
    }
`;

const DetailContainer = styled.div`
    background: #654ea3;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    margin-bottom: 15px;
`;

const PrecAndSunGrid = styled.div`
    display: grid;
    grid-template-columns: auto auto;
`;

const Windbox = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    background: linear-gradient(to left, #00d2ff, #3a7bd5);
    width: 93%;
    margin: auto;
    border-radius: 5px;
    margin-bottom: 15px;
    svg{
        font-size: 50px;
    }
`;

const Cloudbox = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
    width: 93%;
    margin: auto;
    margin-bottom: 15px;
    border-radius: 5px;
    svg{
        margin-top: 13px;
        font-size: 50px;
        margin-left: 4px;
    }
`;

const IconText = styled.p`
    margin-top: 3px;
    margin-bottom: 4px;
    font-size: 17px;
`;

const UVIbox = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    background: #F37335;
    width: 93%;
    margin: auto;
    margin-bottom: 15px;
    border-radius: 5px;
    svg{
        margin-top: 5px;
        font-size: 22px;
        margin-left: 4px;
        margin-bottom: 5px;
    }
`;

const CloseButton = styled.button`
    background: none;
    width: 100%;
    border: none;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    margin: none;
    svg{
        font-size: 40px;
        color: white;
    }
`;

export const DayForecastM: React.FC<IDayForecastM> = ({ day, dayName }) => {
    const [weekTheme, setWeekTheme] = useState(WeekdayTheme);
    const [mainTheme, setMainTheme] = useState(RegularTheme);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const dayNumber = new Date(day.dt * 1000).getDay();
        if (dayNumber === 0 || dayNumber === 6) {
            setWeekTheme(WeekendTheme);
        } else {
            setWeekTheme(WeekdayTheme);
        }
    }, [day.dt]);

    useEffect(() => {
        if (isExpanded) {
            setMainTheme(ExpandedTheme);
        } else {
            setMainTheme(RegularTheme);
        }
    }, [isExpanded]);

    return (
        <ThemeProvider theme={mainTheme}>
            <RowContainer>
                <CalendarContainer>
                    <FontAwesomeIcon icon={faCalendar} />
                    <CalendarText>{new Date(day.dt * 1000).getDate()}</CalendarText>
                    <ThemeProvider theme={weekTheme}>
                        <WeekDayText>{dayName}</WeekDayText>
                    </ThemeProvider>
                </CalendarContainer>
                <img src={iconImagePath(day.weather[0].icon)} alt={`ido-ikon`} />
                <MaxTemp>
                    {getTemperature(day.temp.max)}
                </MaxTemp>
                <MinTemp>
                    {getTemperature(day.temp.min)}
                </MinTemp>
                <ExpandBtn onClick={() => { setIsExpanded(!isExpanded) }} >
                    <FontAwesomeIcon icon={isExpanded ? faCaretUp : faCaretDown} />
                </ExpandBtn>
            </RowContainer>
            {isExpanded ?
                (<DetailContainer>
                    <TempTable day={day} showMinMax={false} />
                    <PrecAndSunGrid>
                        <Precipitation day={day} />
                        <div>
                            <Sunrise content={dateFormat(new Date(day.sunrise * 1000), "H:MM")} />
                            <Sunset content={dateFormat(new Date(day.sunset * 1000), "H:MM")} />
                        </div>
                    </PrecAndSunGrid>
                    <Windbox>
                        <FontAwesomeIcon icon={faWind} />
                        <div>
                            <IconText>Szélsebesség: <b>{getWindSpeed(day.wind_speed)}</b></IconText>
                            <IconText>Szélirány: <b>{day.wind_deg}°</b></IconText>
                        </div>
                    </Windbox>
                    <Cloudbox>
                        <FontAwesomeIcon icon={faCloud} />
                        <div>
                            <IconText>Felhősség: <b>{day.clouds}%</b></IconText>
                            <IconText>Páratartalom: <b>{day.humidity}%</b></IconText>
                            <IconText>Légnyomás: <b>{day.pressure} hPa</b></IconText>
                        </div>
                    </Cloudbox>
                    <UVIbox>
                        <FontAwesomeIcon icon={faSun} />
                        <div>
                            <IconText>Max UV index: <b>{day.uvi}</b></IconText>
                        </div>
                    </UVIbox>
                    <CloseButton onClick={()=>{ setIsExpanded(false) }}>
                        <FontAwesomeIcon icon={faCaretUp} />
                    </CloseButton>
                </DetailContainer>) :
                (<Fragment></Fragment>)}
        </ThemeProvider>
    )
}

export default DayForecastM;
