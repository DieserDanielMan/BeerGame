import {checkIfPlayerIsInAnyRoom} from "../functions/lib.js";
import SocketError from "../model/SocketError.js"
import SocketSuccess from "../model/SocketSuccess.js"

export default function JoinGame(io, socket, room) {
    console.log("Case 1")
    if(io.sockets.adapter.rooms.get(room) === undefined)
    {
        if(checkIfPlayerIsInAnyRoom(io, socket.id))
            socket.emit("join_to_game", new SocketError("Spieler ist bereits in einem Spiel angemeldet!"))
        else
        {
            socket.join(room)
            socket.emit("join_to_game", new SocketSuccess(200, "Das Spiel " + room + " wurde erfolgreich betreten.",{room: room}))
        }
    }
    else if(io.sockets.adapter.rooms.get(room).size > 4)
    {
        console.log("Case 2")
        socket.emit("send_message", "Die maximale Anzahl an Spielern für das Spiel " + room + " ist erreicht!")
    }
    else
    {
        if(checkIfPlayerIsInAnyRoom(io, socket.id))
        {
            socket.emit("join_to_game",
                new SocketError("Spieler ist bereits in einem Spiel angemeldet."))
        }
        else
        {
            socket.join(room)
            socket.emit("join_to_game",
                new SocketSuccess(200, "Das Spiel " + room + " wurde erfolgreich betreten.", {room: room}))
        }
    }
}