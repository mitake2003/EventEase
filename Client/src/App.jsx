import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./components/RegisterUser";
import { ToastContainer } from "react-toastify";
import LoginForm from "./components/LoginUser";
import EventDetails from "./pages/EventDetails";
import Home from "./pages/Home";
import CreateEvent from "./components/CreateEvent";
import Navbar from "./components/NavBar";

function App() {

    
    return (
        <>
        <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/EventDetails" element={<EventDetails />} />
                <Route path="/CreateEvent" element={<CreateEvent />} />
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
