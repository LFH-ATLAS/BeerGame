import mongoose from "mongoose";
const { Schema } = mongoose;

const DBGame = new Schema({
    gameCode: {
        type: Number,
        required: true
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