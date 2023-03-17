import {Server} from "socket.io";
import {User} from "./model/schema";

const Sockets = (io: Server) => {
    io.on('connection', async (socket) => {
        console.log('someone has connected')


        socket.on('disconnect', () => {
            console.log('someone has left')
        })
    })
}

export default Sockets;