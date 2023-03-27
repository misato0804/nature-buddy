import mongoose from "mongoose";
import IOnlineUser from "./IOnlineUser";

type INotification = {
    host: IOnlineUser,
    activity_id: string | mongoose.Schema.Types.ObjectId,
    sender: IOnlineUser,
    replied ? : boolean
}

export default INotification;