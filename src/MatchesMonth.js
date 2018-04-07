import React, { Component } from 'react';

class MatchesMonth extends Component {
    constructor() {
        super();
        this.state = {
            events: "",
            matches_list: "",
            matches_of_the_month: []
            
        }
    }
    
    componentDidUpdate() {
    
    let index_clicked = this.props.match.params.id.split("-")[0];
    let item_clicked = this.props.match.params.id.split("-")[1];
    fetch("https://api.myjson.com/bins/1eo3yz").then((response)=>{
        return response.json().then((json) =>{
            this.matches_of_the_month = json.months[index_clicked][item_clicked].matches
            this.matches_list = this.matches_of_the_month.map((element,index)=>
                                    <div key={index} className="schedule-team-container"><h3 className="schedule-team-header">Teams: {element.teams}</h3><div className="schedule-team-body"><p>Date: {element.date}</p><p>Location: {element.location}</p></div></div>)
            let final_result = <div>{this.matches_list}</div>
            this.setState({events:final_result})
        })
    })
      
    }
    
    render() {
    return (
        <div>
        <div><p>{this.props.match.params.id.split("-")[1]}</p></div>
        <div className="schedule-container">{this.state.events}</div>
        </div>
    )
    }
}

export default MatchesMonth;