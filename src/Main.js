import React, { Component } from 'react';
import './App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Calendar from "./Calendar";
import Teams from "./Teams";
import Locations from "./Locations";

class Main extends Component {
  render() {
    return (
     <HashRouter>
      <div className="App">
        <header className="App-header">
          <img src={require("./images/nysl_logo.png")} className="App-logo" alt="logo" />
          <h1 className="App-title">NYSL</h1>
        </header>
        <ul className="App-intro">
          <li><NavLink exact to="/">Schedule</NavLink></li>
          <li><NavLink to="/teams">Teams</NavLink></li>
          <li><NavLink to="/locations">Locations</NavLink></li>
        </ul>
        <div className="content">
           <Route exact path="/" component={Calendar}/>
           <Route path="/teams" component={Teams}/>
           <Route path="/locations" component={Locations}/> 
        </div>
      </div>
     </HashRouter>
    );
  }
}

export default  Main;
