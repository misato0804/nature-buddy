import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {INotification} from "@/types/INotification";
import IOnlineUser from "@/types/IOnlineUser";
import {Socket} from "socket.io";
import {DefaultEventsMap} from "@socket.io/component-emitter";
import io from "socket.io-client";
import {INotificationModel} from "@/lib/util/notificationSchema";

type Props = {
    children: ReactNode
};

export interface INotificationContext {
    socket: any,
    askingUser: IOnlineUser,
    setAskingUser: Dispatch<SetStateAction<IOnlineUser>>,
    notification: INotificationModel[] | undefined,
    setNotification: React.Dispatch<React.SetStateAction<INotificationModel[] | undefined>>
}

const notificationContext = createContext({} as INotificationContext)

export const useNotificationContext = () => {
    return useContext(notificationContext)
}


export const NotificationProvider = ({children}: Props) => {
    const initialUser = {name: '', email: ''}
    const socket = io(process.env.SOCKET_SERVER_URL as string)
    const [notification, setNotification] = useState<INotificationModel[] | undefined>([])
    const [askingUser, setAskingUser] = useState<IOnlineUser>(initialUser)

    return (
        <notificationContext.Provider value={{socket, notification, setNotification, askingUser, setAskingUser}}>
            {children}
        </notificationContext.Provider>
    )
}

