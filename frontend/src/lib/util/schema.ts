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
    interests: {
        type: [String],
        required: [true, 'Interests must be provided']
    },
    location: {
        type: {type: String, default: 'Point'},
        coordinates: {type: [Number], required: true},
    },
})

UserSchema.index({location:'2dsphere'})

const userModel = mongoose.models.User || mongoose.model("User", UserSchema)
export default userModel;