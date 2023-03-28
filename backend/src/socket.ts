import {Server} from "socket.io";
import INotification from "./types/INotification";
import IOnlineUser from "./types/IOnlineUser";

//Should update whenever user connects or leaves
let onLineUsers : IOnlineUser[] = [];

const addNewUser = (user: IOnlineUser, socket_id: string) => {
    !onLineUsers.some((onlineUser: IOnlineUser) => user.email === onlineUser.email )
    && onLineUsers.push({...user, socket_id})
}

const removeUser = (socket_id: string) => {
    onLineUsers = onLineUsers.filter((onlineUser) => onlineUser.socket_id !== socket_id)
}

const getUser = (email: string) => {
    return onLineUsers.find((onLineUser) => onLineUser.email === email)
}

const Sockets = (io: Server) => {
    io.on('connection', async (socket) => {
        socket.on('newUser', (user) => {
            addNewUser(user, socket.id)
            console.log(onLineUsers)
        })

        socket.on('send_ask_to_join', (notification : INotification) => {
            const receiver = getUser(notification.host.email)
            if(receiver?.socket_id) {
                io.to(receiver?.socket_id).emit('get_asked_to_join',  notification)
            }
        })
        socket.on('send_approval', (notification: INotification) => {
            const sender = getUser(notification.sender.email)
            if(sender?.socket_id) {
                io.to(sender?.socket_id).emit('get_approval', notification)
            }
        })

        socket.on('disconnect', () => {
            removeUser(socket.id)
            console.log(`${socket.id} has left`)
        })
    })
}

export default Sockets;