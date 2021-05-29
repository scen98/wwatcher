
interface IDates {
    day: number;
    month: number;
}

interface INamedays {
    hu: string;
}

interface IData {
    dates: IDates;
    namedays: INamedays;
}

export interface INameDayResponse {
    data: IData;
}

export async function getNames(date: Date): Promise<string[]>{
    const response = await fetch(`https://api.abalin.net/namedays?country=hu&month=${date.getMonth() + 1}&day=${date.getDate()}`);
    if(!response.ok){
        return [];
    }
    const data: INameDayResponse = await response.json();
    return data.data.namedays.hu.split(",");
}