import mongoose from "mongoose"
import DBGame from "../model/DBGame.js";

export default function CreateGame(io, socket, data) {
    const GameData = mongoose.model("DBGame", DBGame)
    const Current = new GameData(data)
    Current.save(err => {
        if(err) console.log(err)
    })
    console.log(data)
}