import {checkIfPlayerIsInAnyRoom} from "../functions/lib.js";
import SocketError from "../model/SocketError"
import SocketSuccess from "../model/SocketSuccess"

export default function JoinGame(io, socket, room) {
    console.log("Case 1")
    if(io.sockets.adapter.rooms.get(room) === undefined)
    {
        if(checkIfPlayerIsInAnyRoom(io, socket.id))
            socket.emit("join_to_game", new SocketError("Spieler ist bereits in einem Spiel angemeldet!"))
        else
        {
            socket.join(room)
            socket.emit("join_to_game", new SocketSuccess(200, {room: room}))
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
                {
                    head: {
                        err: true,
                        errMsg: "Spieler ist bereits in einem Spiel angemeldet..."
                    }
                }
            )
        }
        else
        {
            socket.join(room)
            socket.emit("join_to_game",
                {
                    head: {
                        status: 200
                    },
                    body: {
                        room: room
                    }
                }
            )
        }
    }
}