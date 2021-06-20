import React  from 'react'
import styled from 'styled-components';
import { IDaily } from '../../../common/OneCall'
import { getDay } from '../../models/vocabManager';
import DayForecastM from './DayForecastM';

interface IDailyForecastM{
    dailies: IDaily[];
}

const Container = styled.div`
    width: 100%;
    margin-top: 20px;
    border: 1px solid blue;
    box-shadow: 0 0 10px lightblue;
`;

export const DailyForecastM: React.FC<IDailyForecastM> = ({dailies}) => {
     
    const findDayShort = (day: IDaily) => getDay(new Date(day.dt * 1000)).short;
    
    return (
        <Container>
            {dailies.map(d=>{
                return <DayForecastM key={`daily-${d.dt}`} day={d} dayName={findDayShort(d)} />
            })}
        </Container>
    )
}

export default DailyForecastM;