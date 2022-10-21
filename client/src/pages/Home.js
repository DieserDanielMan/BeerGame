import React from "react";

import Button from "../components/form/Button"
import "../styles/pages/Home.css"
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div className={"home"}>
        <h2>Herzlich Willkommen auf der Startseite des Beergame! Ein gemeinsames Projekt der Welfen-Akademie und der LeibnizFH.</h2>
        <div className={"wrapper_logos"}>
          <a href="https://leibniz-fh.de/" id="logo">
            <div className={"logo leibniz"} />
          </a>
          <div className={"logo Beergame"} />
          <a href="https://www.welfenakademie.de/" id="logo">
            <div className={"logo welfen"} />
          </a>
        </div>
        <h4>Das Ziel des Spiels ist es, Lieferengpässe zu vermeiden und die Bestellungen
        innerhalb der Lieferkette, trotz Nachfrageschwankungen,
        jederzeit bedienen zu können.</h4>
        <div className={"wrapper_button"}>
          <Link to={"/game/create"}>
            <Button linkTo={"/game/create"}>Spiel starten</Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home