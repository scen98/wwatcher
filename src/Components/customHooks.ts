import { useRef, MutableRefObject, useState } from "react";

export function useRatio<T>(ratio: number){
    const ref = useRef<T>();

    const trySetheight = () => {
        try{
            setHeight();
        } catch{
            console.log("Resize of undefined object.")
        }   
    }

    const listen = () => {
        setHeight();
        window.addEventListener("resize", trySetheight);
    }

    const cleanUp = ()=>{
        window.removeEventListener("resize", trySetheight);
    }

    const setHeight = ()=>{
        const width = (ref as unknown as MutableRefObject<HTMLDivElement>).current.offsetWidth;
        (ref as unknown as MutableRefObject<HTMLDivElement>).current.style.height = (width * ratio).toString() + "px"; /* what the fuck is this? */
    }
    return [ref as MutableRefObject<T>, listen, cleanUp, setHeight] as const;
}

export function onEnter(event: React.KeyboardEvent<HTMLInputElement>, callback: ()=>any){
    if (event.key === 'Enter') {
        callback();
    }
}


export interface IWindowState{
    name: string;
    maxValue: number;
}

export function useWindow(maxMobile: number){
    const [isMobile, setIsMobile] = useState<boolean>(maxMobile >= window.innerWidth);
    const listen = ()=>{
        window.addEventListener("resize", ()=>{
            windowStateSetter();
        });
    }
    const cleanUpListener = ()=>{
        window.removeEventListener("resize", ()=>{
            windowStateSetter();
        });
    }
    const windowStateSetter = ()=>{
        setIsMobile(maxMobile >= window.innerWidth);
    }
    return [isMobile, listen, cleanUpListener] as const;
}