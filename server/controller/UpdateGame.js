import mongoose from "mongoose";

import DBGame from "../model/DBGame.js";
import CalculateNewValues from "../functions/CalculateNewValues.js";

export default function UpdateGame(io, socket, intData) {
    const room = intData.gameCode
    const role = intData.selectedRole
    const orderValue = intData.orderValue
    const GameData = mongoose.model("DBGame", DBGame)
    //GameData.findOne({ gameCode: room }, (err, data) => {
    GameData.findOne({ gameCode: room }, (err, data) => {
        if(err) return console.log("Fehler: " + err)
        //console.log(data)
        if(data === null) return console.log("Kein Datensatz gefunden")

        let producer = data.roundData.producer
        let distributor = data.roundData.distributor
        let wholesaler = data.roundData.wholesaler
        let retailer = data.roundData.retailer
        const currentRound = data.roundData.currentRound

        if(data.roundData.currentRound === 0) {
            switch (role) {
                case 1:
                    producer.push({
                        stock: data.gameSettings.startStock,
                        order: parseInt(orderValue),
                        delay: 0,
                        next1Week: 0,
                        next2Week: 0
                    })
                    break
                case 2:
                    distributor.push({
                        stock: data.gameSettings.startStock,
                        order: parseInt(orderValue),
                        delay: 0,
                        next1Week: 0,
                        next2Week: 0
                    })
                    break
                case 3:
                    wholesaler.push({
                        stock: data.gameSettings.startStock,
                        order: parseInt(orderValue),
                        delay: 0,
                        next1Week: 0,
                        next2Week: 0
                    })
                    break
                case 4:
                    retailer.push({
                        stock: data.gameSettings.startStock,
                        order: parseInt(orderValue),
                        delay: 0,
                        next1Week: 0,
                        next2Week: 0
                    })
                    break
            }
        }
        else {
            switch (role) {
                case 1:
                    producer.push({
                        stock: producer[currentRound-1].stock,
                        order: parseInt(orderValue),
                        delay: producer[currentRound-1].delay,
                        next1Week: producer[currentRound-1].next1Week,
                        next2Week: producer[currentRound-1].next2Week
                    })
                    break
                case 2:
                    distributor.push({
                        stock: distributor[currentRound-1].stock,
                        order: parseInt(orderValue),
                        delay: distributor[currentRound-1].delay,
                        next1Week: distributor[currentRound-1].next1Week,
                        next2Week: distributor[currentRound-1].next2Week
                    })
                    break
                case 3:
                    wholesaler.push({
                        stock: wholesaler[currentRound-1].stock,
                        order: parseInt(orderValue),
                        delay: wholesaler[currentRound-1].delay,
                        next1Week: wholesaler[currentRound-1].next1Week,
                        next2Week: wholesaler[currentRound-1].next2Week
                    })
                    break
                case 4:
                    retailer.push({
                        stock: retailer[currentRound-1].stock,
                        order: parseInt(orderValue),
                        delay: retailer[currentRound-1].delay,
                        next1Week: retailer[currentRound-1].next1Week,
                        next2Week: retailer[currentRound-1].next2Week
                    })
                    break
            }
        }
        let rounds = [producer.length, distributor.length, wholesaler.length, retailer.length]
        let checkIfDataCanBeCommitted = true
        rounds.map(element => {
            if(element !== data.roundData.currentRound+1 || element === []) checkIfDataCanBeCommitted = false
        })
        //Daten können verteilt werden, sobald alle Spieler die Bestellung für die aktuelle Runde abgegeben haben
        if(checkIfDataCanBeCommitted) {
            console.log("Push ausgelöst")

            const roundOfRaise = data.gameSettings.roundOfRaise
            const startValue = data.gameSettings.startValue
            const raisedValue = data.gameSettings.raisedValue

            let values = [], delivery = 0

            console.log("PRODUCER:")
            console.log(producer)
            values = CalculateNewValues(1, producer, distributor[currentRound].order, 0, currentRound)
            producer = values[0]
            delivery = values[1]

          console.log("PRODUCER AFTER:")
          console.log(producer)
          console.log(delivery)

            values = CalculateNewValues(2, distributor, wholesaler[currentRound].order, delivery, currentRound)
            distributor = values[0]
            delivery = values[1]

            values = CalculateNewValues(3, wholesaler, retailer[currentRound].order, delivery, currentRound)
            wholesaler = values[0]
            delivery = values[1]

          if(currentRound < roundOfRaise) {
            values = CalculateNewValues(4, retailer, startValue, delivery, currentRound)
            retailer = values[0]
            delivery = values[1]
          }
          else {
            values = CalculateNewValues(4, retailer, raisedValue, delivery, currentRound)
            retailer = values[0]
            delivery = values[1]
          }


            console.log("Delivery: " + delivery)

            data.roundData.currentRound++
            data.roundData.producer = producer
            data.roundData.distributor = distributor
            data.roundData.wholesaler = wholesaler
            data.roundData.retailer = retailer
            data.markModified("roundData")
            console.log("PRODUCER WERTER VOR DBSAVE")
            console.log(data.roundData.producer)
            console.log(data)
            data.save()
            io.to(room).emit("update_player_data", data)
        }
        else {
            data.roundData.producer = producer
            data.roundData.distributor = distributor
            data.roundData.wholesaler = wholesaler
            data.roundData.retailer = retailer
            data.save()
        }
    })
}