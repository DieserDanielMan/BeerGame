import "../styles/pages/PlayGame.css"
import InputField from "../components/form/InputField"
import {useEffect, useState} from "react";
import Button from "../components/form/Button";
import Countdown from '../lib/Countdown';

function PlayGame(props) {

    const gameCode = JSON.parse(localStorage.getItem("room")) //Spielcode
    const selectedRole = JSON.parse(localStorage.getItem("role")) //Gewählte Spielrolle
    // ==> 1: Produzent | 2: Verteiler | 3: Großhändler | 4: Einzelhändler

    const socket = props.socketId
    const hoursMinSecs = {hours:0, minutes: 0, seconds: 60}

    const [orderValue, setOrderValue] = useState("") //Bestellung
    const [inputActive, setInputActive] = useState(true) //Aktiviert oder Deaktiviert das Eingabefeld für die Bestellung
    const [currentRoomSize, setCurrentRoomSize] = useState(0) //Aktuelle Spieler im Spiel
    const [currentRoomRoles, setCurrentRoomRoles] = useState([]) //Rollen, die bereits vergeben sind

    const [gameRounds, setGameRounds] = useState(0) //Spielrunden (insgesamt)
    const [currentRound, setCurrentRound] = useState(1) //Aktuelle Spielrunde
    const [stock, setStock] = useState(0) //Lagerbestand
    const [delay, setDelay] = useState(0) //Verzögerung
    const [next1WeekDelivery, setNext1WeekDelivery] = useState(0) //Lieferung nächste Woche
    const [next2WeekDelivery, setNext2WeekDelivery] = useState(0) //Lieferung übernächste Woche
    const [supplyChainOrder, setSupplyChainOrder] = useState(0) //Lieferanfrage

    useEffect(() => {
      // Update_Player_Data: Wird aufgerufen, wenn alle die Bestellung abgeschickt haben.
      // Daten werden vom Server berechnet und dann an die Clients gepusht
        socket.on("update_player_data", (data) => {
            console.log("UpdatePlayer aufgerufen")
            console.log(data)
            setCurrentRound(data.roundData.currentRound)
            console.log(data.roundData.currentRound)
            setInputActive(true)
            if(selectedRole === 1) {
                setStock(data.roundData.producer[data.roundData.currentRound-1].stock)
                setDelay(data.roundData.producer[data.roundData.currentRound-1].delay)
                setNext1WeekDelivery(data.roundData.producer[data.roundData.currentRound-1].next1Week)
                setNext2WeekDelivery(data.roundData.producer[data.roundData.currentRound-1].next2Week)
                setSupplyChainOrder(data.roundData.distributor[data.roundData.currentRound-1].order)
            }
            else if(selectedRole === 2) {
                setStock(data.roundData.distributor[data.roundData.currentRound-1].stock)
                setDelay(data.roundData.distributor[data.roundData.currentRound-1].delay)
                setNext1WeekDelivery(data.roundData.distributor[data.roundData.currentRound-1].next1Week)
                setNext2WeekDelivery(data.roundData.distributor[data.roundData.currentRound-1].next2Week)
                setSupplyChainOrder(data.roundData.wholesaler[data.roundData.currentRound-1].order)
            }
            else if(selectedRole === 3) {
                setStock(data.roundData.wholesaler[data.roundData.currentRound-1].stock)
                setDelay(data.roundData.wholesaler[data.roundData.currentRound-1].delay)
                setNext1WeekDelivery(data.roundData.wholesaler[data.roundData.currentRound-1].next1Week)
                setNext2WeekDelivery(data.roundData.wholesaler[data.roundData.currentRound-1].next2Week)
                setSupplyChainOrder(data.roundData.retailer[data.roundData.currentRound-1].order)
            }
            else {
                setStock(data.roundData.retailer[data.roundData.currentRound-1].stock)
                setDelay(data.roundData.retailer[data.roundData.currentRound-1].delay)
                setNext1WeekDelivery(data.roundData.retailer[data.roundData.currentRound-1].next1Week)
                setNext2WeekDelivery(data.roundData.retailer[data.roundData.currentRound-1].next2Week)
                if(currentRound < data.gameSettings.roundOfRaise) {
                  setSupplyChainOrder(data.gameSettings.startValue)
                }
                else {
                  setSupplyChainOrder(data.gameSettings.raisedValue)
                }
                setSupplyChainOrder(data.roundData.retailer[data.roundData.currentRound-1].supplyChainOrder)
            }
        })
        socket.on("initial_data", (data) => {
            console.log(data)
            setGameRounds(data.gameSettings.rounds)
            setStock(data.gameSettings.startStock)
        })
        socket.on("update_room_size", (data) => {
            setCurrentRoomSize(data.roomSize)
            setCurrentRoomRoles(data.selectedRoles)
        })
    })

    function submitOrder() {
        setInputActive(false)
        socket.emit("game_update", {
            gameCode,
            selectedRole,
            orderValue
        })
        setOrderValue("")
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
            roleName = "Produzent"
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
                <div className={"grid_play"}>
                    <div className={"playground"}>
                        <div className={"timer"}>
                            <Countdown hoursMinSecs={hoursMinSecs}/>
                            <p>Runde {currentRound}/{gameRounds}</p>
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
    

}

export default PlayGame