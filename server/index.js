import { Server } from "socket.io";
import {checkIfPlayerIsInAnyRoom} from "./functions/lib.js";
import JoinGame from "./controller/JoinGame.js";
import CreateGame from "./controller/CreateGame.js";
import mongoose from 'mongoose';

const mongoose = require('mongoose');
const config = require('config');
const dbConfig = config.get('Test.dbConfig.dbName');

await mongoose.connect(dbConfig).then(()=>{
    console.log('Database connected');
}).catch(console.error('Database connection failed ' + error));

const io = new Server({
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on("join_game", (room) => JoinGame(io, socket, room))
    socket.on("game_create", (data) => CreateGame(io, socket, data))
    socket.on("disconnect", (socket) => {

    })
});

io.listen(3001);