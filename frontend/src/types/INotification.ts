
import IOnlineUser from "@/types/IOnlineUser";

export type INotification = {
    host: IOnlineUser,
    activity_id: string
    sender: IOnlineUser
}