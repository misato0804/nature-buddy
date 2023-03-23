import {NextApiRequest, NextApiResponse} from "next";
import {NextApiResponseWithSocket} from "@/types/socketio";
import { Server as IOServer, Socket } from 'socket.io';

const socketHandler = (res: NextApiResponseWithSocket) => {
    console.log("working")
    if (res.socket.server.io) return res;
    console.log('Starting socket.io server');

    const io = new IOServer(res.socket.server, {
        // cors: {
        //     origin: "http://localhost:3000"
        // }
    });

    const onConnection = async (socket: Socket) => {
        console.log("connecting to client")
        socket.on('send_message', (data) => {
            console.log(data)
        })
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    }

    io.on('connection', onConnection);
    res.socket.server.io = io
    return res;
}

export default socketHandler