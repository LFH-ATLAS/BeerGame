import React from "react";

import Button from "../components/form/Button"
import "../styles/pages/Home.css"
import {Link} from "react-router-dom";

class Home extends React.Component {
    onClickHandler() {

    }
    render() {
        return (
            <div className={"home"}>
                <h2>Herzlich Willkommen auf der Startseite des Beergame! Ein gemeinsames Projekt der Welfen-Akademie und der LeibnizFH.</h2>
                <div className={"wrapper_logos"}>
                    <div className={"logo leibniz"} />
                    <div className={"logo Beergame"} />
                    <div className={"logo welfen"} />
                </div>
                <h4>Das Ziel des Spiels ist es, Lieferengpässe zu vermeiden und die Bestellungen
                    innerhalb der Lieferkette, trotz Nachfrageschwankungen,
                    jederzeit bedienen zu können.</h4>
                <div className={"wrapper_button"}>
                    <Link to={"/game/create"}>
                        <Button onClick={() => this.onClickHandler}>Spiel starten</Button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Home