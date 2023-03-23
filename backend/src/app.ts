import express, {Express} from "express";
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { Server } from "socket.io";
import * as dotenv from 'dotenv';
import connectDB from "./database/mongodb";
import Sockets from "./socket";

dotenv.config()
const app: Express = express();
const port = process.env.PORT || 8080;

// connectDB();
app.use(morgan('tiny'));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    res.send("welcome")
})

const server = app.listen(port, () => {
    console.log(`PORT ${port} is running`)
})

const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000"
    }
});

Sockets(io);