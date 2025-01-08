import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        await axios.post("/api/v1/users/register",formData)
        .then(res => {
            console.log(res.data);
            notify("Registration Successful!");
            navigate("/login");
        })
        .catch(err => {
            console.log(err);
        })
    };

    const notify = (msg) => toast(msg);

    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "auto",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "10px",
            }}
        >
            <h2 style={{ textAlign: "center" }}>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
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
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
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
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
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
                    Register
                </button>
                <div style={{textAlign: "center"}}>
                    <p>
                        Already Registered?{" "}
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            SignIn
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
