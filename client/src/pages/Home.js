import React from "react";

import "../styles/pages/Home.css"

class Home extends React.Component {
    render() {
        return (
            <div className={"home"}>
                <h2>Herzlich Willkommen auf der Startseite des Beergame! Ein gemeinsames Projekt der Welfen-Akademie und der LeibnizFH.</h2>
                <div className={"logo leibniz"} />
                <div className={"logo welfen"} />
            </div>
        )
    }
}

export default Home