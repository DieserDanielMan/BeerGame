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
    //Wenn Spieler noch keine Rolle hat
    if(checkIfPlayerIsInAnyRoom(io, socket.id))
        return socket.emit("join_to_game",
            new SocketError("Spieler ist bereits in einem Spiel angemeldet."))
    //Datensatz holen
    const GameData = mongoose.model("DBGame", DBGame)
    GameData.findOne({ gameCode: room }, (err, data) => {
        if(err) return socket.emit("join_to_game", new SocketError("Es ist ein Fehler aufgetreten: " + err.message))
        if(data === null) return socket.emit("join_to_game", new SocketError("Es existiert kein Spiel mit diesem GameCode!"))
        if(role === 0) {
            socket.emit("game_choose_role", data.playerData)
            console.log(data.playerData)
        }
        else {
            if(io.sockets.adapter.rooms.get(room) === undefined) {
                socket.join(room)
                socket.emit("join_to_game", new SocketSuccess(200, "Das Spiel wurde erfolgreich betreten", {room, role}))
                switch (role) {
                    case 1:
                        data.playerData.producer = socket.id
                        break
                    case 2:
                        data.playerData.distributor = socket.id
                        break
                    case 3:
                        data.playerData.wholesaler = socket.id
                        break
                    case 4:
                        data.playerData.retailer = socket.id
                }
                data.save()
            }
            else {
                if(io.sockets.adapter.rooms.get(room).size >= 4)
                    return socket.emit("join_to_game", new SocketError("Spieler ist bereits in einem Spiel angemeldet oder das Spiel ist bereits voll!"))
                else {
                    socket.join(room)
                    socket.emit("join_to_game", new SocketSuccess(200, "Das Spiel wurde erfolgreich betreten", {room, role}))
                    switch (role) {
                        case 1:
                            data.playerData.producer = socket.id
                            break
                        case 2:
                            data.playerData.distributor = socket.id
                            break
                        case 3:
                            data.playerData.wholesaler = socket.id
                            break
                        case 4:
                            data.playerData.retailer = socket.id
                    }
                    data.save()
                }
            }
        }
    })
}