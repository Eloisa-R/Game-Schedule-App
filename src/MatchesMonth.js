import React, { Component } from 'react';

class MatchesMonth extends Component {
    displayEvents() {
    var index_clicked = this.props.match.params.id.split("-")[0];
    var item_clicked = this.props.match.params.id.split("-")[1];
    fetch("https://api.myjson.com/bins/1eo3yz").then((response)=>{
        return response.json().then((json) =>{
            var matches_of_the_month = json.months[index_clicked][item_clicked].matches
            var matches_list = matches_of_the_month.map((element,index)=>
                                    <div key={index}><h3>Teams: {element.teams}</h3><p>Date: {element.date}</p><p>Location: {element.location}</p></div>)
            return <div>{matches_list}</div>
            
        })
    })
      return <div>Hey, Dave</div>
    }
    
    render() {
    return (
        <div>
        <div><p>Hi there {this.props.match.params.id}</p></div>
        <div>{this.displayEvents()}</div>
        </div>
    )
    }
}

export default MatchesMonth;