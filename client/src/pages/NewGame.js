import {useEffect, useState} from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"

import "../styles/pages/NewGame.css"
import Tile from "../components/Tile"
import Button from "../components/form/Button"
import InputField from "../components/form/InputField"
import checkIfStringIsValid from "../lib/checkIfStringIsValid";
import Switch from "../components/form/Switch";
import NumericInput from "../components/form/NumericInput";

function NewGame(props) {

    const socket = props.socketId

    const [selectedGameMode, setSelectedGameMode] = useState(0)
    const [selectedRole, setSelectedRole] = useState(0)
    const [gameCode, setGameCode] = useState("")
    const [redirect, setRedirect] = useState("")
    const [rounds, setRounds] = useState(0)
    const [numericValue, setNumericValue] = useState("")
    const [startStock, setStartStock]= useState(0)
    const [startValue, setStartValue]= useState(0)
    const [raisedValue, setRaisedValue]= useState(0)
    const [roundOfRaise, setRoundOfRaise]= useState(0)

    const [selectRoleMenu, setSelectRoleMenu] = useState(false)

    const [inputError, setInputError] = useState(false)

    let redirectComponent = <></>
    useEffect(() => {
        socket.on("join_to_game", (data) => {
            console.log("Socket called")
            if(data.head.err)
                alert(data.head.errMsg + socket.id)
            else
            {
                //setRedirect(data.body.room)
                setSelectRoleMenu(true)
            }
        })
        return function cleanup() {
            socket.off("join_to_game")
        }
    }, [])

    if(redirect.length > 0)
    {
        redirectComponent = <Redirect to={`/game/play/${gameCode}`} />
    }

    function onJoinGameClick() {
        if(checkIfStringIsValid(gameCode)) {
            socket.emit("join_game", gameCode)
        }
        else {
            alert("Nicht korrekt ")
            setInputError(true)
        }
        //console.log(gameCode)
    }

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
        /*else if(!checkIfStringIsValid(roundOfRaise, "numeric") || roundOfRaise > rounds || roundOfRaise < 1) {
            alert("Die Runde, in der die Nachfragemenge erhöht wird, muss ein numerischer Wert sein und darf nicht kleiner als 1 sowie größer als die Anzahl der Runden sein!")
        }*/
        else {
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
                <fieldset disabled>
                <span>Wählen Sie den Anfangsbestand der Spieler:</span>
                <InputField 
                    name={"15"}
                    getValue={setStartStock}
                    description={"Bsp.: 15"}
                    
                /> 
                <span>Wählen Sie die Nachfragemenge:</span>
                <InputField
                    name={"5"}
                    getValue={setStartValue}
                    description={"Bsp.: 5"}
                /> 
                <span>Wählen Sie die erhöhte Nachfrage:</span>
                <InputField
                    name={"10"}
                    getValue={setRaisedValue}
                    description={"Bsp.: 10"}
                /> 
                <span>Wählen Sie die Runde in der die Nachfragemenge erhöht wird:</span>
                <InputField
                    name={"17"}
                    getValue={setRoundOfRaise}
                    description={"je nach Anzahl der Sielrunden 17 oder 35"}
                /> 
                </fieldset>

                {/*
                    <span>Wählen Sie eine Rolle:</span>
                    <div className={"select_role"}>
                        <Tile
                            imgSrc={"/icons/factory.svg"}
                            imgAlt={"Neues Spiel"}
                            idKey={1}
                            getValue={setSelectedRole}
                            currentSelected={selectedRole}
                        >Produzent</Tile>
                        <Tile
                            imgSrc={"/icons/box.svg"}
                            imgAlt={"Neues Spiel"}
                            idKey={2}
                            getValue={setSelectedRole}
                            currentSelected={selectedRole}
                        >Verteiler</Tile>
                        <Tile
                            imgSrc={"/icons/wholesale.svg"}
                            imgAlt={"Neues Spiel"}
                            idKey={3}
                            getValue={setSelectedRole}
                            currentSelected={selectedRole}
                        >Großhändler</Tile>
                        <Tile
                            imgSrc={"/icons/shop.svg"}
                            imgAlt={"Neues Spiel"}
                            idKey={4}
                            getValue={setSelectedRole}
                            currentSelected={selectedRole}
                        >Einzelhändler</Tile>
                    </div>
                */}
                <Button onClick={createGame}>Spiel erstellen</Button>
            </div>
        )
    }
    else if(selectedGameMode === 2){
        options = (
            <div className={"options_wrapper"}>
                <span>Geben Sie den Spielcode ein:</span>
                <InputField
                    name={"Spielcode"}
                    getValue={setGameCode}
                    invalid={inputError}
                    description={"Zulässige Zeichen: A-Z, a-z, 0-9"}
                />
                {selectRoleMenu ?
                    <>
                        <span>Wählen Sie eine Rolle:</span>
                        <div className={"select_role"}>
                            <Tile
                                imgSrc={"/icons/factory.svg"}
                                imgAlt={"Neues Spiel"}
                                idKey={1}
                                getValue={setSelectedRole}
                                currentSelected={selectedRole}
                            >Produzent</Tile>
                            <Tile
                                imgSrc={"/icons/box.svg"}
                                imgAlt={"Neues Spiel"}
                                idKey={2}
                                getValue={setSelectedRole}
                                currentSelected={selectedRole}
                            >Verteiler</Tile>
                            <Tile
                                imgSrc={"/icons/wholesale.svg"}
                                imgAlt={"Neues Spiel"}
                                idKey={3}
                                getValue={setSelectedRole}
                                currentSelected={selectedRole}
                            >Großhändler</Tile>
                            <Tile
                                imgSrc={"/icons/shop.svg"}
                                imgAlt={"Neues Spiel"}
                                idKey={4}
                                getValue={setSelectedRole}
                                currentSelected={selectedRole}
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