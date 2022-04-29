import { Server } from "socket.io";
import mongoose from "mongoose"

import JoinGame from "./controller/JoinGame.js";
import CreateGame from "./controller/CreateGame.js";

const io = new Server({
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

mongoose.connect("mongodb+srv://ersterUserTest:Welfniz22db@beergame.supqd.mongodb.net/BeerGame?retryWrites=true&w=majority")
    .then(()=>{
        io.on("connection", (socket) => {
            console.log(socket.id)
            socket.on("join_game", (data) => JoinGame(io, socket, data))
            socket.on("game_create", (data) => CreateGame(io, socket, data))
            socket.on("disconnect", (socket) => {

            })
        });
        console.log('Database connected');
}).catch(() => {
    console.log("Error")
});

io.listen(3001);