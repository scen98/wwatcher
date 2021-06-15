import { faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import styled from 'styled-components';

interface ISunrise{
    content: string;
}

const SunriseStyle = styled.div`
    margin: 10px auto;
    width: 110px;
    height: 65px;
    border-radius: 10px;
    font-size: 22px;
    font-weight: bold;
    padding-bottom: 1px;
    padding-top: 5px;
    text-align: center;
    background: #f5af19;
    box-shadow: 0 0 10px #f3f31d;
`;

export const SunIcon = styled(FontAwesomeIcon)`
    font-size: 30px;
    width: 100%;
`;

export const Sunrise:React.FC<ISunrise> = ({content})=> {
    return (
        <SunriseStyle title="Napkelte">
        <SunIcon icon={faSun} />
        <br/>
        {content}
    </SunriseStyle>
    )
}

export default Sunrise;