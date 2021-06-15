
interface INameDayResponse{
    today: string[];
    tomorrow: string[];
}


export async function getNames(date: Date): Promise<INameDayResponse | null>{
    const response = await fetch(`/wwatcher/node/nameday?year=${date.getFullYear()}&month=${date.getMonth() + 1}&day=${date.getDate()}`);
    if(!response.ok){
        return null
    }
    const data: INameDayResponse = await response.json();
    return data;
}