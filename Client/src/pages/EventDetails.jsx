import { useEffect, useState } from "react";
import "./EventDetails.css";
import { Link } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
    const [attendees, setAttendees] = useState([]);
    const [event, setEvents] = useState({});

    useEffect(() => {
      const eventId = sessionStorage.getItem("eventId");
      axios.get("/api/v1/events/getEvent",{headers: {
        eventId
      }})
      .then(res => {
        setEvents(res.data.data);
        console.log(event.Attendee);
        // const list = event.Attendee.map((val) => {
        //   return event[val];
        // })
        // setAttendees(list);
      })
      .catch(err => console.log(err));
    },[])

    return <div className="EventPage">
    <div className="EventHeader">
      <Link to={"/"}><button className="EventButton">Back</button></Link>
      <button className="EventButton">Register</button>
    </div>
    <div className="EventDetails">
      <h1 className="EventTitle">{event.title}</h1>
      <p className="EventInfo"><strong>Date:</strong> {event.date}</p>
      <p className="EventInfo"><strong>Time:</strong> {event.time}</p>
      <p className="EventInfo"><strong>Organizer:</strong> {event.organizer}</p>
      <p className="EventDescription"><strong>Description:</strong> {event.description}</p>
    </div>
    <div className="AttendeeList">
      <h2>Attendee List</h2>
      <table className="AttendeeTable">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </div>
  </div>
}

export default EventDetails;