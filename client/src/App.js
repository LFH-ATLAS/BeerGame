import { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { io } from "socket.io-client"

import './App.css';
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NewGame from "./pages/NewGame";
import NotFound from "./pages/NotFound";
import PlayGame from "./pages/PlayGame";
import Message from "./components/Message";
import End from "./pages/End";

function App() {
  //const socket = io.connect("http://beergame.usb.systems:3001")
  //const socket = io.connect("https://api-beergame.usb-sys.de")
  var socket  // Lokale Verbindung zum Backend muss vom Client aufgelöst werden können
  console.log("Frontend ist gestartet")
  try{
    // Versuche, die Backend-URL aus der Umgebungsvariable zu lesen.
    // Wenn diese nicht gesetzt ist, wird der Default-Wert verwendet.

    // Unter Windows kann die Umgebungsvariable mit dem Befehl "set BACKEND_URL=http://localhost:3001" gesetzt werden.
    // Unter Linux kann die Umgebungsvariable mit dem Befehl "export BACKEND_URL=http://localhost:3001" gesetzt werden.
    if(window._env_.BACKEND_URL !== undefined){
      socket = io.connect(window._env_.BACKEND_URL)
      console.log("Custom: Backend-URL: " + window._env_.BACKEND_URL)
    }
  } catch (e) /* ToDo Eigene Exception erstellen, die eine nicht definierte BACKEND_URL abfängt*/{
    // Wenn die Umgebungsvariable nicht gesetzt ist, wird der Default-Wert verwendet.

    // Fehlermeldung unter Windows:
    // TypeError: Cannot read property 'BACKEND_URL' of undefined (reading 'BACKEND_URL')

    console.log("Fehler beim Abrufen von BACKEND_URL: " + e)
    console.log("Dieser Fehler kann ignoriert werden, wenn die App lokal ausgeführt wird über npm start.")
    console.log("Setze Default Wert: Backend-URL=http://localhost:3001")
    socket = io.connect("http://localhost:3001")
  }

  useEffect(() => {
      socket.on("connect", () => {
          console.log("Verbindung zum SocketIO-Server hergestellt. Client-SocketID: " + socket.id);
      })
  }, [socket])

  return (
    <div className="App">
      <Layout>
        <Message />
        <Switch>
          <Route path={"/game/create"}>
            <NewGame socketId={socket} />
          </Route>
          <Route path={"/game/play/:gameId"}>
            <PlayGame socketId={socket} />
          </Route>
          <Route path={"/end/:gameId"}>
            <End socketId={socket}/>
          </Route>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route path={"/404"}>
            <NotFound />
          </Route>
          <Route path={"*"}>
            <Redirect to={"/404"} />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
