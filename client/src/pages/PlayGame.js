import "../styles/pages/PlayGame.css"
import InputField from "../components/form/InputField"
import {useEffect, useState} from "react";
import Container from "../components/form/Container";
import InnerContainer from "../components/form/InnerContainer";
import Button from "../components/form/Button";
import Countdown from '../lib/Countdown';

function PlayGame(props) {

    const gameCode = JSON.parse(localStorage.getItem("room"))
    const selectedRole = JSON.parse(localStorage.getItem("role"))
    const socket = props.socketId
    const hoursMinSecs = {hours:0, minutes: 0, seconds: 60}

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

    useEffect(() => {
        socket.on("update_player_data", (data) => {
            console.log("UpdatePlayer aufgerufen")
            setCurrentRound(data.roundData.currentRound+2)
            setInputActive(true)
            if(selectedRole === 1) {
                setStock(data.roundData.producer[data.roundData.currentRound].stock)
                setDelay(data.roundData.producer[data.roundData.currentRound].delay)
                setNext1WeekDelivery(data.roundData.producer[data.roundData.currentRound].next1Week)
                setNext2WeekDelivery(data.roundData.producer[data.roundData.currentRound].next2Week)
                setSupplyChainOrder(data.roundData.producer[data.roundData.currentRound].supplyChainOrder)
            }
            else if(selectedRole === 2) {
                setStock(data.roundData.distributor[data.roundData.currentRound].stock)
                setDelay(data.roundData.distributor[data.roundData.currentRound].delay)
                setNext1WeekDelivery(data.roundData.distributor[data.roundData.currentRound].next1Week)
                setNext2WeekDelivery(data.roundData.distributor[data.roundData.currentRound].next2Week)
                setSupplyChainOrder(data.roundData.distributor[data.roundData.currentRound].supplyChainOrder)
            }
            else if(selectedRole === 3) {
                setStock(data.roundData.wholesaler[data.roundData.currentRound].stock)
                setDelay(data.roundData.wholesaler[data.roundData.currentRound].delay)
                setNext1WeekDelivery(data.roundData.wholesaler[data.roundData.currentRound].next1Week)
                setNext2WeekDelivery(data.roundData.wholesaler[data.roundData.currentRound].next2Week)
                setSupplyChainOrder(data.roundData.wholesaler[data.roundData.currentRound].supplyChainOrder)
            }
            else {
                setStock(data.roundData.retailer[data.roundData.currentRound].stock)
                setDelay(data.roundData.retailer[data.roundData.currentRound].delay)
                setNext1WeekDelivery(data.roundData.retailer[data.roundData.currentRound].next1Week)
                setNext2WeekDelivery(data.roundData.retailer[data.roundData.currentRound].next2Week)
                setSupplyChainOrder(data.roundData.retailer[data.roundData.currentRound].supplyChainOrder)
            }
        })
        socket.on("initial_data", (data) => {
            console.log(data)
            setStock(data.gameSettings.startStock)
        })
        socket.on("update_room_size", (data) => {
            setCurrentRoomSize(data.roomSize)
            setCurrentRoomRoles(data.selectedRoles)
        })
        /*return function cleanup() {

        }*/
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