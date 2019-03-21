import React, { Component } from "react";
import "./App.css";
import Login from "./components/login/login";
import Home from "./components/home/home";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={loginPage} />
          <Route exact path="/dashboard" component={dashboardPage}/>
          {/* <Route component={errorPage}/> */}
        </Switch>
      </div>
    );
  }
}

const loginPage = (match) => (
  <Login />
);

const dashboardPage = (match) => (
  <Home />
);

{/* <Login symbol={match.location.pathname}/> */}

export default App;
