import React from 'react'
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { IDaily } from '../../../common/OneCall';
import { getDay } from '../../models/vocabManager';
import { getPrecFromDaily } from '../../models/weatherManager';

interface IDailyPrecChart {
    dailies: IDaily[];
    title: string;
}

const DiaDiv = styled.div`
    width: 90%;
    margin: auto;
    background: #2193b0; 
    border-radius: 10px;
    box-shadow: 0 0 10px #61bae4;
`

const Diagram = styled(Bar)`
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
`;

const Title = styled.h2`
    text-align: center;
    padding-top: 10px;
`;

export const DailyPrecChart: React.FC<IDailyPrecChart> = ({ dailies, title }) => {
    return (
        <DiaDiv>
            <Title>{title}</Title>
            <Diagram type="bar" data={{
                labels: dailies.map(d => getDay(new Date(d.dt * 1000)).name),
                datasets: [
                    {
                        label: 'Csapadék (mm)',
                        data: dailies.map(d => getPrecFromDaily(d)),
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
        </DiaDiv>
    )
}
