/* eslint-disable react-hooks/exhaustive-deps */
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import { InfoAlert, ErrorAlert, OfflineAlert } from './components/Alert';
import './App.css';
import { useState, useEffect } from 'react';
import { extractLocations, getEvents } from './api';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [offlineAlert, setOfflineAlert] = useState("");

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    let offlineText;
    if (navigator.onLine) {
      offlineText = ""
    } else {
      offlineText = "No network connection, this is a cached version"
    }
    setOfflineAlert(offlineText);
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <h1 className='title'>Meet</h1>
      <div className='alerts-container'>
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
        {offlineAlert.length ? <OfflineAlert text={offlineAlert}/> : null}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents 
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}
      />
      <div className='charts-container'>
        <EventGenresChart
          events={events}
        />
        <CityEventsChart
          allLocations={allLocations}
          events={events}
        />
      </div>
      <EventList
        events={events}
      />
    </div>
  );
};

export default App;