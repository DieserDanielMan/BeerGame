import { Server } from "socket.io";
import mongoose from "mongoose"

import JoinGame from "./controller/JoinGame.js";
import CreateGame from "./controller/CreateGame.js";

import DBGame from "./model/DBGame.js";

const GameData = mongoose.model("DBGame", DBGame)

const io = new Server({
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

mongoose.connect("mongodb+srv://ersterUserTest:Welfniz22db@beergame.supqd.mongodb.net/BeerGame?retryWrites=true&w=majority")
    .then(()=>{
        io.on("connection", (socket) => {
            const sid = socket.id
            socket.on("join_game", (data) => JoinGame(io, socket, data))
            socket.on("game_create", (data) => CreateGame(io, socket, data))
            socket.on("disconnect", (socket) => {
                GameData.findOne({ $or: [
                        {"playerData.producer": sid},
                        {"playerData.distributor": sid},
                        {"playerData.wholesaler": sid},
                        {"playerData.retailer": sid},
                    ] }, (err, obj) => {
                    if(obj === null) return console.log("Hier ist nichts")
                    else {

                    }
                })
            })
        });
        console.log('Database connected');
}).catch(() => {
    console.log("Error")
});

io.listen(3001);