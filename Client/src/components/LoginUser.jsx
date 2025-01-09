import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        identifier:"",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.post("/api/v1/users/login",formData)
        .then(res => {
            const user = res.data.data.user;
            sessionStorage.setItem("userId", user._id);
            toast("Login Successfull");
            navigate("/");
        })
        .catch(err => console.log(err));
    };

    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "50px auto",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "10px",
            }}
        >
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <input
                        type="text"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        placeholder="Username or Email"
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Login
                </button>
                <div>
                    <p style={{textAlign: "center"}}>
                        New User?{" "}
                        <Link to="/register" style={{ textDecoration: "none" }}>
                            SignUp
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
