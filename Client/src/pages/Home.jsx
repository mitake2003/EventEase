import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import axios from "axios";
import "./Home.css";

const Home = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterEvents, setFilterEvents] = useState([]);

    useEffect(() => {
        axios
            .get("/api/v1/events/EventList")
            .then((res) => {
                setEvents(res.data.data);
                setFilterEvents(res.data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        const filter = events.filter(event => {
            return (searchTerm.length == 0 || event.title.indexOf(searchTerm) >= 0 || event.venue.indexOf(searchTerm) >= 0);
        });
        setFilterEvents(filter);
    };

    return (
        <div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>
            <div className="gridContainer">
                {filterEvents.map((event) => {
                    return <EventCard key={event._id} event={event} />;
                })}
            </div>
        </div>
    );
};

export default Home;
