import {useParams} from "react-router-dom"

import "../styles/pages/PlayGame.css"
import {useEffect} from "react";
import Container from "../components/form/Container";
import InnerContainer from "../components/form/InnerContainer";

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
            <Container
                settings={{
                    id: "settings",
                    mode: {
                        grid: true
                    },
                    style: {
                        padding: 10
                    }}
            }>
                <Container
                    settings={{
                        mode: {
                            grid: true,
                            gridRows: "1fr",
                            gridColumns: "1fr 1fr 1fr"
                        },
                        style: {
                            white: true
                        }
                    }}>
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                    <p>hi</p>
                </Container>
            </Container>
            <Container
                settings={{
                    id: "game",
                    mode: {
                        grid: true
                    }
            }}>

            </Container>
        </div>
    )
}

export default PlayGame