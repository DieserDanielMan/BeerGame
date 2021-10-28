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
    const [gameCode, setGameCode] = useState("")
    const [redirect, setRedirect] = useState("")
    const [numericValue, setNumericValue] = useState("")

    const [inputError, setInputError] = useState(false)

    let redirectComponent = <></>
    useEffect(() => {
        socket.on("join_to_game", (data) => {
            console.log("Socket called")
            if(data.head.err)
                alert(data.head.errMsg + socket.id)
            else
                setRedirect(data.body.room)
        })
        return function cleanup() {
            socket.off("join_to_game")
        }
    }, [])
//daniel stinkt

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
                <InputField
                    name={"Spielcode"}
                    getValue={setGameCode}
                    description={"Zulässige Zeichen: A-Z, a-z, 0-9"}
                />

            </div>
        )
    }
    else if(selectedGameMode === 2){
        options = (
            <div className={"options_wrapper half"}>
                <InputField
                    name={"Spielcode"}
                    getValue={setGameCode}
                    invalid={inputError}
                    description={"Zulässige Zeichen: A-Z, a-z, 0-9"}
                />
                <Button
                    onClick={onJoinGameClick}
                >
                    Spiel beitreten
                </Button>
                <Switch id={"test"} name={"This is name"}>
                    <p>Test</p>
                </Switch>
                <NumericInput
                    name={"Anzahl der Runden"}
                    getValue={setNumericValue}
                />
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