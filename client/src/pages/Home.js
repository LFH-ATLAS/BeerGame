import React from "react";

import Button from "../components/form/Button"
import "../styles/pages/Home.css"
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div className={"home"}>
        <h2>Herzlich Willkommen auf der Startseite des Beergame! Ein gemeinsames Projekt der Welfen-Akademie und der LeibnizFH.</h2>
        <div class="col-3" className={"wrapper_logos"}>
          <a href="https://leibniz-fh.de/" id="logo">
            <div  class="col-3"className={"logo leibniz"} />
          </a>
          <div class="col-3" className={"logo Beergame"} />
          <a href="https://www.welfenakademie.de/" id="logo">
            <div className={"logo welfen"} />
          </a>
        </div>
        <h4>Das Beergame ist ein Simulationsspiel, bei dem es darum geht, eine Bierlieferkette zu managen...</h4>
        <div className={"wrapper_button"}>
          <Link to={"/game/create"}>
            <Button linkTo={"/game/create"}>Spiel starten</Button>
          </Link>
        </div>
        
        <div class="container mt-5">
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title">Regeln</h2>
          <ul class="list-group list-group-flush">
            <li class="list-group-item list-group-item-secondary">Jeder Spieler muss seine eigene Bierlieferkette managen.</li>
            <li class="list-group-item list-group-item-secondary">Es gibt vier Rollen im Spiel: Lieferant, Händler, Großhändler und Einzelhändler.</li>
            <li class="list-group-item list-group-item-secondary">Jeder Spieler muss die Bestellungen für seine Rolle aufgeben.</li>
            <li class="list-group-item list-group-item-secondary">Jede Rolle hat unterschiedliche Lieferzeiten und Kosten.</li>
            <li class="list-group-item list-group-item-secondary">Der Bedarf des Einzelhändlers wird in jeder Runde zufällig generiert.</li>
            <li class="list-group-item list-group-item-secondary">Das Spiel kann nur im Multiplayer-Modus gespielt werden.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  
  <div class="row mt-5">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title">Was ist der Bullwhipeffekt?</h2>
          <h4 class="card-text">Der Bullwhip-Effekt ist ein Phänomen in der Lieferkette, bei dem kleine Veränderungen in der Nachfrage am Anfang der Kette zu immer größeren Schwankungen in der Nachfrage an jedem weiteren Glied der Kette führen. Es tritt auf, wenn ein Unternehmen versucht, seine eigene Nachfrage durch Überbestellungen von Waren zu befriedigen, um Engpässe zu vermeiden.</h4>
          <h4 class="card-text">Diese Überbestellungen können dazu führen, dass die nachgelagerten Unternehmen (z. B. Einzelhändler) zu viele Waren erhalten, die wiederum zu Überbestellungen bei ihren Lieferanten führen. Dies kann zu einem Anstieg der Lagerbestände und der Betriebskosten führen und schließlich zu ineffizienten Lieferketten und Verlusten für alle beteiligten Unternehmen führen. Der Bullwhip-Effekt kann durch eine bessere Kommunikation und Zusammenarbeit zwischen den Mitgliedern einer Lieferkette reduziert werden.</h4>
        </div>
      </div>
    </div>
  </div>
</div>

{/* <div class="container-fluid bg-dark mt-5">
<div class="col-12 text-center mt-2 text-white">
      @ 2023 Beer-Game. Created by dWi2021
    </div>
  <div class="row py-3">
  <div class="col-3" className={"logo instagram"}></div>
    <div class="col-6 text-center">
      <a href="https://www.instagram.com/atlas_projekt/" target="_blank" class="text-white">Besuche uns auf Instagram</a>
    </div>
    <div class="col-3" className={"logo atlas"}></div>
    <div class="col-6 text-center">
      <a href="https://atlasproject.de/index.php/beergame/" target="_blank" class="text-white">Besuche unsere Webseite</a>
    </div>
  </div>
</div> */}

{/* <div class="container-fluid bg-dark mt-5">
  <div class="col-12 text-center mt-2 text-white">
      @ 2023 Beer-Game. Created by dWi2021
  </div>
  <div class="row py-3">
    <div class="col-3 text-right">
      <div class="logo instagram d-inline-block align-middle"></div>
      <a href="https://www.instagram.com/atlas_projekt/" target="_blank" class="text-white d-inline-block align-middle ml-2">Besuche uns auf Instagram</a>
    </div>
    <div class="col-3 text-right">
      <div class="logo atlas d-inline-block align-middle"></div>
      <a href="https://atlasproject.de/index.php/beergame/" target="_blank" class="text-white d-inline-block align-middle ml-2">Besuche unsere Webseite</a>
    </div>
  </div>
</div> */}
 

{/* <div class="container-fluid bg-dark mt-5">
  <div class="col-12 text-center mt-2 text-white">
    @ 2023 Beer-Game. Created by dWi2021
  </div>
  <div class="row py-3 align-items-center">
    <div class="col-3">
      <div class="logo instagram"></div>
    </div>
    <div class="col-3 text-white">
      Besuche uns auf Instagram
    </div>
    <div class="col-3">
      <div class="logo atlas"></div>
    </div>
    <div class="col-3 text-white">
      Besuche unsere Webseite
    </div>
  </div>
</div>  */}


{/* <div class="container-fluid bg-dark mt-5">
  <div class="col-12 text-center mt-2 text-white">
    @ 2023 Beer-Game. Created by dWi2021
  </div>
  <div class="row py-3">
    <div class="col-3 logo instagram"></div>
    <div class="col-6 text-center">
      <a href="https://www.instagram.com/atlas_projekt/" target="_blank" class="text-white">
        Besuche uns auf Instagram
      </a>
    </div>
    <div class="col-3 logo atlas"></div>
    <div class="col-6 text-center">
      <a href="https://atlasproject.de/index.php/beergame/" target="_blank" class="text-white">
        Besuche unsere Webseite
      </a>
    </div>
  </div>
</div>  */}

{/* <div class="container-fluid bg-dark mt-5">
  <div class="col-12 text-center mt-2 text-white">
    @ 2023 Beer-Game. Created by dWi2021
  </div>
  <div class="row py-3">
    <div class="col-9" className={"logo instagram"}>
      <a href="https://www.instagram.com/atlas_projekt/" target="_blank" class="text-white">Besuche uns auf Instagram</a>
    </div>
    <div class="col-9" className={"logo atlas"}>
      <a href="https://atlasproject.de/index.php/beergame/" target="_blank" class="text-white">Besuche unsere Webseite</a>
    </div>
  </div>
</div> */}


<div class="container-fluid bg-dark mt-5">
<div class="col-12 text-center mt-2 text-white">
      @ 2023 Beer-Game. Created by dWi2021
    </div>
  <div class="row py-3">
    <div class="col-6 text-center">
      <a href="https://www.instagram.com/atlas_projekt/" target="_blank" class="text-white">Besuche uns auf Instagram</a>
    </div>
    <div class="col-6 text-center">
      <a href="https://atlasproject.de/index.php/beergame/" target="_blank" class="text-white">Besuche unsere Webseite</a>
    </div>
  </div>
</div>


      </div>
    )
  }
}

export default Home