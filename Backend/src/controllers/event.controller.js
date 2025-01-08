import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Event } from "../models/event.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";

const eventCreation = AsyncHandler( async(req, res) => {
    const {title, date, time, venue, description, organizer} = req.body;

    if (!title || !date || !time || !venue || !description || !organizer) {
        throw new ApiError(400, "All fields are required");
    }

    const event = await Event.create({title, date, time, venue, description, organizer});

    if (!event) {
        throw new ApiError(500, "Something went wrong");
    }

    res.status(200).json(new ApiResponse(200, event, "Event Registered Successfully"));
});

const getEvents = AsyncHandler( async(req, res) => {
    const events = await Event.find();
    if (!events) {
        throw new ApiError(500, "Something went wrong");
    }
    res.status(200).json(new ApiResponse(200, events, "Data Send Successfully"));
});

const getEventById = AsyncHandler( async(req, res) => {
    const event = await Event.findById(req.headers.eventid);

    if (!event) {
        throw new ApiError(500, "something went wrong");
    }
    res.status(200).json(new ApiResponse(200, event, "Event Fetch Successfully"))
})

const eventRegister = AsyncHandler( async(req, res) => { 
    const { userId, eventId } = req.body;    //req.user._id use when using middleware
    
    const user = await User.findById(userId);
    
    if (!user) {
        throw new ApiError(500, "Something went wrong");
    }

    const event = await Event.findById(eventId);
    if (!event) {
        throw new ApiError(500, "Something went wrong");
    }

    user.registered.push(event._id);
    await user.save();

    event.Attendee.push(userId);
    await event.save();

    res.status(200).json(new ApiResponse(200, {}, "Registered successfully"));
});

export { eventCreation, getEvents, eventRegister, getEventById };