import React, { Component } from 'react';

import {
  NavLink,
  Route,
  HashRouter
} from "react-router-dom";

import Locations from "./Locations";

class MatchesMonth extends Component {
    constructor() {
        super();
        this.state = {
            events: "",
            matches_list: "",
            matches_of_the_month: [],
            month_name: "",
            location_clicked: false
            
        }
       this.displayMonth = this.displayMonth.bind(this)
       this.itemClicked = this.itemClicked.bind(this)
    }

    itemClicked(){
        this.setState({location_clicked: true})
    }
    
    displayMonth(){
    let index_clicked = this.props.match.params.id;
    let date = new Date(String(parseInt(index_clicked) + 1) + "/01/2018")
    let month = date.toLocaleString("en-us", { month: "long" })
    this.setState({month_name: month})
    fetch("https://api.myjson.com/bins/13kt1r").then((response)=>{
        return response.json().then((json) =>{
            let month_key = Object.keys(json.months[index_clicked])[0]
            this.matches_of_the_month = json.months[index_clicked][month_key].matches
            this.matches_list = this.matches_of_the_month.map((element,index)=>
                    <div key={index} className="schedule-team-container"><h3 className="schedule-team-header">{element.teams}</h3><div className="schedule-team-body"><p>Date: {element.date}</p><p>Location: <NavLink to={`${this.props.match.url}/locations/${element.location}`} onClick={this.itemClicked}>{element.location}</NavLink></p></div></div>)
            let final_result = <div className="global_container">{this.matches_list}</div>
            this.setState({events:final_result})
        })
    })

    }
    
    componentWillReceiveProps() {
     this.displayMonth()
      
    }

    render() {
    return (
        <HashRouter>
        <div>
        {this.state.location_clicked ?
        <div><Route path={`${this.props.match.path}/locations/:id`} component={Locations}/></div>
        :
        <div>
        <div><p>Schedule for {this.state.month_name}</p></div>
        <div className="schedule-container">{this.state.events}</div>
        </div>
        }
        </div>
        </HashRouter>
    )
    }
}

export default MatchesMonth;