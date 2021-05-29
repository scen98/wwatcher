import React  from 'react'
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { IHourly } from '../../../common/OneCall'
import { getPrecFromHourly } from '../../models/weatherManager';

interface IHourlyPrecChart {
    hourlies: IHourly[];
    title: string;
}

const Container = styled.div`
    width: 90%;
    margin: auto;
    background: #2193b0; 
    border-radius: 10px;
    box-shadow: 0 0 10px #61bae4;
`

const Chart = styled(Bar)`
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
`;

const Title = styled.h2`
    text-align: center;
    padding-top: 10px;
`;

export const HourlyPrecChart: React.FC<IHourlyPrecChart> = ({ hourlies, title }) => {
    return (
        <Container>
            <Title>{title}</Title>
            <Chart type="bar" data={{
                labels: hourlies.map(d => `${new Date(d.dt * 1000).getHours()}:00`),
                datasets: [
                    {
                        label: 'Csapadék (mm)',
                        data: hourlies.map(d => getPrecFromHourly(d)),
                        backgroundColor: [
                            'rgba(22, 104, 211, 0.95)',
                        ],
                        borderWidth: 3,

                    }
                ]
            }} options={{
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ],
                },
                title: {
                    display: true,
                    text: 'Csapadékmennyiség',
                    fontSize: 25
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            }} />
        </Container>
    )
}
export default HourlyPrecChart;

