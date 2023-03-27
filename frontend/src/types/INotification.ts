import IOnlineUser from "@/types/IOnlineUser";
import mongoose from "mongoose";

export interface INotification {
    host: IOnlineUser,
    activity_id: string | mongoose.Schema.Types.ObjectId,
    sender: IOnlineUser,
    replied ? : boolean
}