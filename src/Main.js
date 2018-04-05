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
import MatchDetails from "./MatchDetails";
import TeamInfo from "./TeamInfo";

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
          <NavLink exact to="/"><li className="button">Schedule</li></NavLink>
          <NavLink to="/teams"><li className="button">Teams</li></NavLink>
          <NavLink to="/locations"><li className="button">Locations</li></NavLink>
        </ul>
        <div className="content">
           <Route exact path="/" component={Calendar}/>
           <Route path="/teams" component={Teams}/>
           <Route path="/locations" component={Locations}/>
           <Route path="/matchdetails/:number" component={MatchDetails}/>
           <Route path="/teaminfo/:number" component={TeamInfo}/>
        </div>
      </div>
     </HashRouter>
    );
  }
}

export default  Main;
