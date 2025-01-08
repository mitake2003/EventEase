import { useEffect, useState } from "react";
import "./EventDetails.css";
import { Link } from "react-router-dom";
import axios from "axios";
import handleEventRegister from "../utils/registerEvent";

const EventDetails = () => {
    const [users, setUsers] = useState([]);
    const [event, setEvents] = useState({});

    const getUsers = async(attendees) => {
      await axios.get("/api/v1/users/users")
      .then(res => {
        const usersList = res.data.data;
        const filterUsers = usersList.filter((user) => {
          return attendees.includes(user._id);
        })
        setUsers(filterUsers);
      })
      .catch(err => console.log(err));
    }

    useEffect(() => {
      const eventId = sessionStorage.getItem("eventId");
      axios.get("/api/v1/events/getEvent",{headers: {
        eventId
      }})
      .then(res => {
        const attendees = res.data.data.Attendee; 
        getUsers(attendees);
        setEvents(res.data.data);
        //console.log(users);
      })
      .catch(err => console.log(err));
    },[])

    return <div className="EventPage">
    <div className="EventHeader">
      <Link to={"/"}><button className="EventButton">Back</button></Link>
      <button className="EventButton" onClick={handleEventRegister}>Register</button>
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
        {users.map((user, index) => {
            return <tr key={user._id}>
              <th>{index + 1}</th>
              <th>{user.fullName}</th>
              <th>{user.email}</th>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  </div>
}

export default EventDetails;