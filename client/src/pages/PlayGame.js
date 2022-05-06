import {useParams} from "react-router-dom"

import "../styles/pages/PlayGame.css"
import InputField from "../components/form/InputField"
import {useEffect} from "react";
import Container from "../components/form/Container";
import InnerContainer from "../components/form/InnerContainer";
import Button from "../components/form/Button";
import Countdown from '../lib/Countdown';

function PlayGame(props) {

    const gameId = useParams()
    const socket = props.socketId

    useEffect(() => {
        console.log("Comp mount")
        return function cleanup() {
            console.log("Comp unmount")
        }
    })

    const hoursMinSecs = {hours:0, minutes: 0, seconds: 60}
    
    return (
        <div>
            <div className={"grid_play"}>
                <div className={"playground"}>
                    <div className={"timer"}>
                        <Countdown hoursMinSecs={hoursMinSecs}/>
                    </div>
                    <div className={"wrapper_img"}>
                        <img src={"/icons/box.svg"} alt={"Icon"} />
                        <span>Spielrolle</span>
                    </div>
                    <div className={"line"} />
                    <div className={"wrapper_1"}>
                        <span>Lager: 15</span>
                        <span>Verzug: 156</span>
                    </div>
                    <div className={"line"} />
                    <div className={"new_order"}>
                        <span>Neue Bestellung:</span>
                        <InputField />
                        <Button>Bestellen</Button>
                    </div>
                    <div className={"line"} />
                    <>
                        <span>Künftige Lieferungen:</span>
                        <div className={"next_products"}>
                            <span>Nächste Woche: 45</span>
                            <span>Übernächste Woche: 45</span>
                        </div>
                    </>
                    <div className={"line"} />
                    <div className={"delivery"}>
                        <span>Lieferanfrage: 15</span>
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

export default PlayGame