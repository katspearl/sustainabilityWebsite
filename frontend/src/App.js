import React, { Component } from "react";
import "./App.css";
import Login from "./components/login/login";
import Home from "./components/home/home";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={loginPage} />
            <Route exact path="/dashboard" component={dashboardPage} />
            {/* <Route component={errorPage}/> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const loginPage = match => <Login />;

const dashboardPage = match => <Home />;

export default App;
