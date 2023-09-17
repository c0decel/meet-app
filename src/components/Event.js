import { getEvents } from '../api';
import { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(true);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
    return (
      <li id="event-item">
        <div className='event'>
            <div className='summary'>{event.summary}</div>
            <div className='location'>{event.location}</div>
           {showDetails && <div className='details'>{event.description}</div> }
            <button className='detailbutton' onClick={toggleDetails}>
              {showDetails ? 'Show Details' : 'Hide Details'}
            </button>
        </div>
      </li>
    );
  }
  export default Event;