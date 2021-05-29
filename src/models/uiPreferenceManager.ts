
export interface IPreferenceStorage{
    locationPage : ILocationPagePreferences;
    mainPage: IMainPagePreferences;
}

export interface ILocationPagePreferences{
    popular: boolean;
    search: boolean;
    saved: boolean;
}

export interface IMainPagePreferences{
    today: boolean;
    week: boolean;
}

export const defaultStorage = {
    locationPage: {
        popular: false,
        search: true,
        saved: true
    },
    mainPage: {
        today: true,
        week: true
    }
}

export function setMainPagePreferences(mainPage: IMainPagePreferences){
    const preferences = getPreferences();
    const newPreferences: IPreferenceStorage = { ...preferences, mainPage };
    window.localStorage.setItem("preferences", JSON.stringify(newPreferences));
    return newPreferences;
}

export function setLocationPagePreferences(locationPage: ILocationPagePreferences){
    const preferences = getPreferences();
    const newPreferences: IPreferenceStorage = { ...preferences, locationPage };
    window.localStorage.setItem("preferences", JSON.stringify(newPreferences));
    return newPreferences;
}

export function getPreferences(): IPreferenceStorage{
    const storage = window.localStorage.getItem("preferences");
    if(storage == null){
        return defaultStorage;
    }
    return JSON.parse(storage);
}