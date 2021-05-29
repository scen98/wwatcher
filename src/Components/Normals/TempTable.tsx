import { faThermometerEmpty, faThermometerFull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react'
import styled, { css } from 'styled-components';
import { IDaily } from '../../../common/OneCall'
import { getTemperature } from '../../models/weatherManager';

interface ITempTable {
    day: IDaily;
    showMinMax?: boolean;
}

const Container = styled.div`
    background: rgba(10, 10, 10, 0.1);
    border-radius: 5px;
    padding: 1px;
    margin-bottom: 10px;
`;

const TempTableStyle = styled.table`
    text-align: center;
    border-collapse: collapse;
    border-radius: 10px;
    width: 96%;
    margin-top: 10px;
    margin-left: 2%;
    margin-right: 2%;
`;

const Cell = css`
    border: 1px solid black;
    font-weight: bold;
`;

const TempHeader = styled.th`
    ${Cell}
    width: 10px;
    padding: 7px;
    color: black;
    background: linear-gradient(to bottom, #E9E4F0, #D3CCE3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const FillHeader = styled.th`
    ${Cell}
    background: linear-gradient(to bottom, #E9E4F0, #D3CCE3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const TempMorning = styled.td`
    ${Cell}
    background: linear-gradient(to bottom, #e0d2ac, #fdc830); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

`;

const TempDay = styled.td`
    ${Cell}
    background: linear-gradient(to bottom, #fdc830, #e74c3c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

`;

const TempEve = styled.td`
    ${Cell}
    background: linear-gradient(to bottom, #e74c3c, #414345); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

`;

const TempNight = styled.td`
    ${Cell}
    background: linear-gradient(to top, #232526, #414345); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const MaxMinGrid = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    margin: auto;
`;

const GridElement = css`
    width: 50%;
    padding: 5px;
    border-radius: 10px;
    text-align: center;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    svg{
        font-size: 22px;
        margin-right: 5px;
    }
`;

const Max = styled.div`
    ${GridElement}
    background: #ed213a; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const Min = styled.div`
    ${GridElement}
    background: #00d2ff; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

export const TempTable: React.FC<ITempTable> = ({ day, showMinMax = true }) => {
    return (
        <Container>
            <TempTableStyle>
                <tbody>

                    <tr>
                        <FillHeader></FillHeader>
                        <TempHeader>Hőmérséklet</TempHeader>
                        <TempHeader>Hőérzet</TempHeader>
                    </tr>
                    <tr>
                        <TempHeader>Reggel</TempHeader>
                        <TempMorning>{getTemperature(day.temp.morn)}</TempMorning>
                        <TempMorning>{getTemperature(day.feels_like.morn)}</TempMorning>
                    </tr>
                    <tr>
                        <TempHeader>Napközben</TempHeader>
                        <TempDay>{getTemperature(day.temp.day)}</TempDay>
                        <TempDay>{getTemperature(day.feels_like.day)}</TempDay>
                    </tr>
                    <tr>
                        <TempHeader>Este</TempHeader>
                        <TempEve>{getTemperature(day.temp.eve)}</TempEve>
                        <TempEve>{getTemperature(day.feels_like.eve)}</TempEve>
                    </tr>
                    <tr>
                        <TempHeader>Éjszaka</TempHeader>
                        <TempNight>{getTemperature(day.temp.night)}</TempNight>
                        <TempNight>{getTemperature(day.feels_like.night)}</TempNight>
                    </tr>
                </tbody>

            </TempTableStyle>
            {showMinMax ?
            (<MaxMinGrid>
                <Max><FontAwesomeIcon icon={faThermometerFull} /> Max: <b>{getTemperature(day.temp.max)}</b></Max>
                <Min><FontAwesomeIcon icon={faThermometerEmpty} /> Min: <b>{getTemperature(day.temp.min)}</b></Min>
            </MaxMinGrid>):
            (<Fragment></Fragment>)}      
        </Container>
    )
}

export default TempTable;