import mongoose from "mongoose";

import DBGame from "../model/DBGame.js";
import CalculateNewValues from "../functions/CalculateNewValues.js";

export default function PauseGame(io, socket, intData) {
    const room = intData.gameCode
    const role = intData.selectedRole
    console.log("Pausieren von Rolle: " + role)

    const GameData = mongoose.model("DBGame", DBGame)
    //GameData.findOne({ gameCode: room }, (err, data) => {
    GameData.findOne({ gameCode: room }, (err, data) => {


        io.to(room).emit("pause_all_countdowns", role)

    })
}

