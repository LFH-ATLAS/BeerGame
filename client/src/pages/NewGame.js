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
                console.log("Socket submit")
                socket.emit("join_game", {
                    gameCode,
                    selectedRole
                })
                setSpielcodeChangeable(true);
            }
            else {
                console.log("Socket submit")
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
        //console.log(gameCode)
    }
    function checkSelected(key) {
        if (key === selectedRole){
            setSelectedRole(0)
        }else{
            setSelectedRole(key)
        }
    }
/*
    function createGame() {
        if(!checkIfStringIsValid(gameCode)) {
            alert("Spielcode nicht korrekt!")
            setInputError(true)
        }
        else if(!rounds) {
            alert("Wählen Sie die Anzahl der Runden aus!")
            setInputError(true)
        }
        else if(!checkIfStringIsValid(startStock, "numeric")) {
            alert("Der Anfangsbestand muss ein numerischer Wert sein!")
        }
        else if(!checkIfStringIsValid(startValue, "numeric")) {
            alert("Die Nachfragemenge muss ein numerischer Wert sein!")
        }
        else if(!checkIfStringIsValid(raisedValue, "numeric")) {
            alert("Die erhöhte Nachfragemenge muss ein numerischer Wert sein!")
        }
        else if(!checkIfStringIsValid(roundOfRaise, "numeric") || roundOfRaise > rounds || roundOfRaise < 1) {
            alert("Die Runde, in der die Nachfragemenge erhöht wird, muss ein numerischer Wert sein und darf nicht kleiner als 1 sowie größer als die Anzahl der Runden sein!")
        }
        else {
            // Überprüfen, ob alle erforderlichen Felder ausgefüllt sind
            /*if(!checkIfStringIsValid(startStock, "numeric") || 
                !checkIfStringIsValid(startValue, "numeric") ||
                !checkIfStringIsValid(raisedValue, "numeric")) {
                alert("Bitte füllen Sie alle erforderlichen Felder aus und stellen Sie sicher, dass sie gültige numerische Werte enthalten!");
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
           // }
        }
    }*/

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
            //case !checkIfStringIsValid(roundOfRaise, "numeric", !0) || roundOfRaise > rounds || roundOfRaise < 1:
                //errorMessage = "Die Runde, in der die Nachfragemenge erhöht wird, muss ein numerischer Wert sein und darf nicht kleiner als 1 sowie größer als die Anzahl der Runden sein!";
                //break;
            case !gameCode || !rounds || !startStock || !startValue || !raisedValue || !roundOfRaise:
                errorMessage = "Bitte füllen Sie alle Felder aus!";
                break;
            /*default:
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
                }) */     
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
    
    

    function getSelectedRounds(e) {
        setRounds(e.target.value)
    }

    let options = ""
    if(selectedGameMode === 1) {
        options = (
            <div className={"options_wrapper"}>
                <span>Geben Sie den Spielcode ein:</span>
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
                    description={"je nach Anzahl der Spielrunden 17 oder 35"}
                    restriction = {"numerical"}
                />
                <Button onClick={createGame}>Spiel erstellen</Button>
            </div>
        )
    }
    else if(selectedGameMode === 2){
        options = (
            <div className={"options_wrapper"}>
                <span>Geben Sie den Spielcode ein:</span>
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
                            <Tile
                                imgSrc={"/icons/factory.svg"}
                                imgAlt={"Neues Spiel"}
                                idKey={1}
                                //getValue={setSelectedRole}
                                getValue={checkSelected}
                                currentSelected={selectedRole}
                                disabled={disabledRoles[0]}                                
                            >Produzent</Tile>
                            <Tile
                                imgSrc={"/icons/box.svg"}
                                imgAlt={"Neues Spiel"}
                                idKey={2}
                                //getValue={setSelectedRole}
                                getValue={checkSelected}
                                currentSelected={selectedRole}
                                disabled={disabledRoles[1]}
                            >Verteiler</Tile>
                            <Tile
                                imgSrc={"/icons/wholesale.svg"}
                                imgAlt={"Neues Spiel"}
                                idKey={3}
                                //getValue={setSelectedRole}
                                getValue={checkSelected}
                                currentSelected={selectedRole}
                                disabled={disabledRoles[2]}
                            >Großhändler</Tile>
                            <Tile
                                imgSrc={"/icons/shop.svg"}
                                imgAlt={"Neues Spiel"}
                                idKey={4}
                                //getValue={setSelectedRole}
                                getValue={checkSelected}
                                currentSelected={selectedRole}
                                disabled={disabledRoles[3]}
                            >Einzelhändler</Tile>
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