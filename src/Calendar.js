import React, { Component } from 'react';

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import MatchesMonth from "./MatchesMonth";

class Calendar extends Component {
    
      hideDiv() {
            var alertDiv = document.getElementById("click-on-month");
            alertDiv.style.display = "none";
      }

    displayMenu() {
        let month_array = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
        var month_list = month_array.map((item, index) =>
                                        <NavLink key={index} to={`${this.props.match.url}/matchesmonth/${index}-${item}`} onClick={this.hideDiv} className="month_item"><li>{item}</li></NavLink>)
        return <ul className="month_menu">{month_list}</ul>
    }

  render() {
    return (
     <HashRouter>
      <div className="calendar-body">
       {this.displayMenu()}
       <div className="eventsBody">
         <div id="click-on-month">Click on a month to load the schedule</div>
         <Route path={`${this.props.match.path}/matchesmonth/:id`} component={MatchesMonth}/>
        </div>   
      </div>
     </HashRouter>
    );
  }
}

export default Calendar;