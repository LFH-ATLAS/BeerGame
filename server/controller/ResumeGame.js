import mongoose from "mongoose";

import DBGame from "../model/DBGame.js";
import CalculateNewValues from "../functions/CalculateNewValues.js";

export default function ResumeGame(io, socket, intData) {
    const room = intData.gameCode
    const role = intData.selectedRole
    console.log("Spiel weiter laufen lassen " + role)

    const GameData = mongoose.model("DBGame", DBGame)
    //GameData.findOne({ gameCode: room }, (err, data) => {
    GameData.findOne({ gameCode: room }, (err, data) => {


       io.to(room).emit("resume_all_games", role)

    })
}