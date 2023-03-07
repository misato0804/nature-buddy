import mongoose from "mongoose";
import {bool} from "prop-types";

const ActivitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "must be provided"],
        unique: true,
        trim: true
    },
    date: {
        type: Date,
        required: [true, "Date must be provided"],
    },
    endDate: {
        type: Date,
    },
    description: {
        type: String,
        minLength: 20,
        required: [true, "Description must be provided"]
    },
    location: {
        type: {type: String, default: 'Point'},
        coordinates: {type: [Number], required: true},
        address: String,
        place_id: String,
        required: [true, "Location must be provided"]
    },
    meetingPoint: {
        type: {type: String, default: 'Point'},
        coordinates: {type: [Number], required: true},
        address: String,
        place_id: String
    },
    meetingTime: {
        type: String,
        required: [true, "Destination must be provided"]
    },
    genre: {
        type: String,
        enum: ["Hiking", "Biking", "Climbing", "Snow activities", "Road trip", "Fishing", "Picnicking", "Exploring town"],
        required: [true, "Genre must be required"]
    },
    spots: {
        type: Number,
        required: [true, "Spots must be required"]
    },
    duration: {
        type: String,
        required: [true, "Destination must be provided"]
    },
    imageCover: {
        type: String,
        required: [true, "Cover image must be provided"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Host must be required"]
    },
    buddies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    available: {
        type: Boolean,
        default: true
    }
});

export const Activity = mongoose.models.Activity || mongoose.model("Activity", ActivitySchema, "Activities")