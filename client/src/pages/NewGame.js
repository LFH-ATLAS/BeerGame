import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
//import { KeyboardEvent } from "react"

import "../styles/pages/NewGame.css"
import Tile from "../components/Tile"
import Button from "../components/form/Button"
import InputField from "../components/form/InputField"
import checkIfStringIsValid from "../lib/checkIfStringIsValid";

function NewGame(props) {

    const socket = props.socketId

    const [selectedGameMode, setSelectedGameMode] = useState(0)
    const [selectedRole, setSelectedRole] = useState(0)
    const [gameCode, setGameCode] = useState("")
    const [rounds, setRounds] = useState(0)
    const [startStock, setStartStock]= useState(0)
    const [startValue, setStartValue]= useState(0)
    const [raisedValue, setRaisedValue]= useState(0)
    const [roundOfRaise, setRoundOfRaise]= useState(0)

    const [selectRoleMenu, setSelectRoleMenu] = useState(false)
    const [disabledRoles, setDisabledRoles] = useState([0,0,0,0])

    const [inputError, setInputError] = useState(false)

    const [redirectComponent, setRedirectComponent] = useState(<></>)

    const [spielcodeChangeable, setSpielcodeChangeable] = useState(false);

    useEffect(() => {
        socket.on("join_to_game", (data) => {
            console.log("Socket called")
            if(data.head.err)
                alert(data.head.errMsg)
            else
            {
                console.log("Rolle gewählt: " + data.body)
                localStorage.setItem("role", JSON.stringify(data.body.role))
                localStorage.setItem("room", JSON.stringify(data.body.room))
                setRedirectComponent(<Redirect to={`/game/play/${data.body.room}`} />)
            }
        })
        socket.on("game_choose_role", data => {
            console.log(data)
            setSelectRoleMenu(true)

            let tempArray = []
            if(data.producer === "NA")
                tempArray.push(false)
            else tempArray.push(true)
            if(data.distributor === "NA")
                tempArray.push(false)
            else tempArray.push(true)
            if(data.wholesaler === "NA")
                tempArray.push(false)
            else tempArray.push(true)
            if(data.retailer === "NA")
                tempArray.push(false)
            else tempArray.push(true)
            setDisabledRoles(tempArray)
        })
        socket.on("game_create", data => {
            if(data.head.err) {
                alert(data.head.errMsg)
            }
            else {
                setSelectedGameMode(2)
                alert(data.head.message)
            }
        })
        return function cleanup() {
            socket.off("join_to_game")
            socket.off("game_choose_role")
            socket.off("game_create")
        }
    }, [socket]) //Socket hinzugefügt

    function onJoinGameClick() {
        if(checkIfStringIsValid(gameCode)) {
            if(selectedRole === 0) {
                console.log("Socket submit1")
                socket.emit("join_game", {
                    gameCode,
                    selectedRole
                })
                setSpielcodeChangeable(true);
            }
            else {
                console.log("Socket submit2")
                socket.emit("join_game", {
                    gameCode,
                    selectedRole
                })
            }
        }
        else {
            alert("Nicht korrekt ")
            setInputError(true)
        }
    }
    function checkSelected(key) {
        if (key === selectedRole){
            setSelectedRole(0)
        }else{
            setSelectedRole(key)
        }
    }


    function createGame() {
        let errorMessage = null;
    
        switch (true) {
            case !checkIfStringIsValid(gameCode):
                errorMessage = "Spielcode nicht korrekt!";
                break;
            case !rounds:
                errorMessage = "Wählen Sie die Anzahl der Runden aus!";
                break;
            case !checkIfStringIsValid(startStock, "numeric", !0):
                errorMessage = "Der Anfangsbestand muss ein numerischer Wert sein!";
                break;
            case !checkIfStringIsValid(startValue, "numeric", !0):
                errorMessage = "Die Nachfragemenge muss ein numerischer Wert sein!";
                break;
            case !checkIfStringIsValid(raisedValue, "numeric", !0):
                errorMessage = "Die erhöhte Nachfragemenge muss ein numerischer Wert sein!";
                break;
            case !checkIfStringIsValid(Number(roundOfRaise), rounds, !0):
                errorMessage = "Die Runde der erhöhten Nachfrage muss innerhalb der Vorgaben gewählt werden";
                break;
            case !gameCode || !rounds || !startStock || !startValue || !raisedValue || !roundOfRaise:
                errorMessage = "Bitte füllen Sie alle Felder aus!";
                break;   
        }
        
        if (errorMessage !== null) {
            alert(errorMessage);
            setInputError(true);
        } else {
            socket.emit("game_create", {
                gameCode,
                gameCreated: new Date(),
                gameSettings: {
                    rounds,
                    startStock,
                    startValue,
                    raisedValue,
                    roundOfRaise
                },
                roundData: {
                    currentRound: 0,
                    producer: [],
                    distributor: [],
                    wholesaler: [],
                    retailer: []
                }
            })
        }
    }

    function deleteGameCode(){
        setSelectedGameMode(0)
        setSpielcodeChangeable(false)
        setSelectRoleMenu(false)
    }    

    function getSelectedRounds(e) {
        setRounds(e.target.value)
    }

    let options = ""
    if(selectedGameMode === 1) {
        options = (
            <div className={"options_wrapper"}>
                <div>
                <span>Geben Sie den Spielcode ein:</span>
                <span className={"span_X"} onClick={deleteGameCode}>X</span>
                </div>
                <InputField
                    name={"Spielcode"}
                    getValue={setGameCode}
                    description={"Zulässige Zeichen: A-Z, a-z, 0-9"}
                />
                <span>Wählen Sie die Anzahl der Spielrunden:</span>
                <div className={"select_rounds"} onChange={getSelectedRounds}>
                    <div>
                        <input id={"26"} type={"radio"} name={"rounds"} value={26}/>
                        <label htmlFor={"26"}>26 Spielrunden</label>
                    </div>
                    <div>
                        <input id={"52"} type={"radio"} name={"rounds"} value={52} />
                        <label htmlFor={"52"}>52 Spielrunden</label>
                    </div>
                </div>
                
                <span>Wählen Sie den Anfangsbestand der Spieler:</span>
                <InputField 
                    name={"Anfangsbestand"}
                    getValue={setStartStock}
                    description={"Bsp.: 15"}
                    restriction = {"numerical"}
                    
            
                    
                /> 
                <span>Wählen Sie die Nachfragemenge:</span>
                <InputField
                    name={"Nachfragemenge"}
                    getValue={setStartValue}
                    description={"Bsp.: 5"}
                    restriction = {"numerical"}
                /> 
                <span>Wählen Sie die erhöhte Nachfrage:</span>
                <InputField
                    name={"erhöhte Nachfragemenge"}
                    getValue={setRaisedValue}
                    description={"Bsp.: 10"}
                    restriction = {"numerical"}
                /> 
                <span>Wählen Sie die Runde in der die Nachfragemenge erhöht wird:</span>
                <InputField
                    name={"Runde der Erhöhung"}
                    getValue={setRoundOfRaise}
                    description={"Zwischen 5 und 17 oder 35 je nach gewählter Rundenanzahl"}
                    restriction = {"numerical"}
                />
                <Button onClick={createGame}>Spiel erstellen</Button>
            </div>
        )
    }
    else if(selectedGameMode === 2){
        options = (
            <div className={"options_wrapper"}>
                <div>
                <span>Geben Sie den Spielcode ein:</span>
                <span className={"span_X"} onClick={deleteGameCode}>X</span>
                </div>
                <InputField
                    id={"spielcodeID"}
                    name={"Spielcode"}
                    getValue={setGameCode}
                    invalid={inputError}
                    description={"Zulässige Zeichen: A-Z, a-z, 0-9"}
                    disabled = {spielcodeChangeable}
                />
                {selectRoleMenu ? 
                    <>
                        <span>Wählen Sie eine Rolle:</span>
                        <div className={"select_role"}>
                            <div data-toggle="tooltip"  data-placement="top" title="Der Produzent ist für die Herstellung des Produkts verantwortlich. Seine Aufgabe besteht darin,
                            die Bestellungen des Großhändlers zu erfüllen und das Produkt rechtzeitig zu liefern.">
                                <Tile 
                                imgSrc={"/icons/factory.svg"}
                                imgAlt={"Neues Spiel"}
                                idKey={1}
                                getValue={checkSelected}
                                currentSelected={selectedRole}
                                disabled={disabledRoles[0]}                                
                            >Produzent</Tile>
                            </div>
                            <div data-toggle="tooltip"  data-placement="top" title="Der Verteiler ist für die Lieferung des Produkts vom Hersteller an den
                            Großhändler verantwortlich. Seine Aufgabe ist es, die Bestellungen des 
                            Großhändlers auszuführen und den Einzelhändler zu informieren.">
                            <Tile
                                imgSrc={"/icons/box.svg"}
                                imgAlt={"Neues Spiel"}
                                idKey={2}
                                getValue={checkSelected}
                                currentSelected={selectedRole}
                                disabled={disabledRoles[1]}
                            >Verteiler</Tile>
                                                        </div>
                            <div data-toggle="tooltip"  data-placement="top" title="Der Großhändler nimmt die Bestellungen des Einzelhändlers
                            entgegen und bestellt das Produkt beim Verteiler. Seine Aufgabe ist es, den 
                            Einzelhändler zu beliefern und die Lagerbestände zu verwalten.">
                            <Tile
                                imgSrc={"/icons/wholesale.svg"}
                                imgAlt={"Neues Spiel"}
                                idKey={3}
                                getValue={checkSelected}
                                currentSelected={selectedRole}
                                disabled={disabledRoles[2]}
                            >Großhändler</Tile>
                                                        </div>
                            <div data-toggle="tooltip"  data-placement="top" title="Der Einzelhändler nimmt Kundenbestellungen entgegen und bestellt 
                            das Produkt beim Großhändler. Seine Aufgabe besteht darin, die Kundennachfrage 
                            zu befriedigen und den Lagerbestand zu überwachen.">
                            <Tile
                                imgSrc={"/icons/shop.svg"}
                                imgAlt={"Neues Spiel"}
                                idKey={4}
                                getValue={checkSelected}
                                currentSelected={selectedRole}
                                disabled={disabledRoles[3]}
                            >Einzelhändler</Tile>
                            </div>
                        </div>
                        
                    </>
                :
                    <></>
                }
                {selectRoleMenu ?
                    <Button
                        onClick={onJoinGameClick}
                    >
                        Spiel beitreten
                    </Button>
                    :
                    <Button
                        onClick={onJoinGameClick}                        
                    >
                        Spielrolle wählen
                    </Button>


                }
            </div>
        )
    }
    else {
        options = ""
    }

    return (
        <div className={"game_select"}>
            { redirectComponent }
            <div className={"tile_wrapper"}>
                <Tile
                    imgSrc={"/icons/new.svg"}
                    imgAlt={"Neues Spiel"}
                    idKey={1}
                    getValue={setSelectedGameMode}
                    currentSelected={selectedGameMode}
                >
                    Neues Spiel erstellen
                </Tile>          
                    <Tile
                        imgSrc={"/icons/people.svg"}
                        imgAlt={"Spiel beitreten"}
                        idKey={2}
                        getValue={setSelectedGameMode}
                        currentSelected={selectedGameMode}  
                    >
                    Bestehendem Spiel beitreten
                    </Tile>

            </div>
            { options }
        </div>
    )
}

export default NewGame