import "./App.scss";
import MainGame from "./comp/MainGame";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "./comp/LandingPage";


function App() {
  return (
    <>
    <BrowserRouter>
    <Switch>
      <Route exact path="/game">
      <div className="GameApp" >
        <MainGame />
      </div>

      </Route>
      <Route exact path="/home">
          <LandingPage />
      </Route>

      <Route path="*">
        <Redirect to={"/home"} />
      </Route>
    </Switch>
    </BrowserRouter>



    </>
  );
}

export default App;
