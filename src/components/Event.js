import { getEvents } from '../api';
import { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

    return (
      <li id="event-item">
        <div className='event'>
            <div className='summary'>{event.summary}</div>
            <div className='location'>{event.location}</div>

            <button className='detailbutton' onClick={() => {
          setShowDetails(!showDetails);
        }}>
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>

            {showDetails ? (
              <div className="details">
                <h4>Event Details</h4>
                <p>Description: {event.description}</p>
                <p>Event status: {event.status}</p>
              </div>
            ) : null}

        </div>
      </li>
    );
  }
  export default Event;