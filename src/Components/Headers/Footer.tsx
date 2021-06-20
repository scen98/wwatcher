/* eslint-disable react-hooks/exhaustive-deps */
import { faCalendarDay, faCalendarWeek, faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { CurrencyCodes, getCurrencies } from '../../models/currencyManager';
import { getNames } from '../../models/nameDayManager';
import { useWindow } from '../customHooks';

const Container = styled.div`
   left: 0;
   bottom: 0;
   width: 100%;
   background: #0F2027;
    height: 100px;
   color: white;
   text-align: center;
   display: grid;
   grid-template-columns: auto auto auto;
`;

const CurrencyContainer = styled.div`
    width: 150px;
    margin: auto;
    p{
        padding-top: 3px;
    }
`;

const FooterIcon = styled(FontAwesomeIcon)`
    margin-right: 10px;
    font-size: 20px;
`;

const CurrencyTable = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    width: 150px;
    margin: auto; 
`;

const CurrencySelect = styled.select`
    margin-bottom: 5px;
    padding: 3px;
    background: linear-gradient(to top, #232526, #414345); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: white;
    :focus{
        outline: none;
    }
    option{
        color: black;
    }
`;

const ContainerM = styled.div`
   left: 0;
   bottom: 0;
   width: 100%;
   background: #0F2027;
    height: 250px;
   color: white;
   text-align: center;
   padding-top: 2px;
`;

export default function Footer() {
    const [exchangeRate, setExchangeRate] = useState<number>(0);
    const [selectedCode, setSelectedCode] = useState("EUR");
    const [todayNames, setTodayNames] = useState<string[]>([]);
    const [tomorrowNames, setTomorrowNames] = useState<string[]>([]);
    const mobile = useWindow(550);

    useEffect(() => {
        requestCurrencies();
        requestNames();

    }, [selectedCode]);

    const requestCurrencies = async () => {
        const request = await getCurrencies({ from: selectedCode, to: "HUF" });
        if (request != null) {
            setExchangeRate((Object.values(request)[0].val));
        }
    }

    const requestNames = async () => {
        const result = await getNames(new Date());
        if(result != null){
            setTodayNames(result.today);
            setTomorrowNames(result.tomorrow);
        } else {
            setTodayNames(["Szerver hiba"]);
            setTomorrowNames([]);
        }  
    }

    return (
        <Fragment>
            {mobile ?
                (<ContainerM>
                    <CurrencyContainer>
                        <p><FooterIcon icon={faCoins} />HUF árfolyam</p>
                        <CurrencyTable>
                            <CurrencySelect value={selectedCode} onChange={(e) => { setSelectedCode(e.target.value) }} >
                                {CurrencyCodes.map(c => {
                                    return <option key={`s-${c}`} value={c}>{c}</option>
                                })}
                            </CurrencySelect>
                            <span>{Math.round(exchangeRate * 100) / 100}</span>
                        </CurrencyTable>
                    </CurrencyContainer>
                    <div>
                        <p><FooterIcon icon={faCalendarDay} />Mai névnap</p>
                        <span>{todayNames.join(", ")}</span>
                    </div>
                    <div>
                        <p><FooterIcon icon={faCalendarWeek} />Holnapi névnap</p>
                        <span>{tomorrowNames.join(", ")}</span>
                    </div>
                </ContainerM>) :
                (<Container>
                    <CurrencyContainer>
                        <p><FooterIcon icon={faCoins} />HUF árfolyam</p>
                        <CurrencyTable>
                            <CurrencySelect value={selectedCode} onChange={(e) => { setSelectedCode(e.target.value) }} >
                                {CurrencyCodes.map(c => {
                                    return <option key={`s-${c}`} value={c}>{c}</option>
                                })}
                            </CurrencySelect>
                            <span>{Math.round(exchangeRate * 100) / 100}</span>
                        </CurrencyTable>
                    </CurrencyContainer>
                    <div>
                        <p><FooterIcon icon={faCalendarDay} />Mai névnap</p>
                        <span>{todayNames.join(", ")}</span>
                    </div>
                    <div>
                        <p><FooterIcon icon={faCalendarWeek} />Holnapi névnap</p>
                        <span>{tomorrowNames.join(", ")}</span>
                    </div>
                </Container>)}

        </Fragment>

    )
}
