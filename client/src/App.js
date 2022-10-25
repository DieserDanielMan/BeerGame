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
  //Verbindung zum Server herstellen
  const socket = io.connect("http://localhost:3001")
  //const socket = io.connect("https://api-beergame.usb-sys.de")
  useEffect(() => {
      //Callback um zu prüfen, ob die Verbindung erfolgreich hergestellt wurde
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
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route path={"/404"}>
            <NotFound />
          </Route>
          <Route path={"/end"}>
            <End/>
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
