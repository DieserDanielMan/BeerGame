import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {io} from "socket.io-client"

import './App.css';
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NewGame from "./pages/NewGame";
import NotFound from "./pages/NotFound";
import {useEffect} from "react";
import PlayGame from "./pages/PlayGame";
import Message from "./components/Message";
import End from "./pages/End";

function App() {
    console.log("App mount")
    const socket = io("http://localhost:3001")
    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id); // x8WIv7-mJelg7on_ALbx
        })
    }, [socket])

    return (
    <div className="App">
    <Router>
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
    </Router>
    </div>
    );
}

export default App;
