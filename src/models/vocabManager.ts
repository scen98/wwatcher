export interface IDayVocab{
    id: number;
    name: string;
    short: string;
}

export interface IMonthVocab{
    id: number;
    name: string;
    short: string;
}

export const monthVocab: IMonthVocab[] = [
    {
        id : 0,
        name : "Január",
        short : "jan"
    },
    {
        id : 1,
        name : "Február",
        short : "feb"
    },
    {
        id : 2,
        name : "Március",
        short : "márc"
    },
    {
        id : 3,
        name : "Április",
        short : "jan"
    },
    {
        id : 4,
        name : "Május",
        short : "máj"
    },
    {
        id : 5,
        name : "Június",
        short : "jún"
    },
    {
        id : 6,
        name : "Július",
        short : "júl"
    },
    {
        id : 7,
        name : "Augusztus",
        short : "aug"
    },
    {
        id : 8,
        name : "Szeptember",
        short : "szept"
    },
    {
        id : 9,
        name : "Október",
        short : "okt"
    },
    {
        id : 10,
        name : "November",
        short : "nov"
    },
    {
        id : 11,
        name : "December",
        short : "dec"
    }
];

export const dayVocab: IDayVocab[] =  [
    {
        id : 0,
        name : "Vasárnap",
        short : "v"
    },
    {
        id : 1,
        name : "Hétfő",
        short : "h"
    },
    {
        id : 2,
        name : "Kedd",
        short : "k"
    },
    {
        id : 3,
        name : "Szerda",
        short : "sze"
    },
    {
        id : 4,
        name : "Csütörtök",
        short : "cs"
    },
    {
        id : 5,
        name : "Péntek",
        short : "p"
    },
    {
        id : 6,
        name : "Szombat",
        short : "szo"
    }
]

export const getDay = (date: Date) => dayVocab[date.getDay()];

export const getMonth = (date: Date) => monthVocab[date.getMonth()];