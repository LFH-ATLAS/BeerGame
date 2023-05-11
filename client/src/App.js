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

  // Wenn die Umgebungsvariable BACKEND_URL gesetzt ist, wird diese verwendet, ansonsten wird die Standard-URL verwendet
  if(window._env_.BACKEND_URL != null){
    socket = io.connect(window._env_.BACKEND_URL)
    console.log("Custom: Backend-URL: " + window._env_.BACKEND_URL)
  }else{
    // Eigentlich redundant, da die Standard-URL auch im default.env festgelegt ist
    socket = io.connect("http://localhost:3001")
    console.log("Default: Backend-URL: http://localhost:3001")
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
