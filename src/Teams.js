import React, { Component } from 'react';

import {
  NavLink
} from "react-router-dom";

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';

class Teams extends Component {
  constructor(){
    super();
    this.state={
      team_items: "",
    }
    this.displayTeams = this.displayTeams.bind(this)
  }
    displayTeams() {
        fetch("https://api.myjson.com/bins/13kt1r").then((response)=>{
          return response.json().then((json) =>{
            let accordion_items = json.teams.map((element, index)=>
            <AccordionItem className="accordion_item" key={ index }><AccordionItemTitle className="accordion_title"><img src={require(`./images/${element.logo}`)}/><h3>{element.name}</h3></AccordionItemTitle><AccordionItemBody className="accordion_body"><NavLink className="teams-button" to={`/teaminfo/${element.name}`}><li>General Information</li></NavLink><NavLink className="teams-button" to={`/matchdetails/${element.name}`}><li>Matches</li></NavLink></AccordionItemBody></AccordionItem>
        )
        let  accordion_list = <Accordion className="accordion_parent">{accordion_items}</Accordion>
        this.setState({team_items: accordion_list})
          })}) 
    }

  componentDidMount(){
    this.displayTeams()
  }
    
  render() {
    return (
      <div>
        {this.state.team_items != "" ?
          <div className="teams-body">
          {this.state.team_items}
          </div>
        :
        <img alt="loader" id="loaderGif" src={require("./images/load-dribbble.gif")}/>
        }
      </div>
    );
  }
}

export default Teams;