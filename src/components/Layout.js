import React from "react";
import { NavLink } from "react-router-dom"

import "../styles/Layout.css";

class Layout extends React.Component {
    render() {
        return (
            <>
                <header>
                    <h1><span className={"orange"}>Welniz</span> | <span className={"italic"}>Beergame</span></h1>
                </header>
                <nav>
                    <ul>
                        <NavLink exact={true} to={"/"} activeClassName={"selected"}>
                            <li>Startseite</li>
                        </NavLink>
                        <br />
                        <NavLink to={"/game/create"} activeClassName={"selected"}>
                            <li>Neues Spiel</li>
                        </NavLink>
                        <NavLink to={"/game/overview"} activeClassName={"selected"}>
                            <li>Spielübersicht</li>
                        </NavLink>
                        <NavLink to={"/game/stats"} activeClassName={"selected"}>
                            <li>Spielauswertung</li>
                        </NavLink>
                    </ul>
                </nav>
                <main>
                    { this.props.children }
                </main>
            </>
        )
    }
}

export default Layout

/*
    Navbar, Header, Main/Content
 */

/*
function Layout() {
    return (
        <>

        </>
    )
}

export default Layout
 */