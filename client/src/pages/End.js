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
    
    let distributorData

    useEffect(() => {
        console.log(gameCode);

        socket.emit("endscreendata", {
            gameCode
        })

        socket.on("update_end_Screen", (data) => {
            console.log("UpdatePlayer aufgerufen")
            console.log(data)
            
            const distributorData = data;


        })

    }
)

    return (
  <div>

<table>
  <thead>
    <tr>
      <th>Round</th>
      <th>Field 1</th>
      <th>Field 2</th>
    </tr>
  </thead>
  <tbody>

{distributorData.forEach(game => {
    game.roundData.distributor.forEach((roundData, index) => {
      return (
        <tr key={index}>
          <td>{roundData.delay}</td>
          <td>{roundData.next1week}</td>
        </tr>
      )
    })
  })
}
</tbody>
</table>



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