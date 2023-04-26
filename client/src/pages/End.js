import { Socket } from "socket.io-client";
import "../styles/pages/End.css"

import React, {useEffect, useState} from "react";


import InputField from "../components/form/InputField"
import Button from "../components/form/Button";
import Countdown from '../lib/Countdown';
import { Redirect } from "react-router-dom"


function End(props) {

    const gameCode = JSON.parse(localStorage.getItem("room"))
    const socket = props.socketId
    
    const [gameKPIsproducer, setGameKPIsproducer] = useState([])
    const [gameKPIsdistributor, setGameKPIsdistributor] = useState([])
    const [gameKPIswholesaler, setGameKPIswholesaler] = useState([])
    const [gameKPIsretailer, setGameKPIsretailer] = useState([])
    
    const aufgerufen = false;

    useEffect(() => {
        console.log(gameCode);
   
        socket.emit("endscreendata", {
            gameCode
        })

        socket.on("update_end_Screen",   SetData)
        
        return () => {
            socket.off('update_end_Screen', SetData);
          };
    },[] 
   
)

function SetData(data){
    console.log("UpdatePlayer aufgerufen")
    console.log(data)
    setGameKPIsproducer(data.roundData.producer[data.roundData.currentRound-1].kpis)        
    setGameKPIsdistributor(data.roundData.distributor[data.roundData.currentRound-1].kpis)
    setGameKPIswholesaler(data.roundData.wholesaler[data.roundData.currentRound-1].kpis)
    setGameKPIsretailer(data.roundData.retailer[data.roundData.currentRound-1].kpis)
}

    return (
  <div>

<h3>Produzent:</h3>
<div className={"grid_play2"}>
                    <div className={"playground2"}>
                        <div className={"KPItable"}>
    <table>
        <thead>
            <tr>
               <th>Runde</th>
               <th>Kosten pro Woche</th>
                 <th>Lagergesamtkosten</th>
                 <th>Perfekte Auftragsrate</th>
                <th>Durchschnittlicher Lagerbestand</th>
                <th>Wochen mit Lieferrückstand</th>
            </tr>
        </thead>
        <tbody>
            {gameKPIsproducer.map(item => {
                return (
                    <tr key={item.roundPlayed}>
                    <td>{item.roundPlayed}</td>
                    <td>{item.storageCostsWeekly}</td>
                    <td>{item.storageCosts}</td>
                    <td>{item.perfectOrderRatePct}%</td>
                    <td>{item.averageStock}</td>
                    <td>{item.backorderWeeksPct}%</td>
                </tr>
                );
                })}
        </tbody>
    </table>
    </div>

    </div>

    </div>


    <h3>Verteiler:</h3>
    <div className={"grid_play2"}>
                    <div className={"playground2"}>
                        <div className={"KPItable"}>
    <table>
        <thead>
            <tr>
               <th>Runde</th>
               <th>Kosten pro Woche</th>
                 <th>Lagergesamtkosten</th>
                 <th>Perfekte Auftragsrate</th>
                <th>Durchschnittlicher Lagerbestand</th>
                <th>Wochen mit Lieferrückstand</th>
            </tr>
        </thead>
        <tbody>
            {gameKPIsdistributor.map(item => {
                return (
                    <tr key={item.roundPlayed}>
                    <td>{item.roundPlayed}</td>
                    <td>{item.storageCostsWeekly}</td>
                    <td>{item.storageCosts}</td>
                    <td>{item.perfectOrderRatePct}%</td>
                    <td>{item.averageStock}</td>
                    <td>{item.backorderWeeksPct}%</td>
                </tr>
                );
                })}
        </tbody>
    </table>
    </div>

    </div>

    </div>


    <h3>Großhändler:</h3>
    <div className={"grid_play2"}>
                    <div className={"playground2"}>
                        <div className={"KPItable"}>
    <table>
        <thead>
            <tr>
               <th>Runde</th>
               <th>Kosten pro Woche</th>
                 <th>Lagergesamtkosten</th>
                 <th>Perfekte Auftragsrate</th>
                <th>Durchschnittlicher Lagerbestand</th>
                <th>Wochen mit Lieferrückstand</th>
            </tr>
        </thead>
        <tbody>
            {gameKPIswholesaler.map(item => {
                return (
                    <tr key={item.roundPlayed}>
                    <td>{item.roundPlayed}</td>
                    <td>{item.storageCostsWeekly}</td>
                    <td>{item.storageCosts}</td>
                    <td>{item.perfectOrderRatePct}%</td>
                    <td>{item.averageStock}</td>
                    <td>{item.backorderWeeksPct}%</td>
                </tr>
                );
                })}
        </tbody>
    </table>
    </div>
    </div>
    </div>


    <h3>Einzelhändler:</h3>
    <div className={"grid_play2"}>
                    <div className={"playground2"}>
                        <div className={"KPItable"}>
    <table>
        <thead>
            <tr>
               <th>Runde</th>
               <th>Kosten pro Woche</th>
                 <th>Lagergesamtkosten</th>
                 <th>Perfekte Auftragsrate</th>
                <th>Durchschnittlicher Lagerbestand</th>
                <th>Wochen mit Lieferrückstand</th>
            </tr>
        </thead>
        <tbody>
            {gameKPIsretailer.map(item => {
                return (
                    <tr key={item.roundPlayed}>
                    <td>{item.roundPlayed}</td>
                    <td>{item.storageCostsWeekly}</td>
                    <td>{item.storageCosts}</td>
                    <td>{item.perfectOrderRatePct}%</td>
                    <td>{item.averageStock}</td>
                    <td>{item.backorderWeeksPct}%</td>
                </tr>
                );
                })}
        </tbody>
    </table>
    </div>
    </div>
    </div>
 </div>


    )
}


export default End
