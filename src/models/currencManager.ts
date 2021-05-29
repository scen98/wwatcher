export interface ICurrencyRequestParam{
    from: string;
    to: string;
}

export interface ICurrencyResponse{
    [key: string]: ICurrencyValue;
}

interface ICurrencyValue{
    val: number;
}

export const CurrencyCodes = [
    "EUR",
    "GBP",
    "USD",
    "CHF",
    "RON",
    "PLN",
    "CZK",
    "INR",
    "CNY"
]

export async function getCurrencies(params: ICurrencyRequestParam): Promise<ICurrencyResponse | null>{
    const response = await fetch(`https://free.currconv.com/api/v7/convert?apiKey=ae53ad07d8edaea9f1a6&q=${params.from}_${params.to}&compact=y`);
    if(response.ok){
        return await response.json();
    }
    return null;
}