/* eslint-disable react-hooks/exhaustive-deps */
import { faCloud, faGlobeEurope, faMapMarkerAlt, faTable, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { WindyOverlay } from '../../models/geoManager';
import { WeatherContext } from '../../Weather'





export default function Header() {
    const { currentLocation } = useContext(WeatherContext);
    const [mainClass, setMainClass] = useState("topnav");

    function openMenu() {
        if (mainClass === "topnav") {
            setMainClass("topnav responsive");
        } else {
            setMainClass("topnav");
        }
    }

    function closeMenu() {
        setTimeout(() => { setMainClass("topnav"); }, 250);
    }

    return (
        <Fragment>
            <div className={mainClass} >
                <div onClick={() => { closeMenu() }} >
                    <Link to="/wwatcher/helyszin"><FontAwesomeIcon icon={faMapMarkerAlt} className="map-icon" />{currentLocation.name}</Link>
                    <Link to="/wwatcher/fooldal"><FontAwesomeIcon icon={faTable} className="menu-icon" />Időjárás</Link>
                    <Link to={`/wwatcher/terkep?overlay=${WindyOverlay.radar}`}><FontAwesomeIcon icon={faGlobeEurope} className="menu-icon" />Radar</Link>
                    <Link to={`/wwatcher/terkep?overlay=${WindyOverlay.temperature}`}><FontAwesomeIcon icon={faTemperatureHigh} className="menu-icon" />Hőmérséklet</Link>
                    <Link to={`/wwatcher/terkep?overlay=${WindyOverlay.clouds}`}><FontAwesomeIcon icon={faCloud} className="menu-icon" />Felhőzet</Link>
                </div>
                <a href="javascript:void(0);" onClick={openMenu} className="icon" >&#9776;</a>
            </div>

        </Fragment>
    )
}
