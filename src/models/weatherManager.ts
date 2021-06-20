import { IDaily, IHourly, IOneCall } from "../../common/OneCall";
import { IGeoCoordinates } from "./geoManager";
import { getDay } from "./vocabManager";

export function iconImagePath(iconName: string){
  return `http://openweathermap.org/img/wn/${iconName}@2x.png`;
}

export async function getOneCall(coordinates: IGeoCoordinates): Promise<IOneCall | null>{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lang=hu&lat=${coordinates.lat}&lon=${coordinates.long}&exclude=minutely&units=metric&appid=90b2d9f98db0480e403da333470ed642`);
    if(response.ok){
      return (await response.json() as IOneCall);
    } else {
      return null;
    }
}

export const getTempTheme = (temp: number) => {
  if(temp > 30){
      return hotTheme;
  } 
  if(temp > 15){
      return warmTheme;
  } 
  if(temp > 0){
      return coldTheme;
  } 
  return frozenTheme;
}

export const getTempThemeMobile = (temp: number) => {
  if(temp > 30){
    return hotThemeM;
} 
if(temp > 15){
    return warmThemeM;
} 
if(temp > 0){
    return coldThemeM;
} 
return frozenTheme;
}

export const getWindSpeed = (windspeed: number) =>  `${Math.round(windspeed)} km/h`;
 
export const getTemperature = (degrees: number) => `${Math.round(degrees)}°`;

export const getPrecFromDaily = (day: IDaily) => {
  const rain = day.rain != null ? day.rain : 0;
  const snow = day.snow != null ? day.snow : 0;
  return rain + snow;
}

export const getPrecFromHourly = (hour: IHourly) => {
  const rain = hour.rain != null && Object.values(hour.rain).length > 0 ? Object.values(hour.rain)[0] as number : 0;
  const snow = hour.snow != null && Object.values(hour.snow).length > 0 ? Object.values(hour.snow)[0] as number : 0;
  return rain + snow;
}

export const getAllTemps = (day: IDaily) => {
  return [day.temp.morn, day.temp.day, day.temp.eve, day.temp.night];
}

export const getTempStrings = (day: IDaily) => {
  const date = new Date(day.dt * 1000);
  const dayShort = getDay(date).name;
  return [`${dayShort} reg.`, `${dayShort} nap`, `${dayShort} este`, `${dayShort} éj.`];
}

export const hotTheme = {
  background: "linear-gradient(to top, #f12711, #f5af19);"
}

export const warmTheme = {
  background: "linear-gradient(to bottom, #fdc830, #f37335);"
}

export const coldTheme = {
  background: "linear-gradient(to bottom, #1CB5E0, #3838c0);"
}

export const frozenTheme = {    
  background: "linear-gradient(to top, #000428, #004e92);"
}

export const hotThemeM = {
  background: "linear-gradient(to right, #f12711, #f5af19);"
}

export const warmThemeM = {
  background: "linear-gradient(to left, #fdc830, #f37335);"
}

export const coldThemeM = {
  background: "linear-gradient(to left, #1CB5E0, #3838c0);"
}

export const frozenThemeM = {    
  background: "linear-gradient(to right, #000428, #004e92);"
}