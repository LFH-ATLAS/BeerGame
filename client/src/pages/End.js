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

















































/*
class End extends React.Component {
    onClickHandler() {

    }
    render() {
        return (
            <div className={"end"}>
                <h2>Herzlichen Glückwunsch!</h2>
                <h3>Ihr habt das Spiel abgeschlossen</h3>
                
                <h5>Hersteller</h5>

                <div className={"grid_play2"}>
                    <div className={"playground2"}>
                        <div className={"KPItable"}>
                            <table>
                                 <tr>
                                    <th>Runde</th>
                                    <th>Lagerkosten</th>
                                    <th>Gesamtkosten</th>
                                    <th>Perfekte Auftragsrate</th>
                                    <th>Durchschnittlicher Lagerbestand</th>
                                    <th>Wochen mit Lieferrückstand</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>20</td>
                                    <td>20</td>
                                    <td>80%</td>
                                    <td>10</td>
                                    <td>0%</td>

                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>20</td>
                                    <td>40</td>
                                    <td>50%</td>
                                    <td>15</td>
                                    <td>50%</td>

                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>10</td>
                                    <td>50</td>
                                    <td>66%</td>
                                    <td>13</td>
                                    <td>66%</td>

                                </tr>
                            </table>    
                            
                                 
                        </div>
                    </div>
                </div>   

                <h5>Lieferant</h5>
                <div className={"grid_play2"}>
                    <div className={"playground2"}>
                        <div className={"KPItable"}>
                            <table>
                                 <tr>
                                    <th>Runde</th>
                                    <th>Lagerkosten</th>
                                    <th>Gesamtkosten</th>
                                    <th>Perfekte Auftragsrate</th>
                                    <th>Durchschnittlicher Lagerbestand</th>
                                    <th>Wochen mit Lieferrückstand</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>20</td>
                                    <td>20</td>
                                    <td>80%</td>
                                    <td>10</td>
                                    <td>0%</td>

                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>20</td>
                                    <td>40</td>
                                    <td>50%</td>
                                    <td>15</td>
                                    <td>50%</td>

                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>10</td>
                                    <td>50</td>
                                    <td>66%</td>
                                    <td>13</td>
                                    <td>66%</td>

                                </tr>
                            </table>    
                            
                                 
                        </div>
                    </div>
                </div> 

                <h5>Großhändler</h5>

                <div className={"grid_play2"}>
                    <div className={"playground2"}>
                        <div className={"KPItable"}>
                            <table>
                                 <tr>
                                    <th>Runde</th>
                                    <th>Lagerkosten</th>
                                    <th>Gesamtkosten</th>
                                    <th>Perfekte Auftragsrate</th>
                                    <th>Durchschnittlicher Lagerbestand</th>
                                    <th>Wochen mit Lieferrückstand</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>20</td>
                                    <td>20</td>
                                    <td>80%</td>
                                    <td>10</td>
                                    <td>0%</td>

                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>20</td>
                                    <td>40</td>
                                    <td>50%</td>
                                    <td>15</td>
                                    <td>50%</td>

                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>10</td>
                                    <td>50</td>
                                    <td>66%</td>
                                    <td>13</td>
                                    <td>66%</td>

                                </tr>
                            </table>    
                            
                                 
                        </div>
                    </div>
                </div> 

                <h5>Einzelhändler</h5>

                <div className={"grid_play2"}>
                    <div className={"playground2"}>
                        <div className={"KPItable"}>
                            <table>
                                 <tr>
                                    <th>Runde</th>
                                    <th>Lagerkosten</th>
                                    <th>Gesamtkosten</th>
                                    <th>Perfekte Auftragsrate</th>
                                    <th>Durchschnittlicher Lagerbestand</th>
                                    <th>Wochen mit Lieferrückstand</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>20</td>
                                    <td>20</td>
                                    <td>80%</td>
                                    <td>10</td>
                                    <td>0%</td>

                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>20</td>
                                    <td>40</td>
                                    <td>50%</td>
                                    <td>15</td>
                                    <td>50%</td>

                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>10</td>
                                    <td>50</td>
                                    <td>66%</td>
                                    <td>13</td>
                                    <td>66%</td>

                                </tr>
                            </table>    
                            
                                 
                        </div>
                    </div>
                </div>
                <div className={"wrapper_button"}>
                    {/* <Link to={"/game/create"}>
                        <Button linkTo={"/game/create"}>Spiel starten</Button>
                    </Link> }
                </div>
            </div>
        )
    }
}
*/
export default End