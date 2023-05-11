import mongoose from "mongoose";

import DBGame from "../model/DBGame.js";
import CalculateNewValues from "../functions/CalculateNewValues.js";

import { calcStorageCosts, calcStorageCostsWeekly, calcAverageStock, calcBackorderWeeksPct, calcPerfectOrderRatePct } from "../functions/lib.js";

export default function UpdateGame(io, socket, intData) {
    const room = intData.gameCode
    const role = intData.selectedRole
    if(intData.orderValue === ''){
        intData.orderValue = 0;
    }
    const orderValue = intData.orderValue
    const GameData = mongoose.model("DBGame", DBGame)
    //GameData.findOne({ gameCode: room }, (err, data) => {
    GameData.findOne({ gameCode: room }, (err, data) => {
        if(err) return console.log("Fehler: " + err)
        //console.log(data)
        if(data === null) return console.log("Kein Datensatz gefunden")
        console.log("Role " + role + "Order Amount: " + orderValue)
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
                        next2Week: 0,
                        kpis: [...[], {
                            roundPlayed: 0,
                            storageCosts: calcStorageCosts(0, data.gameSettings.startStock),
                            storageCostsWeekly: calcStorageCostsWeekly((data.gameSettings.startStock*5),0),
                            perfectWeeks: 0,
                            perfectOrderRatePct: 0,
                            storageCostsBackorder: 0,
                            averageStock: data.gameSettings.startStock,
                            backorderWeeksPct: 0,
                            sumStock: data.gameSettings.startStock,
                            weeksWithBackorder: 0
                        }]

                    })
                    break
                case 2:
                    distributor.push({
                        stock: data.gameSettings.startStock,
                        order: parseInt(orderValue),
                        delay: 0,
                        next1Week: 0,
                        next2Week: 0,
                        kpis: [...[], {
                            roundPlayed: 0,
                            storageCosts: calcStorageCosts(0, data.gameSettings.startStock),
                            storageCostsWeekly: calcStorageCostsWeekly((data.gameSettings.startStock*5),0),
                            perfectWeeks: 0,
                            perfectOrderRatePct: 0,
                            storageCostsBackorder: 0,
                            averageStock: data.gameSettings.startStock,
                            backorderWeeksPct: 0,
                            sumStock: data.gameSettings.startStock,
                            weeksWithBackorder: 0
                        }]
                    })
                    break
                case 3:
                    wholesaler.push({
                        stock: data.gameSettings.startStock,
                        order: parseInt(orderValue),
                        delay: 0,
                        next1Week: 0,
                        next2Week: 0,
                        kpis: [...[], {
                            roundPlayed: 0,
                            storageCosts: calcStorageCosts(0, data.gameSettings.startStock),
                            storageCostsWeekly: calcStorageCostsWeekly((data.gameSettings.startStock*5),0),
                            perfectWeeks: 0,
                            perfectOrderRatePct: 0,
                            storageCostsBackorder: 0,
                            averageStock: data.gameSettings.startStock,
                            backorderWeeksPct: 0,
                            sumStock: data.gameSettings.startStock,
                            weeksWithBackorder: 0
                        }]
                    })
                    break
                case 4:
                    retailer.push({
                        stock: data.gameSettings.startStock,
                        order: parseInt(orderValue),
                        delay: 0,
                        next1Week: 0,
                        next2Week: 0,
                        kpis: [...[], {
                            roundPlayed: 0,
                            storageCosts: calcStorageCosts(0, data.gameSettings.startStock),
                            storageCostsWeekly: calcStorageCostsWeekly((data.gameSettings.startStock*5),0),
                            perfectWeeks: 0,
                            perfectOrderRatePct: 0,
                            storageCostsBackorder: 0,
                            averageStock: data.gameSettings.startStock,
                            backorderWeeksPct: 0,
                            sumStock: data.gameSettings.startStock,
                            weeksWithBackorder: 0
                        }]
                    })
                    break
            }
        }


        else {
            switch (role) {
                case 1:
                    console.log(producer[currentRound-1].storageCosts)
                    console.log(producer[currentRound-1].stock)
                    const tempSumStockProd = producer[currentRound-1].kpis[producer[currentRound-1].kpis.length-1].sumStock + producer[currentRound-1].stock
                    let tempWeeksWithBackorderProd = producer[currentRound-1].kpis[producer[currentRound-1].kpis.length-1].weeksWithBackorder
                    if(producer[currentRound-1].delay > 0){
                        tempWeeksWithBackorderProd++
                    }
                    let tempPerfectWeeksProd = producer[currentRound-1].kpis[producer[currentRound-1].kpis.length-1].perfectWeeks
                    if(producer[currentRound-1].delay == 0 && producer[currentRound-1].stock == 0){
                        tempPerfectWeeksProd++;
                    }
                    producer.push({
                        stock: producer[currentRound-1].stock,
                        order: parseInt(orderValue),
                        delay: producer[currentRound-1].delay,
                        next1Week: producer[currentRound-1].next1Week,
                        next2Week: producer[currentRound-1].next2Week,
                        kpis:[...producer[currentRound-1].kpis, {
                            roundPlayed: currentRound,
                            storageCosts: calcStorageCosts(producer[currentRound-1].kpis[producer[currentRound-1].kpis.length-1].storageCosts,producer[currentRound-1].stock),
                            storageCostsWeekly: calcStorageCostsWeekly((producer[currentRound-1].stock*5), (producer[currentRound-1].delay*10)),
                            perfectWeeks: tempPerfectWeeksProd,
                            perfectOrderRatePct: calcPerfectOrderRatePct(tempPerfectWeeksProd,currentRound+1),
                            storageCostsBackorder: 1,
                            averageStock: calcAverageStock(tempSumStockProd , currentRound),
                            backorderWeeksPct: calcBackorderWeeksPct(tempWeeksWithBackorderProd, currentRound+1),
                            sumStock: tempSumStockProd,
                            weeksWithBackorder: tempWeeksWithBackorderProd
                        }]
                    })
                    break
                case 2:
                    const tempSumStockDist = distributor[currentRound-1].kpis[distributor[currentRound-1].kpis.length-1].sumStock + distributor[currentRound-1].stock
                    let tempWeeksWithBackorderDist = distributor[currentRound-1].kpis[distributor[currentRound-1].kpis.length-1].weeksWithBackorder
                    if(distributor[currentRound-1].delay > 0){
                        tempWeeksWithBackorderDist++
                    }
                    let tempPerfectWeeksDist = distributor[currentRound-1].kpis[distributor[currentRound-1].kpis.length-1].perfectWeeks
                    if(distributor[currentRound-1].delay == 0 && distributor[currentRound-1].stock == 0){
                        tempPerfectWeeksDist++;
                    }
                    distributor.push({
                        stock: distributor[currentRound-1].stock,
                        order: parseInt(orderValue),
                        delay: distributor[currentRound-1].delay,
                        next1Week: distributor[currentRound-1].next1Week,
                        next2Week: distributor[currentRound-1].next2Week,
                        kpis:[...distributor[currentRound-1].kpis, {
                            roundPlayed: currentRound,
                            storageCosts: calcStorageCosts(distributor[currentRound-1].kpis[distributor[currentRound-1].kpis.length-1].storageCosts,distributor[currentRound-1].stock),
                            storageCostsWeekly: calcStorageCostsWeekly((distributor[currentRound-1].stock*5), (distributor[currentRound-1].delay*10)),
                            perfectWeeks: tempPerfectWeeksDist,
                            perfectOrderRatePct: calcPerfectOrderRatePct(tempPerfectWeeksDist,currentRound+1),
                            storageCostsBackorder: 1,
                            averageStock: calcAverageStock(tempSumStockDist , currentRound),
                            backorderWeeksPct: calcBackorderWeeksPct(tempWeeksWithBackorderDist, currentRound+1),
                            sumStock: tempSumStockDist,
                            weeksWithBackorder: tempWeeksWithBackorderDist
                        }]
                    })
                    break
                case 3:
                    const tempSumStockWhole = wholesaler[currentRound-1].kpis[wholesaler[currentRound-1].kpis.length-1].sumStock + wholesaler[currentRound-1].stock
                    let tempWeeksWithBackorderWhole = wholesaler[currentRound-1].kpis[wholesaler[currentRound-1].kpis.length-1].weeksWithBackorder
                    if(wholesaler[currentRound-1].delay > 0){
                        tempWeeksWithBackorderWhole++
                    }
                    let tempPerfectWeeksWhole = wholesaler[currentRound-1].kpis[wholesaler[currentRound-1].kpis.length-1].perfectWeeks
                    if(wholesaler[currentRound-1].delay == 0 && wholesaler[currentRound-1].stock == 0){
                        tempPerfectWeeksWhole++
                    }
                    wholesaler.push({
                        stock: wholesaler[currentRound-1].stock,
                        order: parseInt(orderValue),
                        delay: wholesaler[currentRound-1].delay,
                        next1Week: wholesaler[currentRound-1].next1Week,
                        next2Week: wholesaler[currentRound-1].next2Week,
                        kpis:[...wholesaler[currentRound-1].kpis, {
                            roundPlayed: currentRound,
                            storageCosts: calcStorageCosts(wholesaler[currentRound-1].kpis[wholesaler[currentRound-1].kpis.length-1].storageCosts,wholesaler[currentRound-1].stock),
                            storageCostsWeekly: calcStorageCostsWeekly((wholesaler[currentRound-1].stock*5), (wholesaler[currentRound-1].delay*10)),
                            perfectWeeks: tempPerfectWeeksWhole,
                            perfectOrderRatePct: calcPerfectOrderRatePct(tempPerfectWeeksWhole,currentRound+1),
                            storageCostsBackorder: 1,
                            averageStock: calcAverageStock(tempSumStockWhole , currentRound),
                            backorderWeeksPct: calcBackorderWeeksPct(tempWeeksWithBackorderWhole, currentRound+1),
                            sumStock: tempSumStockWhole,
                            weeksWithBackorder: tempWeeksWithBackorderWhole
                        }]
                    })
                    break
                case 4:
                    const tempSumStockRet = retailer[currentRound-1].kpis[retailer[currentRound-1].kpis.length-1].sumStock + retailer[currentRound-1].stock
                    let tempWeeksWithBackorderRet = retailer[currentRound-1].kpis[retailer[currentRound-1].kpis.length-1].weeksWithBackorder
                    if(retailer[currentRound-1].delay > 0){
                        tempWeeksWithBackorderRet++
                    }
                    let tempPerfectWeeksRet = retailer[currentRound-1].kpis[retailer[currentRound-1].kpis.length-1].perfectWeeks
                    if(retailer[currentRound-1].delay == 0 && retailer[currentRound-1].stock == 0){
                        tempPerfectWeeksRet++
                    }
                    retailer.push({
                        stock: retailer[currentRound-1].stock,
                        order: parseInt(orderValue),
                        delay: retailer[currentRound-1].delay,
                        next1Week: retailer[currentRound-1].next1Week,
                        next2Week: retailer[currentRound-1].next2Week,
                        kpis:[...retailer[currentRound-1].kpis, {
                            roundPlayed: currentRound,
                            storageCosts: calcStorageCosts(retailer[currentRound-1].kpis[retailer[currentRound-1].kpis.length-1].storageCosts,retailer[currentRound-1].stock),
                            storageCostsWeekly: calcStorageCostsWeekly((retailer[currentRound-1].stock*5), (retailer[currentRound-1].delay*10)),
                            perfectWeeks: tempPerfectWeeksRet,
                            perfectOrderRatePct: calcPerfectOrderRatePct(tempPerfectWeeksRet,currentRound+1),
                            storageCostsBackorder: 1,
                            averageStock: calcAverageStock(tempSumStockRet , currentRound),
                            backorderWeeksPct: calcBackorderWeeksPct(tempWeeksWithBackorderRet, currentRound+1),
                            sumStock: tempSumStockRet,
                            weeksWithBackorder: tempWeeksWithBackorderRet
                        }]

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

            values = CalculateNewValues(1, producer, distributor[currentRound].order, 0, currentRound)
            producer = values[0]
            delivery = values[1]

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

            data.roundData.currentRound++
            data.roundData.producer = producer
            data.roundData.distributor = distributor
            data.roundData.wholesaler = wholesaler
            data.roundData.retailer = retailer
            data.markModified("roundData")
            data.save()


            if(data.roundData.currentRound > data.gameSettings.rounds){  
           
                console.log("Endscreen von gameCode: " + data.gameCode)


                io.to(room).emit("end_screen", data)
                io.to(room).emit("end_screen_data", data)
            }
            else{
                console.log("Schicke Daten der nächsten Runde. gameCode: "+ data.gameCode)
            io.to(room).emit("update_player_data", data)

            }


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
