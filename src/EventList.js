import { Link } from "react-router-dom";
import NaiopData from './StaticData.js';

function EventList() {
  return (
  <div>
    <h1>Upcoming Events:</h1>
    {NaiopData.events.map(event => {
        return(
            <div key={event.id}>
                <Link to={`/events/${event.id}`}>
                  <h4 style={{marginBottom: "0"}}>{event.time}</h4>
                  <h4 style={{marginTop: "0", marginLeft: "1em"}}>{event.title}</h4>
                </Link>
            </div>
        );
    })}

    <ul>
        
    </ul>
  </div>
  );
}

export default EventList;
