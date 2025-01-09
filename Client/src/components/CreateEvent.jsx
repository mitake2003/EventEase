import { useState } from "react";
import "./CreateEvent.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
    const [eventData, setEventData] = useState({
        title: "",
        date: "",
        time: "",
        venue: "",
        organizer: "",
        description: "",
    });
    const navigate = useNavigate();

    const changeHandler = (e) => {
        const {name, value} = e.target;
        setEventData({
            ...eventData,
            [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.post("/api/v1/events/createEvent",eventData)
        .then(res => {
            toast("Event Created Succesfully");
            navigate("/");
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="form-container">
            <h1>Event Creation</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" onChange={changeHandler} required />
                <div className="row">
                    <input type="date" name="date" onChange={changeHandler} required/>
                    <input type="time" name="time" onChange={changeHandler} required/>
                </div>
                <input type="text" name="venue" placeholder="Venue" onChange={changeHandler} required/>
                <input type="text" name="organizer" placeholder="Organizer" onChange={changeHandler} required/>
                <textarea
                    name="description"
                    placeholder="Description"
                    spellCheck="false"
                    onChange={changeHandler}
                    required
                ></textarea>
                <button>Create</button>
            </form>
        </div>
    );
};

export default CreateEvent;
