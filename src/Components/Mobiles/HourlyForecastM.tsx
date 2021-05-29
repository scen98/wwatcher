import React, { useContext } from 'react'
import styled from 'styled-components'
import { WeatherContext } from '../../Weather'
import HourForecastM from './HourForecastM'

interface IHourlyForeCastM{

}

const Container = styled.div`
    width: 100%;
    margin-top: 20px;
    border: 1px solid blue;
    box-shadow: 0 0 10px lightblue;
`;

export const HourlyForecastM: React.FC<IHourlyForeCastM> = () => {
    const { hourlies } = useContext(WeatherContext);
    return (
        <Container>
            {hourlies.slice(1, 25).map(h=>{
                return <HourForecastM key={`hourly-m-${h.dt}`} hourly={h} />
            })}
        </Container>
    )
}

export default HourlyForecastM;