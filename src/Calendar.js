import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Pagination from 'react-bootstrap/lib/Pagination';

import {
  Route,
  NavLink,
  HashRouter,
  Redirect,
  Switch
} from "react-router-dom";
import MatchesMonth from "./MatchesMonth";

class Calendar extends Component {
    
    constructor(){
      super();
      this.state = {
        current_month: "",
        clicked: false,
        clicked_month: "",
        first_group_menu: "",
        second_group_menu: "",
        third_group_menu: ""
      }
      this.getCurrentMonth = this.getCurrentMonth.bind(this)
      this.hideDiv = this.hideDiv.bind(this)
      this.displayMenu = this.displayMenu.bind(this)
    }

    getCurrentMonth(){
      let date = new Date();
      let month_name = date.toLocaleDateString("en-us", {month: "long"})
      let month_array = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
      var month_list = month_array.map((item, index) =>
          <span key={index} onClick={() => this.hideDiv(index)} className="month_item" id={index}><Pagination.Item>{item}</Pagination.Item></span>)
      let first_group = month_list.slice(0,5)
      let second_group = month_list.slice(5,10)
      let third_group = month_list.slice(10,12)
      this.setState({first_group_menu: first_group, second_group_menu: second_group, third_group_menu: third_group, current_month: date.getMonth()})
    }  
    
    hideDiv(index) {
      this.setState({clicked: true, clicked_month: index})
    }

    changeDisplayMenu(e){
      let buttonPressed = e.target.parentElement.getAttribute("id")
      let months_displayed = document.getElementsByClassName("month_item")[0].getAttribute("id")
      let month_menu_list = document.getElementById("menuMonths")
      let new_months = ""
      switch(buttonPressed) {
        case "prevButton":
          switch(months_displayed) {
            case "0":
              new_months = this.state.third_group_menu;
              break;
            case "5":
              new_months = this.state.first_group_menu;
              break;
            case "10":
              new_months = this.state.second_group_menu;
              break;
          }
          break;
        case "nextButton":
          switch(months_displayed) {
            case "0":
              new_months = this.state.second_group_menu;
              break;
            case "5":
              new_months = this.state.third_group_menu;
              break;
            case "10":
              new_months = this.state.first_group_menu;
              break;
          }
          break;
      }
      ReactDOM.unmountComponentAtNode(month_menu_list)
      ReactDOM.render(new_months,month_menu_list)
    }

    displayMenu() {
        let months_to_display = ""
        let current_month = new Date().getMonth()
        switch (true) {
          case (current_month > 0 && current_month <= 4):
            months_to_display = this.state.first_group_menu;
            break;
          case (current_month >=5 && current_month <= 9):
            months_to_display = this.state.second_group_menu;
            break;
          case  (current_month >=10):
            months_to_display = this.state.third_group_menu;
            break;
        }
        
        
            return <ul className="month_menu"><Pagination><Pagination.Prev id="prevButton" onClick={(e) => this.changeDisplayMenu(e)}/><div id="menuMonths">{months_to_display}</div><Pagination.Next id="nextButton" onClick={(e) => this.changeDisplayMenu(e)}/></Pagination></ul>
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
        <div>
         <Route path={`${this.props.match.path}/matchesmonth/:id`} component={MatchesMonth}/>
         <Redirect to={`${this.props.match.path}/matchesmonth/${this.state.clicked_month}`}/>
        </div>
         :
         <Switch>
         <Route path={`${this.props.match.path}/matchesmonth/:id`} component={MatchesMonth}/>
         <Redirect to={`${this.props.match.path}/matchesmonth/${this.state.current_month}`}/>
        </Switch>
       }
         </div>   
      </div>
     </HashRouter>
    );
  }
}

export default Calendar;