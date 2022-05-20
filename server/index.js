import { createServer } from "http"
import { Server } from "socket.io";
import mongoose from "mongoose"
import JoinGame from "./controller/JoinGame.js";
import CreateGame from "./controller/CreateGame.js";

import DBGame from "./model/DBGame.js";
import UpdateGame from "./controller/UpdateGame.js";

const GameData = mongoose.model("DBGame", DBGame)

const httpServer = createServer()
const io = new Server(httpServer,{
    cors: {
        //origin: "http://beergame.usb-sys.de",
        origin: "*",
        methods: ["GET", "POST"]
    }
});

mongoose.connect("mongodb+srv://ersterUserTest:Welfniz22db@beergame.supqd.mongodb.net/BeerGame?retryWrites=true&w=majority")
    .then(()=>{
        io.on("connection", (socket) => {
            const sid = socket.id
            //socket.on("check_game", (data) => CheckGame(io, socket, data))
            socket.on("join_game", (data) => JoinGame(io, socket, data))
            socket.on("game_create", (data) => CreateGame(io, socket, data))
            socket.on("game_update", (data) => UpdateGame(io, socket, data))
            socket.on("disconnect", (socket) => {
                GameData.findOne({ $or: [
                        {"playerData.producer": sid},
                        {"playerData.distributor": sid},
                        {"playerData.wholesaler": sid},
                        {"playerData.retailer": sid},
                    ]}, (err, obj) => {
                    if(obj === null) return console.log("Hier ist nichts")
                    else {
                        if(obj.playerData.producer === sid) {
                            obj.playerData.producer = "NA"
                        }
                        else if(obj.playerData.distributor === sid) {
                            obj.playerData.distributor = "NA"
                        }
                        else if(obj.playerData.wholesaler === sid) {
                            obj.playerData.wholesaler = "NA"
                        }
                        else {
                            obj.playerData.retailer = "NA"
                        }
                        obj.save()
                        console.log("Eine ID zurückgesetzt")
                    }
                })
            })
        });
        console.log('Database connected');
}).catch(() => {
    console.log("Error")
});

httpServer.listen(3001);