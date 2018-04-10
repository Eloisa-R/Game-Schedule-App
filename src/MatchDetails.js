import React, { Component } from 'react';

import {
  NavLink
} from "react-router-dom";

class MatchDetails extends Component {
    
    constructor() {
    super();
    this.state = {
        matches_per_month: [],
        matches_list_for_team: [],
        matches_to_show: "",
        events: ""

    }
    }
  
  componentDidMount() {
      var teamSelected = parseInt(this.props.match.params.number) + 1;
    
     fetch("https://api.myjson.com/bins/1eo3yz").then((response)=>{
        return response.json().then((json) =>{
            this.matches_per_month = json.months
            let temp_matches_list_for_team = []
            this.matches_per_month.forEach(element => {
                temp_matches_list_for_team.push(Object.values(element)[0].matches.filter(match => String(match.teams).includes("U" + teamSelected)))
            })   
            let matches_to_show = []
            temp_matches_list_for_team.forEach((month) => {
                matches_to_show.push(month.map((element,index)=>
                                    <div key={index} className="schedule-team-container"><h3 className="schedule-team-header">Teams: {element.teams}</h3><div className="schedule-team-body"><p>Date: {element.date}</p><p>Location: <NavLink to={`/locations/${element.location}`}>{element.location}</NavLink></p></div></div>))})
 
            let final_result = <div>{matches_to_show}</div>
                
            this.setState({events:final_result})
        })
    })
  }

    
  render() {
    return (
      <div className="matches-body">
        {this.state.events}
      </div>
    );
  }
}

export default MatchDetails;