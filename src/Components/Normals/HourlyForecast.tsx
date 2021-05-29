/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { WeatherContext } from '../../Weather';
import { HourForecast } from './HourForecast';

const HourlyContainer = styled.div`    
    margin-left: 10px;
    margin-right: 10px;
    overflow-y: scroll;
    display: flex;
    flex-direction: row;
    margin-top: 40px;
    padding-top: 10px;
    padding-bottom: 30px;
    padding-left: 5px;
    padding-right: 5px;
    overflow-y: hidden;
    overflow-x: scroll;
    border-style: solid;
    border-width: 1px;
    border-color: #d3cdcd;
    border-bottom-style: none;
    box-shadow: 0 0 15px #fff;
    background-color: rgba(98, 98, 102, 0.25);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    cursor: grab;
    text-align: center;
`;

export default function HourlyForecast() {
    const { hourlies } = useContext(WeatherContext);
    const container = useRef<HTMLDivElement>(null);
    const position = useRef({ left: 0, x: 0 });

    useEffect(()=>{
        container.current!.addEventListener("mousedown", mouseDownHandler);
        container.current!.addEventListener("mouseleave", mouseUpHandler);
        container.current!.addEventListener("wheel", wheelHandler);
        return ()=>{
        }
    },[]);

    function mouseMoveHandler(e: any){
        // How far the mouse has been moved
        const dx = e.clientX - position.current.x;
        // Scroll the element
        container.current!.scrollLeft = position.current.left - dx;
    }

    function mouseUpHandler(){
        container.current!.style.cursor = "grab";
        container.current!.style.removeProperty("user-select");
        container.current?.removeEventListener("mousemove", mouseMoveHandler);
    }

    function mouseDownHandler(e: any){
        // Change the cursor and prevent user from selecting the text
        container.current!.style.cursor = "grabbing";
        container.current!.style.userSelect = "none";
        if(container.current != null){
            position.current = {
                left: container.current.scrollLeft,
                x: e.clientX,
            }
        }
        container.current!.addEventListener("mousemove", mouseMoveHandler);
        container.current!.addEventListener("mouseup", mouseUpHandler);
    }

    function wheelHandler(e: WheelEvent){
        e.preventDefault();
        if(e.deltaY < 0){ //up
            container.current!.scrollLeft = container.current!.scrollLeft + 50;
        } else if(e.deltaY > 0){ //down
            container.current!.scrollLeft = container.current!.scrollLeft - 50;
        }
    }

    return (
        <HourlyContainer ref={container}>
            {hourlies.slice(1, 24).map(h => {
                return <HourForecast key={`hourly-${h.dt}`} hour={h} />
            })}
        </HourlyContainer>
    )
}
