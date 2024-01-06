import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import NaiopData from './StaticData.js';

function useCompanyList() {
    const [companies, setCompanies] = useState(null);

    if (companies == null) {
        setCompanies("loading");
        setTimeout(() => {
            let list = NaiopData.memberCompanies;
            if (list.length) {
                setCompanies(list);
            }
        }, 200);
    }

    return companies === "loading" || companies == null ? [] : companies;
}

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

function Register(id) {
    let { eventId } = useParams();
    let eventDetails = useEventDetails(eventId);
    const allCompanies = useCompanyList();

    const [isMember, setIsMember] = useState(false);
    const [registerName, setRegisterName] = useState("");

    const [companyInput, setCompanyInput] = useState("");
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [filteredCompanies, setFilteredCompanies] = useState(null);

    const updateCompanyInput = newText => {
        setCompanyInput(newText);
        setSelectedCompanyId(null);
        if (newText.length > 0) {
            setFilteredCompanies(allCompanies.filter(aCompany => aCompany.name.toLowerCase().indexOf(newText.toLowerCase()) >= 0));
        } else {
            setFilteredCompanies(null);
        }
    };

    const selectCompany = selectId => {
        setCompanyInput(allCompanies.filter(ac => ac.id === selectId)[0].name);
        setSelectedCompanyId(selectId);
        setFilteredCompanies(null);
    };

  return (
    <div>
        <h4><Link to={`/events/${eventId}`}>&lt; Back to Events Details</Link></h4>
        {!eventDetails ? "Loading event details..." : (
            <div>
                <img src={"images/" + eventDetails.heroImage}
                    style={{objectFit: "cover", objectPosition: "0 0", width: "100%", height: "200px"}} alt={eventDetails.title}/>
                <h1>Registration</h1>
                <h3>{eventDetails.time}</h3>
                <h3>Location: {eventDetails.location}</h3>

                <div>
                    
                    <div style={{display: "flex", flexDirection: "column", gap: "0.5em"}}>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <div style={{flexBasis: "10em"}}>Name:</div>
                            <div><input name="name" type="text" value={registerName} onChange={evt => setRegisterName(evt.target.value)}/></div>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", gap: "2em"}}>
                            <div>Are you part of a member company?</div>
                            <div><input id="memberNo" type="radio" checked={!isMember} onChange={() => setIsMember(false)}/><label htmlFor="memberNo">No</label></div>
                            <div><input id="memberYes" type="radio" checked={isMember} onChange={() => setIsMember(true)}/><label htmlFor="memberYes">Yes</label></div>
                        </div>
                        {!isMember ? null : 
                            <div style={{display: "flex", flexDirection: "row", gap: "2em"}}>
                                <div style={{marginLeft: "1.5em"}}>
                                    Select your company:
                                </div>
                                <div>
                                    <input id="companyQuery" type="text" value={companyInput} onChange={e => updateCompanyInput(e.target.value)}/>
                                    {filteredCompanies == null ? "" : (
                                        <>{filteredCompanies.length === 0 ? <div>{`no companies match ${companyInput}`}</div> : filteredCompanies.map(aCompany => (
                                            // eslint-disable-next-line
                                            <div><a href="#" onClick={(e) => {e.preventDefault(); selectCompany(aCompany.id);}}>{aCompany.name}</a></div>
                                        ))}</>
                                    )}
                                </div>
                            </div>
                        }
                        <div style={{textAlign: "center", margin: "1em 0"}}>
                            <button onClick={() => {
                                if (registerName.length < 2) {
                                    alert("Please provide your name.");
                                } else if (isMember && selectedCompanyId == null) {
                                    alert("Please select your member company before proceeding.");
                                } else {
                                    let msg = `TODO: redirect to payment site.\nRegistration data:\n    name: ${registerName}\n    isMember: ${isMember}`;
                                    msg += (selectedCompanyId == null ? "" : `\n    company id: ${selectedCompanyId} / ${allCompanies.filter(ac => ac.id === selectedCompanyId)[0].name}`);
                                    alert(msg);
                                }
                            }}>Proceed to Payment</button>
                        </div>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "row", gap: "1em", margin: "1.5em 0"}}>
                    <h3>Hosted By:</h3>
                    <a href="https://www.naiopedmonton.com/"><img src="images/logo.jpg" alt="NAIOP"/></a>
                </div>
            </div>)}
    </div>
  );
}

export default Register;
