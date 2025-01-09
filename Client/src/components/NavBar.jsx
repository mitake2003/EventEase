import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"

const Navbar = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        handleSignIn();
    }, [visible]);

    const handleSignIn = () => {
        const user = sessionStorage.getItem("userId") || "";
        if (user.length > 0) {
            setVisible(true);
        }
    };

    const handleLogout = async () => {
        await axios
            .post("/api/v1/users/logout")
            .then((res) => {
                console.log(res.data);
                sessionStorage.removeItem("userId");
                setVisible(false);
                toast("User Loggout successfully");
            })
            .catch((err) => console.log(err));
    };

    return (
        <nav className="navbar">
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
                <div className="navbar-title">EventEase</div>
            </Link>
            <div className="navbar-content">
                <Link to={"/CreateEvent"}>
                    <button className={visible ? "" : "btn-display"}>
                        Create Event
                    </button>
                </Link>
                <Link to={"/login"}>
                    <button
                        className={
                            visible
                                ? "signin-button btn-display"
                                : "signin-button"
                        }
                        onClick={handleSignIn}
                    >
                        Sign In
                    </button>
                </Link>
                <button
                    className={visible ? "" : "btn-display"}
                    onClick={handleLogout}
                >
                    LogOut
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
