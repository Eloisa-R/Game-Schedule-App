import React, { Component } from 'react';

import {
  Route,
  NavLink,
  HashRouter,
  Redirect
} from "react-router-dom";
import MatchesMonth from "./MatchesMonth";

class Calendar extends Component {
    
    constructor(){
      super();
      this.state = {
        current_month: "",
        clicked: false
      }
      this.getCurrentMonth = this.getCurrentMonth.bind(this)
      this.hideDiv = this.hideDiv.bind(this)
    }

    getCurrentMonth(){
      let date = new Date();
      let month_name = date.toLocaleDateString("en-us", {month: "long"})
      this.setState({current_month: date.getMonth()})
    }  
    
    hideDiv() {
      this.setState({clicked: true}) 
    }

    displayMenu() {
        let month_array = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
        var month_list = month_array.map((item, index) =>
                                        <NavLink key={index} to={`${this.props.match.url}/matchesmonth/${index}`} onClick={this.hideDiv} className="month_item"><li>{item}</li></NavLink>)
        return <ul className="month_menu">{month_list}</ul>
    }

    componentDidMount() {
      this.getCurrentMonth()
    }

  render() {
    return (
     <HashRouter>
      <div className="calendar-body">
       {this.displayMenu()}
       <div className="eventsBody">
       {this.state.clicked ?
         <Route path={`${this.props.match.path}/matchesmonth/:id`} component={MatchesMonth}/>
         :
         <div><Redirect to={`${this.props.match.path}/matchesmonth/${this.state.current_month}`}/>
         <Route path={`${this.props.match.path}/matchesmonth/:id`} component={MatchesMonth}/></div>
       }
         </div>   
      </div>
     </HashRouter>
    );
  }
}

export default Calendar;