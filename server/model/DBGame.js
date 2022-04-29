import mongoose from "mongoose";
const { Schema } = mongoose;

const DBGame = new Schema({
    gameCode: {
        type: String,
        required: true,
        unique: true
    },
    gameCreated: {
        type: Date,
        required: true
    },
    gameSettings: {
        rounds: {
            type: Number,
            required: true
        },
        startStock: {
            type: Number,
            required: true
        },
        startValue: {
            type: Number,
            required: true
        },
        raisedValue: {
            type: Number,
            required: true
        },
        roundOfRaise: {
            type: Number,
            required: true
        } 
    },
    playerData: {
        producer: {
            type: String,
            required: true,
            default: ""
        },
        distributor: {
            type: String,
            required: true,
            default: ""
        },
        wholesaler: {
            type: String,
            required: true,
            default: ""
        },
        retailer: {
            type: String,
            required: true,
            default: ""
        }
    },
    roundData: {
        producer: {
            type: Array
        },
        distributor: {
            type: Array
        },
        wholesaler: {
            type: Array
        },
        retailer: {
            type: Array
        }
    }
})

export default DBGame;