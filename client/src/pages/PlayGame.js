import "../styles/pages/PlayGame.css"
import InputField from "../components/form/InputField"
import {useEffect, useState} from "react";
import Button from "../components/form/Button";
import Countdown from '../lib/Countdown';
import { Redirect } from "react-router-dom"


function PlayGame(props) {

    const gameCode = JSON.parse(localStorage.getItem("room"))
    const selectedRole = JSON.parse(localStorage.getItem("role"))
    const socket = props.socketId
    const hoursMinSecs = {hours:0, minutes: 0, seconds: 60}
    const [gameKPIs, setGameKPIs] = useState([])
    const [kpiCounter, setKPICounter] = useState(1)

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
                setRedirectComponent(<Redirect to={`/end`} />)
            })

            socket.on("update_player_data", updatePlayerData)
            
        socket.on("initial_data", (data) => {
            console.log("initial data")
            console.log(data)
            setStock(data.gameSettings.startStock)
        })
        socket.on("update_room_size", (data) => {
            setCurrentRoomSize(data.roomSize)
            setCurrentRoomRoles(data.selectedRoles)
        })
        return () => {
            socket.off('update_player_data', updatePlayerData);
          };
    })


    function updatePlayerData(data){
        setCurrentRound(data.roundData.currentRound)
        setInputActive(true) 
        if(selectedRole === 1) {
            setStock(data.roundData.producer[data.roundData.currentRound-1].stock)
            setDelay(data.roundData.producer[data.roundData.currentRound-1].delay)
            setNext1WeekDelivery(data.roundData.producer[data.roundData.currentRound-1].next1Week)
            setNext2WeekDelivery(data.roundData.producer[data.roundData.currentRound-1].next2Week)
            setSupplyChainOrder(data.roundData.distributor[data.roundData.currentRound-1].order)
            setGameKPIs(data.roundData.producer[data.roundData.currentRound-1].kpis)
                    
        }
        else if(selectedRole === 2) {
            setStock(data.roundData.distributor[data.roundData.currentRound-1].stock)
            setDelay(data.roundData.distributor[data.roundData.currentRound-1].delay)
            setNext1WeekDelivery(data.roundData.distributor[data.roundData.currentRound-1].next1Week)
            setNext2WeekDelivery(data.roundData.distributor[data.roundData.currentRound-1].next2Week)
            setSupplyChainOrder(data.roundData.wholesaler[data.roundData.currentRound-1].order)
            setGameKPIs(data.roundData.producer[data.roundData.currentRound-1].kpis)

        }
        else if(selectedRole === 3) {
            setStock(data.roundData.wholesaler[data.roundData.currentRound-1].stock)
            setDelay(data.roundData.wholesaler[data.roundData.currentRound-1].delay)
            setNext1WeekDelivery(data.roundData.wholesaler[data.roundData.currentRound-1].next1Week)
            setNext2WeekDelivery(data.roundData.wholesaler[data.roundData.currentRound-1].next2Week)
            setSupplyChainOrder(data.roundData.retailer[data.roundData.currentRound-1].order)
            setGameKPIs(data.roundData.producer[data.roundData.currentRound-1].kpis)
        }
        else {
            setStock(data.roundData.retailer[data.roundData.currentRound-1].stock)
            setDelay(data.roundData.retailer[data.roundData.currentRound-1].delay)
            setNext1WeekDelivery(data.roundData.retailer[data.roundData.currentRound-1].next1Week)
            setNext2WeekDelivery(data.roundData.retailer[data.roundData.currentRound-1].next2Week)
            setSupplyChainOrder(data.roundData.retailer[data.roundData.currentRound-1].supplyChainOrder)
            setGameKPIs(data.roundData.producer[data.roundData.currentRound-1].kpis)

        }
    }
    
    function appendArray(data){
        console.log("KPI Counter: " + kpiCounter)
        if(gameKPIs.length <=kpiCounter){
            //const tempGameKPIs = [...gameKPIs, data.roundData.producer[data.roundData.currentRound-1].kpis]
            
            //setKPICounter(kpiCounter + 1)
        }
    }

    function submitOrder() {
        setInputActive(false)

        socket.emit("game_update", {
            gameCode,
            selectedRole,
            orderValue
        })


    }


    if(currentRoomSize < 4) {
        return (
            <div>
                <div className={"grid_play"}>
                    <div className={"playground"}>
                        <h2>Warten auf Mitspieler</h2>
                        <p>Derzeit sind <b>{ currentRoomSize }</b> von <b>4</b> Spielern in der Lobby.</p>
                        <p>======================== Folgende Rollen sind belegt ========================</p>
                        { currentRoomRoles.map(element => {
                            return <p key={element}>{element}</p>
                        }) }
                    </div>
                </div>
            </div>
        )
    }
    else {
        let inputAndButton = <></>
        if(inputActive) {
            inputAndButton = (
                <>
                    <InputField
                        name={"Bestellmenge"}
                        getValue={setOrderValue}
                        setValue={orderValue}
                        description={"Zulässige Zeichen: 0-9"}
                    />
                    <Button onClick={submitOrder}>Bestellen</Button>
                </>
            )
        }
        else {
            inputAndButton = (
                <>
                    <InputField
                        name={"Bestellmenge"}
                        getValue={setOrderValue}
                        setValue={orderValue}
                        description={"Zulässige Zeichen: 0-9"}
                        disabled={true}
                    />
                    <Button onClick={submitOrder}>Bestellen</Button>
                </>
            )
        }

        let roleIcon = <></>
        let roleName = ""
        if(selectedRole === 1) {
            roleIcon = "/icons/factory.svg"
            roleName = "Hersteller"
        }
        else if(selectedRole === 2) {
            roleIcon = "/icons/box.svg"
            roleName = "Verteiler"
        }
        else if(selectedRole === 3) {
            roleIcon = "/icons/wholesale.svg"
            roleName = "Großhändler"
        }
        else {
            roleIcon = "/icons/shop.svg"
            roleName = "Einzelhändler"
        }


        return (
            <div>
                { redirectComponent }
                <div className={"grid_play"}>
                    <div className={"playground"}>
                        <div className={"timer"}>
                            <Countdown hoursMinSecs={hoursMinSecs}/>
                            <p>{currentRound}</p>
                        </div>
                        <div className={"wrapper_img"}>
                            <img src={roleIcon} alt={"Icon"} />
                            <span>{roleName}</span>
                        </div>
                        <div className={"line"} />
                        <div className={"wrapper_1"}>
                            <span>Lager: { stock }</span>
                            <span>Verzug: { delay }</span>
                        </div>
                        <div className={"line"} />
                        <div className={"new_order"}>
                            <span>Neue Bestellung:</span>
                            { inputAndButton }
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
                                     {gameKPIs.map(item => {
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
    

}

export default PlayGame