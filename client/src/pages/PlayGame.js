import {useParams} from "react-router-dom"

import "../styles/pages/PlayGame.css"
import InputField from "../components/form/InputField"
import {useEffect} from "react";
import Container from "../components/form/Container";
import InnerContainer from "../components/form/InnerContainer";
import Button from "../components/form/Button";

function PlayGame(props) {

    const gameId = useParams()
    const socket = props.socketId

    useEffect(() => {
        console.log("Comp mount")
        return function cleanup() {
            console.log("Comp unmount")
        }
    })

    return (
        <div className={"grid_play"}>
            <div className={"playground"}>
                <div className={"timer"}>
                    <span>Verbleibende Zeit: 15sec</span>
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
                <div className={"line"} />
                <div className={"costs"}>
                    <span>Lagerkosten: 15</span>
                    <span>Backorderkosten: 0</span>
                    <span>Gesamtkosten: 15</span>
                </div>

            </div>
        </div>
    )
}

export default PlayGame