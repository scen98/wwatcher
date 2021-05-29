/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import styled from "styled-components"
import Header from './Components/Headers/Header';
import WeatherProvider from './Weather';
import { Switch, Route } from "react-router-dom"
import WeatherPage from './Pages/WeatherPage';
import MapPage from './Pages/MapPage';
import CustomLocationPage from './Pages/CustomLocationPage';
import Footer from './Components/Headers/Footer';

const Body = styled.div`
  background: #2c7cb1;
  margin: auto;
  min-width: 80%;
  padding-bottom: 100px;
`;

function App() {
  return (
    <WeatherProvider>
      <Header />
      <Body>
        <Switch>
          <Route exact path="/wwatcher" component={WeatherPage} />
          <Route exact path="/wwatcher/fooldal" component={WeatherPage} />
          <Route exact path="/wwatcher/terkep" render={() => <MapPage key={new Date().getTime()} />} />
          <Route exact path="/wwatcher/helyszin" component={CustomLocationPage} />
        </Switch>
      </Body>
      <Footer />
    </WeatherProvider>

  );
}

export default App;
