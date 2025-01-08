import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem("userId");
    if (user){
      setVisible(true);
    }
    else {
      setVisible(false);
    }
  },[])

  return (
    <nav className="navbar">
      <Link to={"/"} style={{textDecoration: "none", color:"white"}}><div className="navbar-title">EventEase</div></Link>
      <div className="navbar-content">
        <button className={visible?"btn-display":""}>Create Event</button>
        <Link to={"/login"}><button className={visible?"":"signin-button btn-display"}>Sign In</button></Link>
        <button className={visible?"btn-display":""}>LogOut</button>
      </div>
    </nav>
  );
};

export default Navbar;
