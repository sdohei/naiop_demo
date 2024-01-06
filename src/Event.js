
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import NaiopData from './StaticData.js';

function useEventDetails(eventId) {
    const [eventDetails, setEventDetails] = useState(null);

    let numericId = parseInt(eventId, 10);

    if (eventDetails == null) {
        setEventDetails("loading");
        setTimeout(() => {
            let selectedEvent = NaiopData.events.filter(event => event.id === numericId);
            if (selectedEvent.length) {
                setEventDetails(selectedEvent[0]);
            }
        }, 200);
    }

    return eventDetails === "loading" ? null : eventDetails;
}

function Event() {
    const nav = useNavigate();
    let { eventId } = useParams();

    let eventDetails = useEventDetails(eventId);

  return (
    <div>
        <h4><Link to="/">&lt; Back to Upcoming Events</Link></h4>
        {!eventDetails ? "Loading event details..." : (
            <div>
                <img src={"images/" + eventDetails.heroImage} alt={eventDetails.title}/>
                <h1>{eventDetails.title}</h1>
                <div style={{float: "right"}}>
                    <button id="register" onClick={() => nav(`/events/${eventId}/register`)}>Register Here</button>
                </div>
                <h3>{eventDetails.time}</h3>
                <h3>Location: {eventDetails.location}</h3>
                {eventDetails.description.map(paragraphText => (<p>{paragraphText}</p>))}


                <div style={{display: "flex", flexDirection: "row", gap: "1em", margin: "1.5em 0"}}>
                    <h3>Hosted By:</h3>
                    <a href="https://www.naiopedmonton.com/"><img src="images/logo.jpg" alt="NAIOP" /></a>
                </div>
            </div>
            )
        }
    </div>
  );
}

export default Event;
