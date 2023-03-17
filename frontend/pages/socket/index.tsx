import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import io from 'socket.io-client';


const SocketIO = () => {

    const [message, setMessage] = useState<string>("Hello")

    useEffect(() => {
        // const socket = io('http://localhost:3000/api/socket')
        // fetch('/api/socket').finally(() => {
        //     const socket = io()
        //
        //     socket.on('connect', () => {
        //         console.log('connect')
        //         socket.emit('send_message', { message })
        //     })
        //
        //     socket.on('disconnect', () => {
        //         console.log('disconnect')
        //     })
        // })

    }, [message])
    //
    // const onSubmit = () => {
    //     console.log("hi")
    //     socket.emit('send_message', { message })
    // }

    return (
        <Box my={20}>
            Here is Socket Io test page
            <form>
                <input type="text" onChange={(e) => {setMessage(e.target.value)}}/>
                <input
                    type="button"
                    onClick={() => {}}
                    value="clicke me"
                />
            </form>
        </Box>
    );
};

export default SocketIO;