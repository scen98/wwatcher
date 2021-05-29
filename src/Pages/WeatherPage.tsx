/* eslint-disable react-hooks/exhaustive-deps */
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useContext, useEffect, Fragment } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { DailyPrecChart } from '../Components/Charts/DailyPrecChart';
import DailyTempChart from '../Components/Charts/DailyTempChart';
import { useWindow } from '../Components/customHooks';
import DailyForecastM from '../Components/Mobiles/DailyForecastM';
import HourlyForecastM from '../Components/Mobiles/HourlyForecastM';
import CurrentWeather from '../Components/Normals/CurrentWeather';
import DailyForecast from '../Components/Normals/DailyForecast';
import HourlyForecast from '../Components/Normals/HourlyForecast';
import { defaultStorage, getPreferences, IMainPagePreferences, setMainPagePreferences } from '../models/uiPreferenceManager';
import { WeatherContext } from '../Weather';
import { Title } from './CustomLocationPage';

interface IWeatherTheme {
    id: number;
    url: string;
}

const themes: IWeatherTheme[] = [
    {
        id: 1,
        url: "/wwatcher/node/img/clearsky.jpg",
    },
    {
        id: 2,
        url: "/wwatcher/node/img/clearskynight.jpg"
    },
    {
        id: 200,
        url: "/wwatcher/node/img/storm.jpg"
    },
    {
        id: 300,
        url: "/wwatcher/node/img/drizzle.jpg"
    },
    {
        id: 500,
        url: "/wwatcher/node/img/rain.jpg"
    },
    {
        id: 600,
        url: "/wwatcher/node/img/snow.jpg"
    },
    {
        id: 700,
        url: "/wwatcher/node/img/mist.jpg"
    },
    {
        id: 800,
        url: "/wwatcher/node/img/rain.jpg"
    },
];

const CurrentWeatherDiv = styled.div`
    display: grid;
    grid-template-columns: 300px auto;
    text-align: center;
    background-image: url(${props => props.theme.url});
    height: 500px;
    background-repeat: no-repeat;
    background-attachment: local;
    background-position: 50% 30%;
    background-size: cover;
    overflow: hidden;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    box-shadow: 0 0 15px lightblue;
    padding-left: 8%;
    padding-right: 8%;
`;

const PageTitle = styled.h1`
    text-align: center;
`;

const CurrentBoxM = styled.div`
    padding: 5px;
    background-image: url(${props => props.theme.url});
    background-repeat: no-repeat;
    background-attachment: local;
    background-position: 50% 30%;
    background-size: cover;
    overflow: hidden;
`;

const DropContent = styled.div`
    width: 90%;
    margin: auto;
    margin-top: 15px;
    background: rgba(12, 14, 10, 0.5);
    padding: 3%;
    padding-top: 0;
    border-radius: 10px;
`;

const WeekGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    @media screen and (max-width: 1350px){
        display: block;
    } 
`;

const WeekDiv = styled.div`
    margin: auto;
    padding-left: 10px;
`;

const ChartDiv = styled.div`
   padding: 50px;
   @media screen and (min-width: 1350px){       
        max-width: 650px;
    } 
    @media screen and (max-width: 1350px){       
        display: grid;
        grid-template-columns: 50% 50%;
    } 
`;



export default function WeatherPage() {
    const { current, dailies } = useContext(WeatherContext);
    const [currentTheme, setCurrentTheme] = useState<IWeatherTheme>(themes[0]);
    const [isMobile, widthListener, cleaneupWidthListener] = useWindow(830)
    const [preferences, setPreferences] = useState<IMainPagePreferences>(defaultStorage.mainPage);

    useEffect(() => {
        loadPreferences();
        if (!current != null) {
            setTheme();
        }
        widthListener();
        return () => {
            cleaneupWidthListener();
        }
    }, [current]);

    function setTheme() {
        const id = current.weather[0].id;
        if (id === 800) {
            setClearSkyiesTheme();
        } else {
            setNonClearTheme(id);
        }
    }

    function setNonClearTheme(id: number) {
        const roundedId = Math.floor(id / 100) * 100;
        const relevantTheme = themes.find(t => t.id === roundedId);
        if (relevantTheme != null) {
            setCurrentTheme(relevantTheme);
        }
    }

    function setClearSkyiesTheme() {
        const currentTime = new Date().getTime() / 1000;
        if (currentTime > current.sunrise && currentTime < current.sunset) {
            setCurrentTheme(themes[0]);
        } else {
            setCurrentTheme(themes[1]);
        }
    }

    function loadPreferences(){
        const prefs = getPreferences();
        setPreferences(prefs.mainPage);
    }

    function switchToday(){
        const newPref = setMainPagePreferences({ ...preferences, today: !preferences.today });
        setPreferences(newPref.mainPage);
    }

    function switchWeek(){
        const newPref = setMainPagePreferences({ ...preferences, week: !preferences.week });
        setPreferences(newPref.mainPage);
    }

    return (
        <ThemeProvider theme={currentTheme}>
            {isMobile ?
                (<Fragment>
                    <ThemeProvider theme={currentTheme}>
                        <CurrentBoxM>
                            <CurrentWeather />
                        </CurrentBoxM>
                    </ThemeProvider>
                    <DropContent>
                        <Title>
                            Mai előrejelzés
                            <button onClick={() => { switchToday() }}>
                                {preferences.today ?
                                    (<FontAwesomeIcon icon={faMinus} />) :
                                    (<FontAwesomeIcon icon={faPlus} />)}
                            </button>
                        </Title>
                        {preferences.today ?
                            (<HourlyForecastM />) :
                            (<Fragment></Fragment>)}
                    </DropContent>
                    <DropContent>
                        <Title>
                            Heti előrejelzés
                                <button onClick={() => { switchWeek() }}>
                                {preferences.week ?
                                    (<FontAwesomeIcon icon={faMinus} />) :
                                    (<FontAwesomeIcon icon={faPlus} />)}
                            </button>
                        </Title>
                        {preferences.week ?
                        (<DailyForecastM dailies={dailies} />):
                        (<Fragment></Fragment>)}                   
                    </DropContent>
                    <DailyTempChart title="Hőmérséklet alakulása a héten" dailies={dailies} />
                    <DailyPrecChart title="Heti csapadékmennyiség"  dailies={dailies} />    
                </Fragment>) :
                (<Fragment>
                    <CurrentWeatherDiv>
                        <CurrentWeather />
                        <HourlyForecast />
                    </CurrentWeatherDiv>                    
                    <WeekGrid>
                        <WeekDiv>
                            <PageTitle>Heti előrejelzés</PageTitle>
                            <DailyForecast dailies={dailies} />
                        </WeekDiv>                        
                        <ChartDiv>
                            <DailyTempChart title="Hőmérséklet alakulása a héten" dailies={dailies} />
                            <DailyPrecChart title="Heti csapadékmennyiség"  dailies={dailies} />                         
                        </ChartDiv>
                    </WeekGrid>                
                </Fragment>)}
        </ThemeProvider>
    )
}
