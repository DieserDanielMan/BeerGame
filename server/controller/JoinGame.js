import {checkIfPlayerIsInAnyRoom} from "../functions/lib.js";
import SocketError from "../model/SocketError.js"
import SocketSuccess from "../model/SocketSuccess.js"
import DBGame from "../model/DBGame.js";
import mongoose from "mongoose";

export default function JoinGame(io, socket, intData) {
    const room = intData.gameCode
    const role = intData.selectedRole
    console.log("Raum = " + room)
    console.log("Rolle = " + role)
    if(!checkIfPlayerIsInAnyRoom(io, socket.id)) {
        if(io.sockets.adapter.rooms.get(room) === undefined) {
            const GameData = mongoose.model("DBGame", DBGame)
            GameData.findOne({ gameCode: room }, (err, data) => {
                if(err) return socket.emit("join_to_game", new SocketError("Es ist ein Fehler aufgetreten: " + err.message))
                if(data === null) return socket.emit("join_to_game", new SocketError("Es existiert kein Spiel mit diesem GameCode!"))
                console.log(data)
                socket.join(room)
                socket.emit("join_to_game", new SocketSuccess(200, "Das Spiel " + room + " wurde erfolgreich betreten.",{room: room}))
            })
        }
        else {
            if(io.sockets.adapter.rooms.get(room).size >= 4)
                return socket.emit("join_to_game", new SocketError("Spieler ist bereits in einem Spiel angemeldet oder das Spiel ist bereits voll!"))
            else {
                const GameData = mongoose.model("DBGame", DBGame)
                GameData.findOne({ gameCode: room }, (err, data) => {
                    if(err) return socket.emit("join_to_game", new SocketError("Es ist ein Fehler aufgetreten: " + err.message))
                    if(data === null) return socket.emit("join_to_game", new SocketError("Es existiert kein Spiel mit diesem GameCode!"))
                    console.log(data)
                    socket.join(room)
                    socket.emit("join_to_game", new SocketSuccess(200, "Das Spiel " + room + " wurde erfolgreich betreten.",{room: room}))
                })
            }
        }
    }
    else {
        socket.emit("join_to_game",
            new SocketError("Spieler ist bereits in einem Spiel angemeldet."))
    }
}