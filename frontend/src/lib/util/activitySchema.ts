import {IActivity} from "@/types/IActivity";
import mongoose, {Schema, Document, CallbackWithoutResultAndOptionalError} from "mongoose";

export interface IActivityModel extends IActivity, Document{}

const ActivitySchema: Schema = new mongoose.Schema<IActivityModel>({
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
    },
    meetingDetail: {
        meetingPoint: {
            type: {type: String, default: 'Point'},
            coordinates: {type: [Number], required: true},
            address: String,
            place_id: String
        },
        meetingTime: {
            type: Date,
            required: [true, "Destination must be provided"]
        }
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
    coverImage: {
        type: String,
        required: [true, "Cover image must be provided"]
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
},{
    timestamps: {
        createdAt: true
    }
});

export const Activity = mongoose.models.Activity || mongoose.model<IActivityModel>("Activity", ActivitySchema, "Activities")