import mongoose from "mongoose";
const { Schema } = mongoose;

const DBGame = new Schema({
    gameCode: {
        type: Number,
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
    roundData: {
        wholesaler: {
            type: Array
        },
        retailer: {
            type: Array
        }

    }
})