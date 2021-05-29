import React  from 'react'
import { Line } from 'react-chartjs-2';
import styled from 'styled-components'
import { IDaily } from '../../../common/OneCall'
import { getAllTemps, getTempStrings } from '../../models/weatherManager';

interface IDailyTempChart {
    dailies: IDaily[];
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
    background: rgba(255, 255, 255, 0.5);
    width: 100%;
    border-radius: 10px;
`;

const Title = styled.h2`
    text-align: center;
    padding-top: 10px;
`;

export const DailyTempChart: React.FC<IDailyTempChart> = ({ dailies, title }) => {
    return (
        <Container>
            <Title>{title}</Title>
            <LineChart type="line" data={{
                labels: Array.prototype.concat.apply([], dailies.map(d => getTempStrings(d))),
                datasets: [
                    {
                        label: 'Hőmérséklet (celsius)',
                        data: Array.prototype.concat.apply([], dailies.map(d => getAllTemps(d))),
                        backgroundColor: [
                            'rgb(252, 59, 172)',
                            'rgb(255, 204, 36)',
                            'rgb(163, 0, 0)',
                            'rgb(53, 52, 42)',
                        ],
                        borderColor:
                            'rgba(255, 187, 0, 0.842)',
                        pointBorderColor: [
                            'rgb(252, 59, 172)',
                            'rgb(255, 204, 36)',
                            'rgb(163, 0, 0)',
                            'rgb(53, 52, 42)',
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

export default DailyTempChart;