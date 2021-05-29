import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import styled, { css } from 'styled-components';

interface ISunset{
    content: string;
}

const Container = css`
    margin: 25px auto;
    width: 110px;
    height: 65px;
    border-radius: 10px;
    font-size: 22px;
    font-weight: bold;
    padding-bottom: 5px;
    text-align: center;
    padding-top: 5px;
    box-shadow: 0 0 10px #302f2f;
`;

export const SunIcon = styled(FontAwesomeIcon)`
    font-size: 30px;
    width: 100%;
`;

export const SunriseStyle = styled.div`
    ${Container}
    background: #f5af19;
`;

export const SunsetStyle = styled.div`
    ${Container}
    background: gray;
`


export const Sunset: React.FC<ISunset> = ({content}) => {
    return (
        <SunsetStyle title="Naplemente">
            <SunIcon icon={faMoon} />
            <br/>
            {content}
        </SunsetStyle>
    )
}
