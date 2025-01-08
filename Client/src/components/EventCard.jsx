import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./EventCard.css";
import { toast } from "react-toastify";
import handleEventRegister from "../utils/registerEvent.js";

const EventCard = ({ event }) => {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState();
  
  const setEventId = () => {
    sessionStorage.setItem("eventId", event._id);
  }

  const registerEvent = () => {
    setEventId();
    handleEventRegister();
  }

  return (
        <div className="card">
            <h2 className="title">{event.title}</h2>
            <p className="detail">
                <strong>Date:</strong> {event.date}
            </p>
            <p className="detail">
                <strong>Time:</strong> {event.time}
            </p>
            <p className="detail">
                <strong>Venue:</strong> {event.venue}
            </p>
            <p className="organizer">
                <strong>Organizer:</strong> {event.organizer}
            </p>
            <div className="btnContainer">
                <Link to={'/EventDetails'} onClick={setEventId}>
                    <button className="button">View Details</button>
                </Link>
                <button
                    className={`button ${visible?"btnVisible":""}`}
                    onClick={registerEvent}
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default EventCard;
