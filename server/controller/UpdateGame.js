import {checkIfPlayerIsInAnyRoom} from "../functions/lib.js";
import SocketError from "../model/SocketError.js"
import SocketSuccess from "../model/SocketSuccess.js"
import DBGame from "../model/DBGame.js";
import mongoose from "mongoose";

export default function UpdateGame(io, socket, intData) {
    const room = JSON.parse(intData.gameCode)
    const role = JSON.parse(intData.selectedRole)
    const orderValue = intData.orderValue
    console.log("Raum = " + room)
    console.log("Wert = " + orderValue)
    const GameData = mongoose.model("DBGame", DBGame)
    //GameData.findOne({ gameCode: room }, (err, data) => {
    GameData.findOne({ gameCode: room }, (err, data) => {
        if(err) return console.log("Fehler: " + err)
        //console.log(data)
        if(data === null) return console.log("Kein Datensatz gefundenb")
        console.log("Rolle = " + role)
        switch (role) {
            case 1:
                data.roundData.producer.push(orderValue)
                break
            case 2:
                data.roundData.distributor.push(orderValue)
                break
            case 3:
                data.roundData.wholesaler.push(orderValue)
                break
            case 4:
                data.roundData.retailer.push(orderValue)
                break
        }
        console.log("============== DATEN ===============")
        console.log(data)
        let rounds = [data.roundData.producer.length, data.roundData.distributor.length, data.roundData.wholesaler.length, data.roundData.retailer.length]
        let checkIfDataCanBeCommitted = true
        rounds.map(element => {
            if(element !== data.roundData.currentRound) checkIfDataCanBeCommitted = false
        })
        //Daten können verteilt werden, sobald alle Spieler die Bestellung für die aktuelle Runde abgegeben haben
        if(checkIfDataCanBeCommitted) {
            io.to(room).emit("update_player_data", data)
            data.roundData.currentRound++
        }
        data.save()
    })
}