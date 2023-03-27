import {INotification} from "@/types/INotification";
import {User} from "@/lib/util/schema";
import mongoose from "mongoose";

const getUserAndAddNotification = async (email: string, notification: INotification | string, host: boolean) => {
    let user;
    user = await User.findOne({email})
    if (host) {
        await user.notifications.received.push(notification)
        await user.save()
    } else {
        await user.notifications.sent.push(notification)
        await user.save()
    }
    return user
}

export default getUserAndAddNotification