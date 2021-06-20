import { ILocation } from "../../common/Location";

export interface IGeoCoordinates {
  long: number;
  lat: number;
}

export enum WindyOverlay {
  radar = "radar",
  temperature = "temp",
  clouds = "clouds",
  rainACcu = "rainAccu",
  thunder = "thunder"
}

export interface ICity extends IGeoCoordinates {
  name: string;
  country: string;
}

export interface IWindyParams extends ICity {
  zoom: number;
  //overlay: WindyOverlay;
}

const storageKey = "locations";

export const defaultLocation: ICity = { name: "Budapest", lat: 47.498, long: 19.0399, country: "HU" };

export const getLastCoordinates = () => {
  const storage = window.localStorage.getItem("lastCoordinates");
  if(storage != null){
    return JSON.parse(storage) as ICity;
  }
  return null;
}

export const saveCurrentCoordinates = (city: ICity) => {
  window.localStorage.setItem("lastCoordinates", JSON.stringify(city));
}

export const getDefaultCoordinates = async (): Promise<IGeoCoordinates> => {
  try {
    return await getCurrentCoordinates();
  } catch (err) {
    console.log(err);
    return defaultLocation;
  }
}

export const getCurrentCoordinates = async (): Promise<IGeoCoordinates> => {
  const pos: any = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  return {
    long: pos.coords.longitude,
    lat: pos.coords.latitude,
  };
};

export const getLocationName = async (coordinate: IGeoCoordinates): Promise<ICity> => {
  const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${coordinate.lat}&lon=${coordinate.long}&limit=1&appid=90b2d9f98db0480e403da333470ed642`);
  if (response.ok) {
    const cities = await response.json() as ILocation[];
    if (cities.length < 1) {
      return { name: "Ismeretlen", long: 0, lat: 0, country: "HU" }
    }
    if (cities[0].name.includes("Budapest")) {
      return { name: "Budapest", long: cities[0].lon, lat: cities[0].lat, country: "HU" };
    }
    return { name: cities[0].name, long: cities[0].lon, lat: cities[0].lat, country: "HU" }
  }
  return { name: "Ismeretlen", long: 0, lat: 0, country: "HU" }
}

export const getCities = async (): Promise<ICity[] | null> => {
  const response = await fetch("/wwatcher/node/json/cityvocab.json");
  if (!response.ok) {
    return null;
  }
  return await response.json();
}

export const getWindyParams = async (): Promise<IWindyParams[]> => {
  const response = await fetch("/wwatcher/node/json/locationvocab.json");
  if (response.ok) {
    return await response.json();
  }
  return [];
}

export const getWindyId = (param: IWindyParams) => `${param.lat}-${param.long}-${param.zoom}`;

export const getLocationByName = async (name: string): Promise<ILocation[]> => {
  const response = await fetch(encodeURI(`https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=90b2d9f98db0480e403da333470ed642`));
  if(response.ok){
    return await response.json();
  }
  return [];
}

export const loadLocations = (): ICity[] => {
  const storage = window.localStorage.getItem("locations");
  if(storage != null){
    return JSON.parse(storage);
  }
  return [];
}

export const saveLocation = (toSave: ICity) => {
  const storage = window.localStorage.getItem(storageKey);
  const currentLocales: ICity[] = storage != null ? JSON.parse(storage) : [];
  window.localStorage.setItem(storageKey, JSON.stringify([ ...currentLocales, toSave]));
}

export const deleteLocation = (toDelete: ICity) => {
  const storage = window.localStorage.getItem(storageKey);
  if(storage == null){
    return false;
  }
  const currentLocales: ICity[] = JSON.parse(storage);
  const newStorage = currentLocales.filter(l=> !(l.name === toDelete.name && l.lat === toDelete.lat && l.long === toDelete.long));
  window.localStorage.setItem(storageKey, JSON.stringify(newStorage));
  return true;
}

export const arecitiesEqual = (city1: ICity, city2: ICity) => city1.name === city2.name && city1.lat === city2.lat && city1.long === city2.long;