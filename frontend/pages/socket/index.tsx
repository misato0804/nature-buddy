import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import io from 'socket.io-client';
import {useSession} from "next-auth/react";
import IOnlineUser from "@/types/IOnlineUser";
import { v4 as uuidv4 } from 'uuid';

const socket = io('http://localhost:8080')

const SocketIO = () => {
    const [message, setMessage] = useState<string>("Hello")
    const [chat, setChat] = useState<string[]>([])
    const {data: session} = useSession()
    const [user, setUser] = useState<IOnlineUser | undefined>()


    const handleSendNotification = () => {
        //Send to server
        socket.emit('send_notification', {message})
    }

    //Receive from server
    socket.on('received_notification', (data) => {
        console.log(socket.id)

        setChat([...chat, data.message])
        console.log(chat)
    })

    return (
        <Box my={20}>
            Here is Socket Io test page
            <form>
                <input
                    type="text"
                    onChange={(e) => {setMessage(e.target.value)}}
                    value={message}
                />
                <input
                    type="button"
                    onClick={() => handleSendNotification()}
                    value='CLICK'
                />
            </form>
            <div>
                { chat.map(c => <h1 key={c}>{c}</h1>) }
            </div>
        </Box>
    );
};

export default SocketIO;