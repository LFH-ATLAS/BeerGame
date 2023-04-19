import mongoose from "mongoose";

import DBGame from "../model/DBGame.js";
import CalculateNewValues from "../functions/CalculateNewValues.js";

export default function Senddata(io, socket, intData) {
    const room = intData.gameCode
    const GameData = mongoose.model("DBGame", DBGame)
    //GameData.findOne({ gameCode: room }, (err, data) => {
    GameData.findOne({ gameCode: room }, (err, data) => {


        console.log("Hi")
        io.emit("update_end_Screen", data)
            console.log("Hi2")
        }
    )
}