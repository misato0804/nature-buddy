import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {INotification} from "@/types/INotification";
import IOnlineUser from "@/types/IOnlineUser";
import {Socket} from "socket.io";
import {DefaultEventsMap} from "@socket.io/component-emitter";
import io from "socket.io-client";

type Props = {
    children: ReactNode
};

export interface INotificationContext {
    socket: any,
    askingUser: IOnlineUser,
    setAskingUser: Dispatch<SetStateAction<IOnlineUser>>,
    notification: INotification | undefined,
    setNotification: React.Dispatch<React.SetStateAction<INotification | undefined>>
}

const notificationContext = createContext({} as INotificationContext)

export const useNotificationContext = () => {
    return useContext(notificationContext)
}


export const NotificationProvider = ({children}: Props) => {
    const initialUser = {name: '', email: ''}

    const socket = io('http://localhost:8080')
    const [notification, setNotification] = useState<INotification | undefined>()
    const [askingUser, setAskingUser] = useState<IOnlineUser>(initialUser)
    // const [socket, setSocket] = useState<any>()

    return (
        <notificationContext.Provider value={{socket, notification, setNotification, askingUser, setAskingUser}}>
            {children}
        </notificationContext.Provider>
    )
}

