import {checkIfPlayerIsInAnyRoom} from "../functions/lib.js";
import SocketError from "../model/SocketError.js"
import SocketSuccess from "../model/SocketSuccess.js"
import DBGame from "../model/DBGame.js";
import mongoose from "mongoose";

import GameLogic from "./GameLogic.js"

import Log from "../functions/Log.js"



export default function UpdateGame(io, socket, intData) {
    const room = intData.gameCode
    const role = intData.selectedRole
    const orderValue = intData.orderValue
    Log.log("Spieler mit der Rolle " + role + " versucht UpdateGame.js | Raum: " + room)
    const GameData = mongoose.model("DBGame", DBGame)
    //GameData.findOne({ gameCode: room }, (err, data) => {
    GameData.findOne({ gameCode: room }, (err, data) => {
        if(err) return console.log("Fehler: " + err)
        //console.log(data)
        if(data === null) return console.log("Kein Datensatz gefundenb")

        let producer = data.roundData.producer
        let distributor = data.roundData.distributor
        let wholesaler = data.roundData.wholesaler
        let retailer = data.roundData.retailer
        const currentRound = data.roundData.currentRound

        //console.log(data)

        //if(currentRound === 1) {
        if(data.roundData.currentRound === 0) {
            switch (role) {
                case 1:
                    producer.push({
                        stock: data.gameSettings.startStock,
                        order: orderValue,
                        delay: 0,
                        next1Week: 0,
                        next2Week: 0,
                        supplyChainOrder: 0
                    })
                    break
                case 2:
                    distributor.push({
                        stock: data.gameSettings.startStock,
                        order: orderValue,
                        delay: 0,
                        next1Week: 0,
                        next2Week: 0,
                        supplyChainOrder: 0
                    })
                    break
                case 3:
                    wholesaler.push({
                        stock: data.gameSettings.startStock,
                        order: orderValue,
                        delay: 0,
                        next1Week: 0,
                        next2Week: 0,
                        supplyChainOrder: 0
                    })
                    break
                case 4:
                    retailer.push({
                        stock: data.gameSettings.startStock,
                        order: orderValue,
                        delay: 0,
                        next1Week: 0,
                        next2Week: 0,
                        supplyChainOrder: 0
                    })
                    break
            }
        }
        else {
            switch (role) {
                case 1:
                    producer.push({
                        stock: producer[currentRound-1].stock,
                        order: orderValue,
                        delay: producer[currentRound-1].delay,
                        next1Week: producer[currentRound-1].next1Week,
                        next2Week: producer[currentRound-1].next2Week,
                        supplyChainOrder: producer[currentRound-1].supplyChainOrder
                    })
                    break
                case 2:
                    distributor.push({
                        stock: distributor[currentRound-1].stock,
                        order: orderValue,
                        delay: distributor[currentRound-1].delay,
                        next1Week: distributor[currentRound-1].next1Week,
                        next2Week: distributor[currentRound-1].next2Week,
                        supplyChainOrder: distributor[currentRound-1].supplyChainOrder
                    })
                    break
                case 3:
                    wholesaler.push({
                        stock: wholesaler[currentRound-1].stock,
                        order: orderValue,
                        delay: wholesaler[currentRound-1].delay,
                        next1Week: wholesaler[currentRound-1].next1Week,
                        next2Week: wholesaler[currentRound-1].next2Week,
                        supplyChainOrder: wholesaler[currentRound-1].supplyChainOrder
                    })
                    break
                case 4:
                    retailer.push({
                        stock: retailer[currentRound-1].stock,
                        order: orderValue,
                        delay: retailer[currentRound-1].delay,
                        next1Week: retailer[currentRound-1].next1Week,
                        next2Week: retailer[currentRound-1].next2Week,
                        supplyChainOrder: retailer[currentRound-1].supplyChainOrder
                    })
                    break
            }
        }
        //console.log("============== DATEN ===============")
        //console.log(data.roundData.producer)
        let rounds = [producer.length, distributor.length, wholesaler.length, retailer.length]
        let checkIfDataCanBeCommitted = true
        rounds.map(element => {
            if(element !== data.roundData.currentRound+1 || element === []) checkIfDataCanBeCommitted = false
        })
        //Daten können verteilt werden, sobald alle Spieler die Bestellung für die aktuelle Runde abgegeben haben
        if(checkIfDataCanBeCommitted) {
            console.log("Push ausgelöst")

            /*
            wholesaler[currentRound].supplyChainOrder = retailer[currentRound].order
            distributor[currentRound].supplyChainOrder = wholesaler[currentRound].order
            producer[currentRound].supplyChainOrder = distributor[currentRound].order
             */


            const [
                newProducer,
                newDistributor,
                newWholesaler,
                newRetailer

            ] = GameLogic (
                producer,
                distributor,
                wholesaler,
                retailer,
                currentRound,
                data.gameSettings.startStock,
                data.gameSettings.startValue,
                data.gameSettings.raisedValue,
                data.gameSettings.roundOfRaise
            )

            producer[currentRound] = newProducer.mongoose.Types.()
            distributor[currentRound] = newDistributor.toObject()
            wholesaler[currentRound] = newWholesaler.toObject()
            retailer[currentRound] = newRetailer.toObject()

            data.roundData.producer = producer.toObject()
            data.roundData.distributor = distributor.toObject()
            data.roundData.wholesaler = wholesaler.toObject()
            data.roundData.retailer = retailer.toObject()

            console.log(io.to(room).emit("update_player_data", data))
            data.roundData.currentRound++
        }

        data.roundData.producer = producer.toObject()
        data.roundData.distributor = distributor.toObject()
        data.roundData.wholesaler = wholesaler.toObject()
        data.roundData.retailer = retailer.toObject()
        data.save()
    })
}