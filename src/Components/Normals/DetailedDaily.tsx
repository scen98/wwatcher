import { faCloud, faSun, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dateFormat from 'dateformat';
import React from 'react'
import styled from 'styled-components'
import { IDaily } from '../../../common/OneCall'
import { dayVocab, monthVocab } from '../../models/vocabManager';
import Precipitation from './Precipitation';
import Sunrise from './Sunrise';
import { Sunset } from './Sunset';
import TempTable from './TempTable';

interface IDetailedDaily {
    day: IDaily;
}

const Container = styled.div`
    background: #654ea3;
    max-width: 800px;
    margin: auto;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 15px purple;
`;

const FirstRow = styled.div`
    display: grid;
    grid-template-columns: auto 150px 150px;
    margin-top: 15px;
`

const DateHeader = styled.span`
    font-size: 22px;
    font-weight: bold;
    padding-left: 10px;
`;

const SecondRow = styled.div`
    display: grid;
    grid-template-columns: 320px 280px 210px;
    div{
        padding: 5px;
        border-radius: 10px;
        margin-left: 10px;
        margin-right: 10px;
    }
`;

export const Windbox = styled.div`
    display: grid;
    grid-template-columns: 50px auto;
    height: 50px;
    background: linear-gradient(to left, #00d2ff, #3a7bd5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    svg{
        font-size: 50px;
    }
    div{
        text-align: left;
        margin-top: 0;
    }
`;

export const Cloudbox = styled.div`
    background: linear-gradient(to right, #0f2027, #203a43, #2c5364); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    display: grid;
    grid-template-columns: 50px auto;
    height: 70px;
    svg{
        margin-top: 13px;
        font-size: 45px;
    }
    div{
        margin-top: 0;
    }
`;

export const UVBox = styled.div`
    background: #F37335;
    height: 25px;
    svg{
        font-size: 20px;
        margin-right: 5px;
    }
`

export const DetailedDaily: React.FC<IDetailedDaily> = ({ day }) => {

    const constructHeader = () => {
        const dayDate = new Date(day.dt * 1000);
        const dayName = dayVocab[dayDate.getDay()].name;
        const monthName = monthVocab[dayDate.getMonth()].name;
        return `${monthName} ${dayDate.getDate()}. ${dayName}`;
    }

    return (
        <Container>
            <DateHeader>{constructHeader()}</DateHeader>
            <FirstRow>
                <div>              
                    <TempTable day={day} />
                </div>
                <div>
                    <Precipitation day={day} />
                </div>
                <div>
                    <Sunrise content={dateFormat(new Date(day.sunrise * 1000), "H:MM")} />
                    <Sunset content={dateFormat(new Date(day.sunset * 1000), "H:MM")} />   
                </div>            
            </FirstRow>
            <SecondRow>
                <Windbox>
                    <FontAwesomeIcon icon={faWind} />
                    <div>
                        Szél-sebesség: <b>{day.wind_speed} km/h</b>
                        <br/>
                        Szél-irány: <b>{day.wind_deg}°</b>
                    </div>
                </Windbox>
                <Cloudbox>
                    <FontAwesomeIcon icon={faCloud} />
                    <div>
                        Felhősség: <b>{day.clouds}%</b>
                        <br/>
                        Páratartalom: <b>{day.humidity}%</b>
                        <br/>
                        Légnyomás: <b>{day.pressure} hPa</b>
                    </div>                    
                </Cloudbox>
                <UVBox>
                    <FontAwesomeIcon icon={faSun} />
                    Max UV Index: <b>{day.uvi}</b>
                </UVBox>
            </SecondRow>
        </Container>
    )
}

export default DetailedDaily;