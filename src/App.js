import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import './App.css';

const App= () => {
  return (
    <div className="App">
      <div id ="event-list">
        <NumberOfEvents></NumberOfEvents>
        <CitySearch />
        <EventList />
      </div>
    </div>
  );
}

export default App;
