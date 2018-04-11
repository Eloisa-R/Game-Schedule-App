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
import Chat from "./Chat";
import Welcome from "./Welcome";
import addMessage from './addMessage';
import newChat from './NewChat';

class Main extends Component {
    
    showMenu() {
        if (document.getElementsByClassName("pie")[0].style.display === "" || document.getElementsByClassName("pie")[0].style.display === "none") {
        document.getElementsByClassName("pie")[0].style.display = "block";
        document.getElementById("cn-overlay").classList.add("on-overlay")
    } else if (document.getElementsByClassName("pie")[0].style.display === "block") {
        document.getElementsByClassName("pie")[0].style.display = "none";
        document.getElementById("cn-overlay").classList.remove("on-overlay");
    }
    }
    
    hideMenu() {
        document.getElementsByClassName("pie")[0].style.display = "none";
        document.getElementById("cn-overlay").classList.remove("on-overlay");
    }
    
  render() {
    return (
     <HashRouter>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Northside Youth Soccer League</h1>
        </header>
        <div className="home"><img onClick={this.showMenu} src={require("./images/nysl_logo.png")} className="home-icon" /></div>
        <ul className='pie'>
          <li className='slice'><div className='slice-contents' onClick={this.hideMenu}><NavLink to="/schedule"><img className="schedule-icon" src={require("./images/schedule.png")} alt=""/></NavLink></div></li>
           <li className='slice'><div className='slice-contents' onClick={this.hideMenu}><NavLink to="/teams"><img className="teams-icon" src={require("./images/teams.svg")} alt=""/></NavLink></div></li>
           <li className='slice'><div className='slice-contents' onClick={this.hideMenu}><NavLink to="/chat"><img className="chat-icon" src={require("./images/chat.png")} alt=""/></NavLink></div></li>
        </ul>
        <div id="cn-overlay" className="cn-overlay"></div>
        <div className="content">
           <Route exact path="/" component={Welcome}/>                                        
           <Route path="/schedule" component={Calendar}/>
           <Route path="/teams" component={Teams}/>
           <Route exact path="/chat" component={Chat}/>
           <Route path="/locations/:id" component={Locations}/>
           <Route path="/matchdetails/:number" component={MatchDetails}/>
           <Route path="/teaminfo/:number" component={TeamInfo}/>
           <Route path="/chat/:id/:type" component={addMessage}/>
           <Route path="/chat/newchat" component={newChat}/>
        </div>
      </div>
     </HashRouter>
    );
  }
}

export default  Main;
