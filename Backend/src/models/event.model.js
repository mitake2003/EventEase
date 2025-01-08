import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    Attendee: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
});

export const Event = mongoose.model("Event", eventSchema);