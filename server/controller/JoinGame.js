import mongoose from "mongoose";

import { checkIfPlayerIsInAnyRoom } from "../functions/lib.js";
import SocketError from "../model/SocketError.js"
import SocketSuccess from "../model/SocketSuccess.js"
import DBGame from "../model/DBGame.js";

export default function JoinGame(io, socket, intData) {


  const room = intData.gameCode
  const role = intData.selectedRole
  console.log("Raum = " + room)
  console.log("Rolle = " + role)
  //Wenn Spieler noch keine Rolle hat
  if(checkIfPlayerIsInAnyRoom(io, socket.id))
    return socket.emit("join_to_game", new SocketError("Spieler ist bereits in einem Spiel angemeldet."))
  //Datensatz holen
  const GameData = mongoose.model("DBGame", DBGame)
  GameData.findOne({ gameCode: room }, (err, data) => {
    if(err) return socket.emit("join_to_game", new SocketError("Es ist ein Fehler aufgetreten: " + err.message))
    if(data === null) return socket.emit("join_to_game", new SocketError("Es existiert kein Spiel mit diesem GameCode!"))
    //Wenn die Rolle durch den Spieler noch nicht gewählt wurde, soll das Dialogfenster für die Rollenwahl aufgerufen werden
    if(role === 0) {
      socket.emit("game_choose_role", data.playerData)
      console.log(data.playerData)
    }
    else {
      if(io.sockets.adapter.rooms.get(room) === undefined) {
        
        
        switch (role) {
          case 1:
            if(data.playerData.producer != "NA"){
              socket.emit("join_to_game", new SocketError("Diese Rolle ist bereits vergeben"))
            }else {
              data.playerData.producer = socket.id
              socket.join(room)
              socket.emit("join_to_game", new SocketSuccess(200, "Das Spiel wurde erfolgreich betreten", {room, role}))
            }
            break
          case 2:
            if(data.playerData.distributor != "NA"){
              socket.emit("join_to_game", new SocketError("Diese Rolle ist bereits vergeben"))
            }else{
              data.playerData.distributor = socket.id
              socket.join(room)
              socket.emit("join_to_game", new SocketSuccess(200, "Das Spiel wurde erfolgreich betreten", {room, role}))
            }
            break
          case 3:
            if(data.playerData.wholesaler != "NA"){
              socket.emit("join_to_game", new SocketError("Diese Rolle ist bereits vergeben"))
            }else{
              data.playerData.wholesaler = socket.id
              socket.join(room)
              socket.emit("join_to_game", new SocketSuccess(200, "Das Spiel wurde erfolgreich betreten", {room, role}))
            }
            break
          case 4:
            if(data.playerData.retailer != "NA"){
              socket.emit("join_to_game", new SocketError("Diese Rolle ist bereits vergeben"))
            }else{
              data.playerData.retailer = socket.id
              socket.join(room)
              socket.emit("join_to_game", new SocketSuccess(200, "Das Spiel wurde erfolgreich betreten", {room, role}))
            }
        }
       
        data.save()
        let selectedRoles = []
        if(data.playerData.producer !== "NA") selectedRoles.push("Produzent")
        if(data.playerData.distributor !== "NA") selectedRoles.push("Verteiler")
        if(data.playerData.wholesaler !== "NA") selectedRoles.push("Großhändler")
        if(data.playerData.retailer !== "NA") selectedRoles.push("Einzelhändler")
        io.to(room).emit("update_room_size", {
          roomSize: io.sockets.adapter.rooms.get(room).size,
          selectedRoles
        })
      }
      else {
        if(io.sockets.adapter.rooms.get(room).size >= 4)
          return socket.emit("join_to_game", new SocketError("Spieler ist bereits in einem Spiel angemeldet oder das Spiel ist bereits voll!"))
        else {
          
          switch (role) {
            case 1:
              if(data.playerData.producer != "NA"){
                socket.emit("join_to_game", new SocketError("Diese Rolle ist bereits vergeben"))
              }else {
                data.playerData.producer = socket.id
                socket.join(room)
                socket.emit("join_to_game", new SocketSuccess(200, "Das Spiel wurde erfolgreich betreten", {room, role}))
              }
              break
            case 2:
              if(data.playerData.distributor != "NA"){
                socket.emit("join_to_game", new SocketError("Diese Rolle ist bereits vergeben"))
              }else{
                data.playerData.distributor = socket.id
                socket.join(room)
                socket.emit("join_to_game", new SocketSuccess(200, "Das Spiel wurde erfolgreich betreten", {room, role}))
              }
              break
            case 3:
              if(data.playerData.wholesaler != "NA"){
                socket.emit("join_to_game", new SocketError("Diese Rolle ist bereits vergeben"))
              }else{
                data.playerData.wholesaler = socket.id
                socket.join(room)
                socket.emit("join_to_game", new SocketSuccess(200, "Das Spiel wurde erfolgreich betreten", {room, role}))
              }
              break
            case 4:
              if(data.playerData.retailer != "NA"){
                socket.emit("join_to_game", new SocketError("Diese Rolle ist bereits vergeben"))
              }else{
                data.playerData.retailer = socket.id
                socket.join(room)
                socket.emit("join_to_game", new SocketSuccess(200, "Das Spiel wurde erfolgreich betreten", {room, role}))
              }
          }
          data.save()
          let selectedRoles = []
          if(data.playerData.producer !== "NA") selectedRoles.push("Produzent")
          if(data.playerData.distributor !== "NA") selectedRoles.push("Verteiler")
          if(data.playerData.wholesaler !== "NA") selectedRoles.push("Großhändler")
          if(data.playerData.retailer !== "NA") selectedRoles.push("Einzelhändler")
          io.to(room).emit("update_room_size", {
            roomSize: io.sockets.adapter.rooms.get(room).size,
            selectedRoles
          })
          //socket.emit("initial_data", data)
          io.to(room).emit("initial_data", data)
        }
      }
    }
  })
}