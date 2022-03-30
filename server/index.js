import { Server } from "socket.io";
import {checkIfPlayerIsInAnyRoom} from "./functions/lib.js";
import JoinGame from "./controller/JoinGame.js";

const io = new Server({
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on("join_game", (room) => JoinGame(io, socket, room))
    socket.on("disconnect", (socket) => {

    })
});

io.listen(3001);