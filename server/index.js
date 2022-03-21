import { Server } from "socket.io";
import {checkIfPlayerIsInAnyRoom} from "./functions/lib.js";
const io = new Server({
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on("join_game", (room) => {
        console.log("Case 1")
        if(io.sockets.adapter.rooms.get(room) === undefined)
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
    })
    socket.on("disconnect", () => {

    })
});

io.listen(3001);