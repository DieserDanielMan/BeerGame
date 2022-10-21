import mongoose from "mongoose";
import DBGame from "../model/DBGame.js";

const GameData = mongoose.model("DBGame", DBGame)

export default function LeaveGame(io, socket) {
  const sid = socket.id
  GameData.findOne({ $or: [
      {"playerData.producer": sid},
      {"playerData.distributor": sid},
      {"playerData.wholesaler": sid},
      {"playerData.retailer": sid},
    ]}, (err, obj) => {
    if(obj === null) return console.log("[Disconnect-Prüfung] Spieler ist in keinem Spiel aktiv!")
    else {
      //Wenn Spieler bei disconnect in einem Spiel ist, wird die Zuordnung in der Datenbank aufgehoben
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
      if(io.sockets.adapter.rooms.get(obj.gameCode) !== undefined)
        io.to(obj.gameCode).emit("update_room_size",io.sockets.adapter.rooms.get(obj.gameCode).size)
      console.log("[Disconnect-Prüfung] Ein Spieler wurde von einem Spiel abgemeldet!")
    }
  })
}