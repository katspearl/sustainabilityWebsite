import React, { Component } from "react";
import "./App.css";
import Login from "./components/login/login";
import Home from "./components/home/home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}

export default App;
