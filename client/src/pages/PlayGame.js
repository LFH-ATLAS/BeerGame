import "../styles/pages/PlayGame.css"
import InputField from "../components/form/InputField"
import {useEffect, useState} from "react";
import Button from "../components/form/Button";
import { Redirect } from "react-router-dom"
import React from "react";

function PlayGame(props) {

    const gameCode = JSON.parse(localStorage.getItem("room"))
    const selectedRole = JSON.parse(localStorage.getItem("role"))
    const socket = props.socketId
    const [gameKPIs, setGameKPIs] = useState([])

    const [orderValue, setOrderValue] = useState("")
    const [inputActive, setInputActive] = useState(true)
    const [currentRoomSize, setCurrentRoomSize] = useState(0)
    const [currentRoomRoles, setCurrentRoomRoles] = useState([])

    const [currentRound, setCurrentRound] = useState(0)
    const [stock, setStock] = useState(0)
    const [delay, setDelay] = useState(0)
    const [next1WeekDelivery, setNext1WeekDelivery] = useState(0)
    const [next2WeekDelivery, setNext2WeekDelivery] = useState(0)
    const [supplyChainOrder, setSupplyChainOrder] = useState(0)
    const [redirectComponent, setRedirectComponent] = useState(<></>)
    
    const [bestellungfertig, setBestellungFertig] = useState(false)
    const [spielvonmirpausiert, setPausierer] = useState(false)
    const [countdown, setCountdown] = useState(60); // Startwert für den Countdown
    const [isCountdownRunning, setIsCountdownRunning] = useState(false);    
    const [timerpausiertgrund, setGrundTimerStop] = useState("")
    useEffect(() => {
        socket.on("end_screen", (data) => {
            setRedirectComponent(<Redirect to={`/end/${data.gameCode}`} />)
        })

        socket.on("update_player_data", updatePlayerData)

        socket.on("pause_all_countdowns", alertstopcountdown)

        socket.on("resume_all_games", resumeallcountdowns)

        socket.on("initial_data", initialData)

        socket.on("update_room_size", updateRoomSize)

        return () => {
            socket.off("resume_all_games", resumeallcountdowns);
            socket.off('update_player_data', updatePlayerData);
            socket.off('pause_all_countdowns', alertstopcountdown);
            socket.off('initial_data', initialData);
            socket.off('update_room_size', updateRoomSize);
          };
    })

    function initialData(data){
        console.log("initial data")
        console.log(data)
        setStock(data.gameSettings.startStock)

    }

    function updateRoomSize(data){
        
        setCurrentRoomSize(data.roomSize)
        setCurrentRoomRoles(data.selectedRoles)
        if(4 === data.roomSize) {
            startCountdown()
        }
    }

    useEffect(() => {
        let timer;
        if (isCountdownRunning) {
          timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
          }, 1000);
        } // Herunterzählen alle 1000 Millisekunden
    
        // Aufräumen, wenn die Komponente unmountet wird
        return () => clearInterval(timer);
      }, [isCountdownRunning]);

    useEffect(() => {
        if (countdown === 0) {
          // Wenn der Countdown bei 0 ist, mach etwas (z.B. zeige eine Nachricht)
          setIsCountdownRunning(false);
          console.log("Countdown beendet!");
          if(inputActive === true){
          submitOrder()
          }
        }
    }, [countdown]);

    function startCountdown() {
        // Zum testen in der Hochschule
        /*if(selectedRole === 1) {

            setCountdown(60)
        }
        else if(selectedRole === 2) {

            setCountdown(61)
        }
        else if(selectedRole === 3) {
            setCountdown(62)
        }
        else {
            setCountdown(63)
        }*/
        // Für Zuhause
        setCountdown(60);

        setIsCountdownRunning(true);
       
      }

      function resumeallcountdowns(data) {
        if(bestellungfertig)
        {
            setGrundTimerStop("Warte auf nächste Runde")
        }
        else{
            setInputActive(true)
            setIsCountdownRunning(true);
        }
      }

      function alertstopcountdown(data) {

        setInputActive(false)
        setIsCountdownRunning(false);

        var name;
        switch (data) {
            case 1:
              name = "Hersteller"
              break
            case 2:
                name = "Verteiler"
              break
            case 3:
                name = "Großhändler"
              break
            case 4:
                name = "einzelhändler"
          }
          setGrundTimerStop("Countdown wurde von " + name + " pausiert")
        
      }

      function stopCountdown() {
        if(isCountdownRunning){
            socket.emit("pause_countdown", {
            gameCode,
            selectedRole
            
            })
            setIsCountdownRunning(false);
            setPausierer(true)
        }
        else{
            alert("Spiel ist bereits pausiert")
        }
      }

      function resumegame(){
        socket.emit("resume_countdown", {
            gameCode,
            selectedRole            
        })
        setPausierer(false)
      }


    function updatePlayerData(data){
        setOrderValue("");
        startCountdown()
        setBestellungFertig(false)
        console.log(data)
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
            setGameKPIs(data.roundData.distributor[data.roundData.currentRound-1].kpis)

        }
        else if(selectedRole === 3) {
            setStock(data.roundData.wholesaler[data.roundData.currentRound-1].stock)
            setDelay(data.roundData.wholesaler[data.roundData.currentRound-1].delay)
            setNext1WeekDelivery(data.roundData.wholesaler[data.roundData.currentRound-1].next1Week)
            setNext2WeekDelivery(data.roundData.wholesaler[data.roundData.currentRound-1].next2Week)
            setSupplyChainOrder(data.roundData.retailer[data.roundData.currentRound-1].order)
            setGameKPIs(data.roundData.wholesaler[data.roundData.currentRound-1].kpis)
        }
        else {
            setStock(data.roundData.retailer[data.roundData.currentRound-1].stock)
            setDelay(data.roundData.retailer[data.roundData.currentRound-1].delay)
            setNext1WeekDelivery(data.roundData.retailer[data.roundData.currentRound-1].next1Week)
            setNext2WeekDelivery(data.roundData.retailer[data.roundData.currentRound-1].next2Week)
            setSupplyChainOrder(data.roundData.retailer[data.roundData.currentRound-1].supplyChainOrder)
            setGameKPIs(data.roundData.retailer[data.roundData.currentRound-1].kpis)

        }
    }

    function submitOrder() {
        if(orderValue > 9999 && orderValue > -1){
            alert("Der Bestellwert muss zwischen 0 und 9999 sein")
        }
        else{
            setInputActive(false)

            socket.emit("game_update", {
                gameCode,
                selectedRole,
                orderValue
            })
    
            setIsCountdownRunning(false);
            setBestellungFertig(true);
            setGrundTimerStop("Warte auf nächste Runde")
        }
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

        <button onClick={stopCountdown}>Countdown Toggeln</button>

        let inputAndButton = <></>

        if(inputActive) {
            inputAndButton = (
                <>
                    <InputField
                        name={"Bestellmenge"}
                        getValue={setOrderValue}
                        setValue={orderValue}
                        description={"Zulässige Zeichen: 0-9"}
                        restriction = {"numerical"}
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
                        restriction = {"numerical"}
                    />
                    <Button onClick={submitOrder} disabled={true}>Bestellen</Button>
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
                    {spielvonmirpausiert ? (
                        <button onClick={resumegame}>Fortsetzen</button>
                            ) : (
                         <button onClick={stopCountdown}>Pause</button>
                        )}
                        <div className={"timer"}>
                        {isCountdownRunning ? (
                         <div>Timer: {countdown}</div>
                             ) : (
                          <div>{timerpausiertgrund}</div>
                        )}
                            <p>Runde: {currentRound}</p>
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
