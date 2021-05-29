/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from 'react'
import { ICurrent, IDaily, IHourly } from "../common/OneCall"
import { defaultLocation, getDefaultCoordinates, getLastCoordinates, ICity, IGeoCoordinates, saveCurrentCoordinates } from './models/geoManager';
import { getOneCall } from './models/weatherManager';

export interface IWeatherContext {
    dailies: IDaily[];
    hourlies: IHourly[];
    current: ICurrent;
    updateOneCall: (coordinates: IGeoCoordinates) => void;
    currentLocation: ICity;
    setCurrentLocation: (newLocation: ICity)=>void;
}

const defaultCurrent: ICurrent = {
    "dt": 1620385293,
    "sunrise": 1620357451,
    "sunset": 1620410575,
    "temp": 10,
    "feels_like": 10,
    "pressure": 1000,
    "humidity": 0,
    "dew_point": 10,
    "uvi": 2,
    "clouds": 90,
    "visibility": 10000,
    "wind_speed": 0,
    "wind_deg": 210,
    "weather": [
        {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
        }
    ],
}

export const WeatherContext = createContext<IWeatherContext>({ dailies: [], hourlies: [], current: defaultCurrent, updateOneCall: () => { }, currentLocation: defaultLocation, setCurrentLocation: ()=>{  } }, );

export const WeatherProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [dailies, setDailies] = useState<IDaily[]>([]);
    const [hourlies, setHourlies] = useState<IHourly[]>([]);
    const [current, setCurrent] = useState<ICurrent>(defaultCurrent);
    const [currentLocation, setCurrentLocation] = useState<ICity>(defaultLocation);

    const state = {
        current,
        dailies,
        hourlies,
        updateOneCall,
        currentLocation,
        setCurrentLocation
    }

    useEffect(() => {
        initialRequest();
    }, []);

    useEffect(()=>{
        saveCurrentCoordinates(currentLocation);
    }, [currentLocation]);

    async function initialRequest() {
        const lastCoordinates = getLastCoordinates();
        if(lastCoordinates != null){
            updateOneCall(lastCoordinates);
            setCurrentLocation(lastCoordinates);
        } else {
            const currentCoordinates = 
            await getDefaultCoordinates(); //defaultLocation;
            updateOneCall(currentCoordinates);
        }
    }

    async function updateOneCall(coordinates: IGeoCoordinates) {
        const response = await getOneCall(coordinates);
        if (response) {
            setDailies(response.daily);
            setHourlies(response.hourly);
            setCurrent(response.current);
            
        } else {
            alert("Szerver hiba: nem tudtuk letölteni a működéshez szükséges adatokat.");
        }
    }

    useEffect(()=>{
        document.title = `Időjárás - ${currentLocation.name}`;
    }, [currentLocation]);

    return (
        <WeatherContext.Provider value={state}>
            {children}
        </WeatherContext.Provider>
    )
}

export default WeatherProvider;