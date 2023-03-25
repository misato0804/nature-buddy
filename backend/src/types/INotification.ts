import IOnlineUser from "./IOnlineUser"



export type INotification = {
    host: IOnlineUser,
    activity_id: string
    sender: IOnlineUser
}