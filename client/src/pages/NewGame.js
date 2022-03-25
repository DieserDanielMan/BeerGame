import {useEffect, useState} from "react"
import { Redirect } from "react-router-dom"

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
    const [numericValue, setNumericValue] = useState("")

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
                <div className={"select_rounds"}>
                    <div>
                        <input id={"26"} type={"radio"} name={"rounds"} />
                        <label htmlFor={"26"}>26 Spielrunden</label>
                    </div>
                    <div>
                        <input id={"52"} type={"radio"} name={"rounds"} />
                        <label htmlFor={"52"}>52 Spielrunden</label>
                    </div>
                </div>
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
                <Button>Spiel starten</Button>
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