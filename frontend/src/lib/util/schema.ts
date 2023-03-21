import mongoose, {Schema, Document, CallbackWithoutResultAndOptionalError} from "mongoose";
import {IUser} from "@/types/IUser";
import bcrypt from "bcryptjs";
import {Genre} from "@/types/Genre";

export interface IUserModel extends IUser, Document{}

const UserSchema : Schema  = new mongoose.Schema<IUserModel>({
    name: {
        type: String,
        required: [true, "Name must be provided"],
    },
    email: {
        type: String,
        required: [true, "Email must be provided"],
        unique: true,
        lowercase: true,

    },
    password: {
        type: String,
        select: false,
    },
    passwordConfirm: {
        type: String,
        validate: {
            validator: function (this : IUserModel) {
                return this.passwordConfirm === this.password
            },
            message: "passwords are not the same"
        }
    },
    interests: {
        type: [String],
        enum: Genre,
        required: [true, 'Interests must be provided'],
    },
    location: {
        type: {type: String, default: 'Point'},
        coordinates: {type: [Number], required: true},
        address: String,
        place_id: String,
        required: false
    },
    socialMediaHandles: {
        tags: {
            type: Map,
            of: String
        }
    },
    image: {
        type: String
    },
    introduction: {
        type: String
    },
    hostedActivities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activities"
        }
    ],
    joinedActivities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activities"
        }
    ],
    favouriteActivities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activities"
        }
    ],

})

// UserSchema.path("email").validate(function (this: IUserModel) {
//     let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
//     console.log(this.email)
//     return emailRegex.test(this.email);
// }, "This email can not be used")

UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next()
})

export const User = mongoose.models.User || mongoose.model<IUserModel>("User", UserSchema, "User")