import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true, "must be provided"],
    },
    date: {

    }


})

export const Activity = mongoose.models.Activities || mongoose.model("Activity", ActivitySchema, "Activities")