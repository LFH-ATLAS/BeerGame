import "../styles/pages/End.css"
import React, {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';


function End(props) {

    const socket = props.socketId
    
    const [gameKPIsproducer, setGameKPIsproducer] = useState([])
    const [gameKPIsdistributor, setGameKPIsdistributor] = useState([])
    const [gameKPIswholesaler, setGameKPIswholesaler] = useState([])
    const [gameKPIsretailer, setGameKPIsretailer] = useState([])
    const [orderperround, setGraphorder] = useState([]);
    const [stockperround, setGraphstock] = useState([]);
    const [differenzperround, setGraphdiff] = useState([]);
    const location = useLocation();
    const urlParts = location.pathname.split('/');
    const gameCode = urlParts[urlParts.length - 1];
    const sumStorageCostsProducer = gameKPIsproducer.reduce((total, item) => total + item.storageCostsWeekly, 0);
    const sumStorageCostsDistributor = gameKPIsdistributor.reduce((total, item) => total + item.storageCostsWeekly, 0);
    const sumStorageCostsWholesaler = gameKPIswholesaler.reduce((total, item) => total + item.storageCostsWeekly, 0);
    const sumStorageCostsRetailer = gameKPIsretailer.reduce((total, item) => total + item.storageCostsWeekly, 0);
    let messageProducer;
    let messageDistributor;
    let messageWholesaler;
    let messageRetailer;



    useEffect(() => {
        console.log(gameCode);
   
        socket.emit("endscreendata", {
            gameCode
        })

        socket.on("update_end_Screen",   SetData)
        
        return () => {
            socket.off('update_end_Screen', SetData);
          };
    },[] 
   
)

function checkCriteria(value, criterea) {
    switch (criterea){
        case "backorderWeeks":
            if (value <= 20){
                return "Achte darauf deine Bestellungen so zu planen das du weniger in einen Rückstand gerätst, plane auch frühzeitig die eventuelle Erhöhung ein. ";
            }else{
                return "";
            }
        case "averageInventory":
            if (value <= 10){
                return "Achte darauf dein Lager nicht zu überfüllen da dies viele unnötige Kosten verursacht, wenn du merkst das dien Lager zu voll wird verringere deine Bestellmenge. ";
            }else {
                return "";
            }
        case "perfectOrderRate":
            if (value <= 5){
                return "Versuche nach Aufbauen eines Puffers möglichst deine Bestellungen genau dem Bedarf anzupassen. ";
            }else{
                return "";
            }
        default:
            return "";
    }
}

function SetData(data){
    console.log("UpdatePlayer aufgerufen")
    console.log(data)
    setGameKPIsproducer(data.roundData.producer[data.roundData.currentRound-1].kpis)        
    setGameKPIsdistributor(data.roundData.distributor[data.roundData.currentRound-1].kpis)
    setGameKPIswholesaler(data.roundData.wholesaler[data.roundData.currentRound-1].kpis)
    setGameKPIsretailer(data.roundData.retailer[data.roundData.currentRound-1].kpis)

    const newGraph = Array.from({ length: data.roundData.producer.length -1}, (_, index) => ({
        label: (index ).toString(),
        Produzent: data.roundData.producer[index].order,
        Verteiler: data.roundData.distributor[index].order,
        Großhändler: data.roundData.retailer[index].order,
        Einzelhändler: data.roundData.wholesaler[index].order
      }));
  
    setGraphorder(newGraph); // Den Zustand für graph aktualisieren

    const newGraph2 = Array.from({ length: data.roundData.producer.length -1}, (_, index) => ({
        label: (index ).toString(),
        Produzent: data.roundData.producer[index].stock,
        Verteiler: data.roundData.distributor[index].stock,
        Großhändler: data.roundData.retailer[index].stock,
        Einzelhändler: data.roundData.wholesaler[index].stock
      }));
  
    setGraphstock(newGraph2); // Den Zustand für graph aktualisieren

    const newGraph3 = Array.from({ length: data.roundData.producer.length -1}, (_, index) => ({
        label: (index ).toString(),
        Produzent: data.roundData.producer[index].stock -data.roundData.producer[index].delay,
        Verteiler: data.roundData.distributor[index].stock - data.roundData.distributor[index].delay,
        Großhändler: data.roundData.retailer[index].stock - data.roundData.retailer[index].delay,
        Einzelhändler: data.roundData.wholesaler[index].stock - data.roundData.wholesaler[index].delay
      }));
  
    setGraphdiff(newGraph3); // Den Zustand für graph aktualisieren

    messageProducer += checkCriteria(data.roundData.producer[data.roundData.producer.length -1].backorderWeeksPct,backorderWeeks)
    messageProducer += checkCriteria(data.roundData.producer[data.roundData.producer.length -1].averageStock / ((data.gameSettings.startValue + data.gameSettings.raisedValue)/2) ,averageInventory)
    messageProducer += checkCriteria(data.roundData.producer[data.roundData.producer.length -1].perfectOrderRatePct,perfectOrderRate)

    messageDistributor += checkCriteria(data.roundData.distributor[data.roundData.distributor.length -1].backorderWeeksPct,backorderWeeks)
    messageDistributor += checkCriteria(data.roundData.distributor[data.roundData.distributor.length -1].averageStock / ((data.gameSettings.startValue + data.gameSettings.raisedValue)/2) ,averageInventory)
    messageDistributor += checkCriteria(data.roundData.distributor[data.roundData.distributor.length -1].perfectOrderRatePct,perfectOrderRate)

    messageRetailer += checkCriteria(data.roundData.retailer[data.roundData.retailer.length -1].backorderWeeksPct,backorderWeeks)
    messageRetailer += checkCriteria(data.roundData.retailer[data.roundData.retailer.length -1].averageStock / ((data.gameSettings.startValue + data.gameSettings.raisedValue)/2) ,averageInventory)
    messageRetailer += checkCriteria(data.roundData.retailer[data.roundData.retailer.length -1].perfectOrderRatePct,perfectOrderRate)

    messageWholesaler += checkCriteria(data.roundData.wholesaler[data.roundData.wholesaler.length -1].backorderWeeksPct,backorderWeeks)
    messageWholesaler += checkCriteria(data.roundData.wholesaler[data.roundData.wholesaler.length -1].averageStock / ((data.gameSettings.startValue + data.gameSettings.raisedValue)/2) ,averageInventory)
    messageWholesaler += checkCriteria(data.roundData.wholesaler[data.roundData.wholesaler.length -1].perfectOrderRatePct,perfectOrderRate)
}

    return (
 
  <div>
        <div className="row">
      <div className="col-md-12">
      </div>

      <div className="section col-md-4 border">
        <h3 className="section-title">Bestellmenge pro Runde:</h3>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={orderperround} margin={{ top: 10, right: 0, bottom: 15, left: 0 }}>
              <XAxis dataKey="label" />
              <YAxis />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Legend/>
              <Line type="monotone" dataKey="Produzent" stroke="#FACA2B" strokeWidth={3}/>
              <Line type="monotone" dataKey="Verteiler" stroke="#FAA72B" strokeWidth={3}/>
              <Line type="monotone" dataKey="Großhändler" stroke="#FA8C2B" strokeWidth={3}/>
              <Line type="monotone" dataKey="Einzelhändler" stroke="#FA4E2B" strokeWidth={3}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="section col-md-4 border">
        <h3 className="section-title">Lagerbestand:</h3>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stockperround} margin={{ top: 10, right: 0, bottom: 15, left: 0 }}>
              <XAxis dataKey="label" />
              <YAxis />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Legend/>
              <Line type="monotone" dataKey="Produzent" stroke="#FACA2B" strokeWidth={3}/>
              <Line type="monotone" dataKey="Verteiler" stroke="#FAA72B" strokeWidth={3}/>
              <Line type="monotone" dataKey="Großhändler" stroke="#FA8C2B" strokeWidth={3}/>
              <Line type="monotone" dataKey="Einzelhändler" stroke="#FA4E2B" strokeWidth={3}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="section col-md-4 border">
        <h4 className="section-title">Differenz zwischen Lager und Nachfrage:</h4>
        <div className="section-content">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={differenzperround} margin={{ top: 10, right: 0, bottom: 15, left: 0 }}>
              <XAxis dataKey="label" />
              <YAxis />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Legend/>
              <Line type="monotone" dataKey="Produzent" stroke="#FACA2B" strokeWidth={3}/>
              <Line type="monotone" dataKey="Verteiler" stroke="#FAA72B" strokeWidth={3}/>
              <Line type="monotone" dataKey="Großhändler" stroke="#FA8C2B" strokeWidth={3}/>
              <Line type="monotone" dataKey="Einzelhändler" stroke="#FA4E2B" strokeWidth={3}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    <div>

    <div className="row">
      <div className="col-md-12">
      </div>

      <div className="section col-md-4 border">
        <p className="section-content text-center ">
        <br />
            Der Bullwhip effekt kann vermieden werden, wenn nicht mehr bestellt wird als angefordert.
        </p>
      </div>

      <div className="section col-md-4 border">
        <div className="section-content">
        <p className="section-content text-center" >
        <strong data-toggle="tooltip"  data-placement="top" title="Niedriger ist besser" >Gesamtkosten:</strong> <br />
            Produzent: {sumStorageCostsProducer}<br />
            Verteiler: {sumStorageCostsDistributor}<br />
            Großhändler: {sumStorageCostsWholesaler} <br />
            Einzelhändler: {sumStorageCostsRetailer}  
        </p>
        </div>
      </div>

      <div className="section col-md-4 border">
      <p className="section-content text-center ">
        <br />
            
        </p>
      </div>
    </div>
    </div>
<h3 class="mt-5 text-center">Produzent:</h3>
<div className={"grid_play2"}>
      <div className={"playground2"}>
      <div className={"KPItable"}>
    <table>
        <thead>
            <tr>
               <th>Runde</th>
               <th data-toggle="tooltip"  data-placement="top" title="Diese Angabe repräsentiert die Gesamtkosten pro Woche.">Kosten pro Woche</th>
                 <th data-toggle="tooltip"  data-placement="top" title=" Hier werden die kumulierten Lagerkosten während des Spiels 
                aufgeführt. Diese Kosten beziehen sich auf die Lagerhaltung und die damit 
                verbundenen finanziellen Auswirkungen.">Lagergesamtkosten</th>
                 <th data-toggle="tooltip"  data-placement="top" title=" Diese Metrik gibt an, wie erfolgreich die Spieler bei der 
                Erfüllung der Kundenaufträge in jeder Runde waren. Sie misst die Genauigkeit der 
                Lieferungen im Verhältnis zu den Bestellungen.">Perfekte Auftragsrate</th>
                <th data-toggle="tooltip"  data-placement="top" title="Diese Information gibt den Durchschnittswert des 
                Lagerbestands über alle Runden an. Er spiegelt wider, wie effizient die Spieler ihre 
                Lagerbestände im Spiel verwalten.">Durchschnittlicher Lagerbestand</th>
                <th data-toggle="tooltip"  data-placement="top" title="Hier wird angegeben, inwieweit es während des 
                Spiels zu Lieferverzögerungen oder Engpässen in der Lieferkette gekommen ist. 
                Dies ist ein wichtiger Indikator für die Leistungsfähigkeit und Anpassungsfähigkeit 
                der Spieler."> Wochen mit Lieferrückstand</th>
            </tr>
        </thead>
        <tbody>
            {gameKPIsproducer.map(item => {
                return (
                    <tr key={item.roundPlayed}>
                    <td>{item.roundPlayed}</td>
                    <td>{item.storageCostsWeekly}</td>
                    <td>{item.storageCosts}</td>
                    <td>{item.perfectOrderRatePct}%</td>
                    <td>{item.averageStock}</td>
                    <td>{item.backorderWeeksPct}%</td>
                </tr>
                );
                })}
        </tbody>
    </table>
    </div>

    </div>

    </div>


    <h3 class="mt-5 text-center">Verteiler:</h3>
    <div className={"grid_play2"}>
                    <div className={"playground2"}>
                        <div className={"KPItable"}>
    <table>
        <thead>
            <tr>
               <th>Runde</th>
               <th>Kosten pro Woche</th>
                 <th>Lagergesamtkosten</th>
                 <th>Perfekte Auftragsrate</th>
                <th>Durchschnittlicher Lagerbestand</th>
                <th>Wochen mit Lieferrückstand</th>
            </tr>
        </thead>
        <tbody>
            {gameKPIsdistributor.map(item => {
                return (
                    <tr key={item.roundPlayed}>
                    <td>{item.roundPlayed}</td>
                    <td>{item.storageCostsWeekly}</td>
                    <td>{item.storageCosts}</td>
                    <td>{item.perfectOrderRatePct}%</td>
                    <td>{item.averageStock}</td>
                    <td>{item.backorderWeeksPct}%</td>
                </tr>
                );
                })}
        </tbody>
    </table>
    </div>

    </div>

    </div>


    <h3 class="mt-5 text-center">Großhändler:</h3>
    <div className={"grid_play2"}>
                    <div className={"playground2"}>
                        <div className={"KPItable"}>
    <table>
        <thead>
            <tr>
               <th>Runde</th>
               <th>Kosten pro Woche</th>
                 <th>Lagergesamtkosten</th>
                 <th>Perfekte Auftragsrate</th>
                <th>Durchschnittlicher Lagerbestand</th>
                <th>Wochen mit Lieferrückstand</th>
            </tr>
        </thead>
        <tbody>
            {gameKPIswholesaler.map(item => {
                return (
                    <tr key={item.roundPlayed}>
                    <td>{item.roundPlayed}</td>
                    <td>{item.storageCostsWeekly}</td>
                    <td>{item.storageCosts}</td>
                    <td>{item.perfectOrderRatePct}%</td>
                    <td>{item.averageStock}</td>
                    <td>{item.backorderWeeksPct}%</td>
                </tr>
                );
                })}
        </tbody>
    </table>
    </div>
    </div>
    </div>


    <h3 class="mt-5 text-center">Einzelhändler:</h3>
    <div className={"grid_play2"}>
                    <div className={"playground2"}>
                        <div className={"KPItable"}>
    <table>
        <thead>
            <tr>
               <th>Runde</th>
               <th>Kosten pro Woche</th>
                 <th>Lagergesamtkosten</th>
                 <th>Perfekte Auftragsrate</th>
                <th>Durchschnittlicher Lagerbestand</th>
                <th>Wochen mit Lieferrückstand</th>
            </tr>
        </thead>
        <tbody>
            {gameKPIsretailer.map(item => {
                return (
                    <tr key={item.roundPlayed}>
                    <td>{item.roundPlayed}</td>
                    <td>{item.storageCostsWeekly}</td>
                    <td>{item.storageCosts}</td>
                    <td>{item.perfectOrderRatePct}%</td>
                    <td>{item.averageStock}</td>
                    <td>{item.backorderWeeksPct}%</td>
                </tr>
                );
                })}
        </tbody>
    </table>
    </div>
    </div>
    </div>
 </div>


    )
}


export default End
