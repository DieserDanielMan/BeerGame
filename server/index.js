// Import der externen Pakete
import { Server } from "socket.io";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config()

// Import eigener Pakete und Komponenten
import JoinGame from "./controller/JoinGame.js";
import CreateGame from "./controller/CreateGame.js";
import UpdateGame from "./controller/UpdateGame.js";
import LeaveGame from "./controller/LeaveGame.js";

const io = new Server({
  cors: {
    origin: process.env.SERVER_CORS_ORIGIN
  }
});

mongoose.connect(process.env.MONGOOSE_CONNECTIONSTRING)
  .then(() => {
    io.on("connection", (socket) => {
      socket.on("join_game", (data) => JoinGame(io, socket, data))
      socket.on("game_create", (data) => CreateGame(io, socket, data))
      socket.on("game_update", (data) => UpdateGame(io, socket, data))
      socket.on("disconnect", () => LeaveGame(io, socket))
    });
    console.log("Server auf Port " + process.env.SERVER_PORT + " gestartet. Datenbankverbindung hergestellt.");
  })
  .catch((err) => {
    console.log("Server konnte nicht gestartet werden. Fehlermeldung:\n" + err.message);
});

io.listen(process.env.SERVER_PORT)