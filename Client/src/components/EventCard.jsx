import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./EventCard.css";
import { toast } from "react-toastify";

const EventCard = ({ event }) => {
  const [visible, setVisible] = useState(false);
  //console.log(event.Attendee);

  // const checkExist = () => {
  //   const userId = sessionStorage.getItem("id");
  //   const attendees = event.Attendee;
  //   for (let i=0; i<attendees.length; i++) {
  //     if (userId === attendees[i]) {
  //       setVisible(true);
  //       return;
  //     }
  //   }
  //   setVisible(false);
  // }
  const handleRouteChange = () => {
    sessionStorage.setItem("eventId", event._id);
  }

    const handleEventRegister = async () => {
      const userId = sessionStorage.getItem("id");
      if (!userId) {
        toast("Login to register")
      }
      else {
        await axios.put("/api/v1/events/eventRegister",
          {
              eventId: event._id,
              userId,
          })
          .then(res => {
            console.log(res.data);
            toast("registered successfully");
          })
          .catch(err => console.log(err))
        };
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
                <Link to={'/EventDetails'} onClick={handleRouteChange}>
                    <button className="button">View Details</button>
                </Link>
                <button
                    className={`button ${visible?"btnVisible":""}`}
                    onClick={handleEventRegister}
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default EventCard;
