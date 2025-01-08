import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">EventEase</div>
      <div className="navbar-content">
        <button className="event-button">Create Event</button>
        <Link to={"/login"}><button className="signin-button">Sign In</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;
