import React, { Component } from "react";
import Search from "./components/Search.js";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Search />
        </header>
      </div>
    );
  }
}

export default App;
