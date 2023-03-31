import React from "react";

import "../styles/pages/End.css"

import {useEffect, useState} from "react";
import Button from "../components/form/Button";
import { Redirect } from "react-router-dom"



function End(props) {

    const socket = props.socketId

    const [orderValue, setOrderValue] = useState("")
    const [inputActive, setInputActive] = useState(true)
    const [currentRoomSize, setCurrentRoomSize] = useState(0)
    const [currentRoomRoles, setCurrentRoomRoles] = useState([])

    const [currentRound, setCurrentRound] = useState(1)
    const [stock, setStock] = useState(0)
    const [delay, setDelay] = useState(0)
    const [next1WeekDelivery, setNext1WeekDelivery] = useState(0)
    const [next2WeekDelivery, setNext2WeekDelivery] = useState(0)
    const [supplyChainOrder, setSupplyChainOrder] = useState(0)
    const [redirectComponent, setRedirectComponent] = useState(<></>)

    useEffect(() => {

            socket.on("end_screen", (data) => {

            console.log("Endscreen aufgerufen")

            
        })

    })

 
        return (
            <div>
                { redirectComponent }
                <div className={"grid_play"}>
                    <div className={"playground"}>
                        <div className={"timer"}>
                            <p>{currentRound}</p>
                        </div>
                        <div className={"wrapper_img"}>
                        </div>
                        <div className={"line"} />
                        <div className={"wrapper_1"}>
                            <span>Lager: { stock }</span>
                            <span>Verzug: { delay }</span>
                        </div>
                        <div className={"line"} />
                        <div className={"new_order"}>
                            <span>Neue Bestellung:</span>
                        </div>
                        <div className={"line"} />
                        <>
                            <span>Künftige Lieferungen:</span>
                            <div className={"next_products"}>
                                <span>Nächste Woche: {next1WeekDelivery}</span>
                                <span>Übernächste Woche: {next2WeekDelivery}</span>
                            </div>
                        </>
                        <div className={"line"} />
                        <div className={"delivery"}>
                            <span>Lieferanfrage: {supplyChainOrder}</span>
                        </div>
                    </div>
                </div>

                <div>&nbsp;</div>

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
                                    <td>33%</td>

                                </tr>
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