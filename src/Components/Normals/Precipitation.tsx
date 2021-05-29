import { faSnowflake, faTint, faTintSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { IDaily } from '../../../common/OneCall'

interface IPrecipitation{
    day: IDaily;
}

const Container = styled.div`
    padding: 5px;
    text-align: center;
    background: linear-gradient(to bottom, #00b4db, #0083b0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0 0 5px #40bdee;
    padding-top: 10px;
    height: 155px;
    p{
        margin-bottom: 3px;
    }
`;

const MainIcon = styled(FontAwesomeIcon)`
    font-size: 50px;
    width: 100%;
`;

const Title = styled.h3`
    margin-top: 5px;
    margin-bottom: 5px;
`;

export const Precipitation: React.FC<IPrecipitation> = ({day}) => {
    const [mainIcon, setMainIcon] = useState(faTintSlash);
    useEffect(()=>{
        if(day.snow != null){
            setMainIcon(faSnowflake);
        } else if(day.rain != null){
            setMainIcon(faTint);
        } else {
            setMainIcon(faTintSlash);
        }    
    }, [day.pop, day.rain, day.snow]);

    return (
        <Container>          
            <MainIcon icon={mainIcon} />
            <Title>Csapadék</Title>
            <p>Esély: <b>{day.pop*100}%</b></p>
            {day.rain != null ? 
            (<p>Eső: <b>{day.rain} mm</b></p>):
            (<Fragment></Fragment>)}
            {day.snow != null ?
            (<p>Hó: <b>{day.snow} mm</b></p>):
            (<Fragment></Fragment>)}
            {day.rain != null && day.snow != null ?
            (<p>Összesen: <b>{day.rain + day.snow} mm</b></p>):
            (<Fragment></Fragment>)}
        </Container>
    )
}

export default Precipitation;