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
    displayTeams() {
        var team_names = ["CHICAGO RED STARS", "NORTH CAROLINA COURAGE", "PORTLAND THORNS FC", "SKY BLUE FC", "HOUSTON DASH","ORLANDO PRIDE","SEATTLE REIGN FC","UTAH ROYALS FC","WASHINGTON SPIRIT"];
        var accordion_items = team_names.map((element, index)=>
            <AccordionItem className="accordion_item" key={ index }><AccordionItemTitle className="accordion_title"><h3>{element}</h3></AccordionItemTitle><AccordionItemBody className="accordion_body"><NavLink className="teams-button" to={`/teaminfo/${element}`}><li>General Information</li></NavLink><NavLink className="teams-button" to={`/matchdetails/${element}`}><li>Matches</li></NavLink></AccordionItemBody></AccordionItem>
        )
        return <Accordion className="accordion_parent">{accordion_items}</Accordion>
    }
    
  render() {
    return (
      <div className="teams-body">
        
        {this.displayTeams()}
      </div>
    );
  }
}

export default Teams;