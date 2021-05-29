import React from 'react'
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { IHourly } from '../../../common/OneCall'

interface IHourlyTempChart {
    hourlies: IHourly[];
    title: string;
}

const Container = styled.div`
    background: #FDC830;
    border-radius: 10px;
    box-shadow: 0 0 10px orange;
    width: 90%;
    margin: auto;
`;

const LineChart = styled(Line)`
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.5);
    width: 100%;
`;

const Title = styled.h2`
    text-align: center;
    padding-top: 10px;
`;

export const HourlyTempChart: React.FC<IHourlyTempChart> = ({ hourlies, title }) => {
    return (
        <Container>
            <Title>{title}</Title>
            <LineChart type="line" data={{
                labels: hourlies.map(h => `${new Date(h.dt * 1000).getHours()}: 00`),
                datasets: [
                    {
                        label: 'Hőmérséklet (celsius)',
                        data: hourlies.map(h => h.temp),
                        backgroundColor: [
                            'rgb(201, 115, 3)',
                        ],
                        borderColor:
                            'rgba(255, 115, 0, 0.842)',
                        pointBorderColor: [
                            'rgb(201, 115, 3)',
                        ],
                        pointBorderWidth: 3,
                        tension: 0.2,
                        borderWidth: 3,
                    }
                ]
            }} options={{
                title: {
                    display: false,
                    text: 'Csapadékmennyiség',
                    fontSize: 25
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                //maintainAspectRatio: false
            }} />
        </Container>
    )
}

export default HourlyTempChart;