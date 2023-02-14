import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name must be provided"],
    },
    email: {
        type: String,
        required: [true, "Email must be provided"],
        unique: true,
        lowercase: true,
        //    validate
    },
    password: {
        type: String,
        required: [true, "Password must be provided"],
        minLength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        //    validate
    },
    location: {
        type: {
            type: String,
            coordinates: [Number]
        },
        required: [true, 'Location must be provided']
    },
    interests: {
        type: [String],
        required: [true, 'Interests must be provided']
    }
})

const userModel = mongoose.models.User || mongoose.model("User", UserSchema)
export default userModel;