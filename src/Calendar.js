import React, { Component } from 'react';

import Pagination from 'react-bootstrap/lib/Pagination';

import MatchesMonth from "./MatchesMonth";

class Calendar extends Component {
    
    constructor(){
      super();
      this.state = {
        current_month: new Date().getMonth(),
        clicked: false,
        clicked_month: "",
        first_group_menu: "",
        second_group_menu: "",
        third_group_menu: "",
        months_to_display: ""
      }
      this.getCurrentMonth = this.getCurrentMonth.bind(this)
      this.hideDiv = this.hideDiv.bind(this)
      this.displayMenu = this.displayMenu.bind(this)
    }

    getCurrentMonth(){
      let date = new Date();
      let month_array = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
      var month_list = month_array.map((item, index) =>
          <span key={index} onClick={() => this.hideDiv(index)} className="month_item" id={index}><ul><Pagination.Item>{item}</Pagination.Item></ul></span>)
      let first_group = month_list.slice(0,5)
      let second_group = month_list.slice(5,10)
      let third_group = month_list.slice(10,12)
      let current_month = date.getMonth()
      let group = this.displayMenu(current_month)
      this.setState({first_group_menu: first_group, second_group_menu: second_group, third_group_menu: third_group,
        months_to_display: (group === "1"? first_group: group === "2"? second_group: group === "3"? third_group: null)})
    }  
    
    
    hideDiv(index) {
      this.setState({current_month: index, clicked: true})
    }

    changeDisplayMenu(e){
      let buttonPressed = e.target.parentElement.getAttribute("id")
      let months_displayed = document.getElementsByClassName("month_item")[0].getAttribute("id")
      switch(buttonPressed) {
        case "prevButton":
          switch(months_displayed) {
            case "0":
              this.setState({months_to_display: this.state.third_group_menu})
              break;
            case "5":
              this.setState({months_to_display: this.state.first_group_menu})
              break;
            case "10":
            this.setState({months_to_display: this.state.second_group_menu})
              break;
          }
          break;
        case "nextButton":
          switch(months_displayed) {
            case "0":
            this.setState({months_to_display: this.state.second_group_menu})
              break;
            case "5":
            this.setState({months_to_display: this.state.third_group_menu})
              break;
            case "10":
            this.setState({months_to_display: this.state.first_group_menu})
              break;
          }
          break;
      }
    }

    displayMenu(current_month) {
      switch (true) {
        case (current_month > 0 && current_month <= 4):
          return "1"
          break;
        case (current_month >=5 && current_month <= 9):
          return "2"
          break;
        case  (current_month >=10):
          return "3"
          break;
      }
        
    }

    componentDidMount() {
      this.getCurrentMonth();
    }



  render() {
    return (
      <div className="calendar-body">
       <ul className="month_menu"><Pagination><Pagination.Prev id="prevButton" onClick={(e) => this.changeDisplayMenu(e)}/><li id="menuMonths">{this.state.months_to_display}</li><Pagination.Next id="nextButton" onClick={(e) => this.changeDisplayMenu(e)}/></Pagination></ul>
       <div className="eventsBody">
        <MatchesMonth id={this.state.current_month}/>
         </div>   
      </div>

    );
  }
}

export default Calendar;