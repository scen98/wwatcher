import React, { useEffect, useState, Fragment } from 'react'
import styled from 'styled-components'
import { IDaily } from '../../../common/OneCall';
import { getDay } from '../../models/vocabManager';
import DayForecast from './DayForecast';
import DetailedDaily from './DetailedDaily';

interface IDailyForecast{
    dailies: IDaily[];
}

const ForecastContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
    border-style: solid;
    background: #3fce43;
    width: 733px;
    overflow: hidden;
    border-color: green;
    border-width: 3px;
    border-radius: 10px;
    box-shadow: 0 0 20px white;
    border-bottom-width: 0px;
`;

export const DailyForecast: React.FC<IDailyForecast> = ({dailies}) => {
    const [selectedDay, setSelectedDay] = useState<IDaily | null>(null);

    useEffect(()=>{
        if(dailies.length > 0){
            setSelectedDay(dailies[1]);
        }
    }, [dailies]);

    const getDayName = (day: IDaily) => getDay(new Date(day.dt * 1000)).short;

    return (
        <Fragment>        
            <ForecastContainer>
            {dailies.map(d=> {
                return <DayForecast key={`day-${d.dt}`} day={d} selectedDay={selectedDay} click={(newSelected: IDaily)=>{ setSelectedDay(newSelected) }} dayName={getDayName(d)} />
            })}
            </ForecastContainer>
            {selectedDay != null ?
            (<DetailedDaily day={selectedDay} />):
            (<Fragment></Fragment>)}         
        </Fragment>
    )
}

export default DailyForecast;