import React, { Component } from 'react';

import {
  NavLink,
  HashRouter
} from "react-router-dom";


class MatchesMonth extends Component {
    constructor() {
        super();
        this.state = {
            events: "",
            matches_list: "",
            matches_of_the_month: [],
            month_name: "",
            
        }
       this.displayMonth = this.displayMonth.bind(this)
       this.itemClicked = this.itemClicked.bind(this)
    }

    itemClicked(){
        this.setState({location_clicked: true})
    }
    
    displayMonth(nextProps){
    let index_clicked = nextProps.id
    let date = new Date(String(parseInt(index_clicked) + 1) + "/01/2018")
    let month = date.toLocaleString("en-us", { month: "long" })
    this.setState({month_name: month})
    fetch("https://api.myjson.com/bins/13kt1r").then((response)=>{
        return response.json().then((json) =>{
            let month_key = Object.keys(json.months[index_clicked])[0]
            this.matches_of_the_month = json.months[index_clicked][month_key].matches
            this.matches_list = this.matches_of_the_month.map((element,index)=>
                    <div key={index} className="schedule-team-container"><div className="match-date">Date: {element.date}/18</div><h4 className="schedule-team-header"><div className="images-team"><img alt="" src={require(`./images/${element.logos[0]}`)}/><img alt="" src={require(`./images/${element.logos[1]}`)}/></div>{element.teams}</h4><div className="location-div"><img alt="" src={require("./images/locations.png")}/>Location: <NavLink to={`/locations/${element.location}`}>{element.location}</NavLink></div></div>)
            let final_result = <div className="global_container">{this.matches_list}</div>
            this.setState({events:final_result})
        })
    })

    }
    
    componentWillReceiveProps(nextProps) {
     this.displayMonth(nextProps)
      
    }

    render() {
    return (
        <HashRouter>
        <div>
        <div>
          {this.state.events !== "" ?
           <React.Fragment>
            <div><p>Schedule for {this.state.month_name}</p></div>
            <div className="schedule-container">{this.state.events}</div>
            </React.Fragment>
            :
            <React.Fragment>
            <img alt="loader" id="loaderGif" src={require("./images/load-dribbble.gif")}/>
            </React.Fragment>
            }
        </div>

        </div>
        </HashRouter>
    )
    }
}

export default MatchesMonth;