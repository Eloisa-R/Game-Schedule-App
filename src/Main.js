import React, { Component } from 'react';
import './App.css';
import {
  Route,
  NavLink,
  HashRouter,
  Redirect,
  Switch
} from "react-router-dom";
import CoachMark from "@pearson-components/coach-mark";
import Calendar from "./Calendar";
import Teams from "./Teams";
import MatchDetails from "./MatchDetails";
import TeamInfo from "./TeamInfo";
import Chat from "./Chat";
import addMessage from './addMessage';
import newChat from './NewChat';
import Locations from './Locations';

class Main extends Component {
    constructor(){
      super();
      this.showFirst = this.showFirst.bind(this)
      this.onCloseCoachMark = this.onCloseCoachMark.bind(this)
    }
    
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

    onCloseCoachMark(){
      var closeButton = document.getElementsByClassName("o-coach-mark__got-it pe-label")[0]
      closeButton.addEventListener("click",function(){
        sessionStorage.setItem('coachClosed', 'true')
        console.log("lala")
      })
    }

    showFirst = () => {
      new CoachMark({
        elementId: 'homeButton',
        opts: {
          title: 'Navigation tip!',
          text: 'Click on the icon to display the menu',
          gotIt: true,
          id: 'my-coach-mark'
        },
      });
    };

    componentDidMount(){
    if (sessionStorage.getItem('coachClosed') == null){
      this.showFirst()
      
    }
   }
  
   
    
  render() {
    return (
     <HashRouter>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">NYSL</h1>
        </header>
        <div className="home"><img id="homeButton" onClick={this.showMenu} src={require("./images/nysl_logo.png")} className="home-icon" /></div>
        <ul className='pie'>
          <li className='slice'><div className='slice-contents' onClick={this.hideMenu}><NavLink to="/schedule"><img className="schedule-icon" src={require("./images/schedule.png")} alt=""/></NavLink></div></li>
           <li className='slice'><div className='slice-contents' onClick={this.hideMenu}><NavLink to="/teams"><img className="teams-icon" src={require("./images/teams.svg")} alt=""/></NavLink></div></li>
           <li className='slice'><div className='slice-contents' onClick={this.hideMenu}><NavLink to="/chat"><img className="chat-icon" src={require("./images/chat.png")} alt=""/></NavLink></div></li>
        </ul>
        <div id="cn-overlay" className="cn-overlay"></div>
        <div className="content">
         <Switch>                                      
           <Route path="/schedule" component={Calendar}/>
           <Route path="/teams" component={Teams}/>
           <Route exact path="/chat" component={Chat}/>
           <Route path="/matchdetails/:id" component={MatchDetails}/>
           <Route path="/teaminfo/:id" component={TeamInfo}/>
           <Route path="/chat/:id/:type" component={addMessage}/>
           <Route path="/chat/newchat" component={newChat}/>
           <Route path="matchdetails/(\w+)/locations/:id" component={Locations}/>
           <Route path="schedule/matchesmonth/(\w+)/locations/:id" component={Locations}/>
           <Redirect from="/" to="/schedule"/>  
        </Switch>
        </div>
      </div>
     </HashRouter>
    );
  }
}

export default  Main;
