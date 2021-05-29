
export interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface ICurrent {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: IWeather[];
}

export interface IWeather2 {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface IHourly {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: IWeather2[];
    pop: number;
    rain?: any;
    snow?: any;
}

export interface ITemp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

export interface IFeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}

export interface IWeather3 {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface IDaily {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: ITemp;
    feels_like: IFeelsLike;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: IWeather3[];
    clouds: number;
    pop: number;
    uvi: number;
    rain?: number;
    snow?: number;
}

export interface IOneCall {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: ICurrent;
    hourly: IHourly[];
    daily: IDaily[];
}

