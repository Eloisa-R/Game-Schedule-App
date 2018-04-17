import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TeamInfo extends Component {
  constructor(){
   super();
    this.state={
      my_team_data: ""
    }   
  }
  static contextTypes = {
    router: PropTypes.object
  }
  
  TeamInfo() {
    
      let teamSelected = this.props.match.params.id;
      fetch("https://api.myjson.com/bins/13kt1r").then((response)=>{
        return response.json().then((json) =>{
            let teams_info = json.teams
            let my_team = teams_info.filter(team => String(team.name).includes(teamSelected))
            this.setState({my_team_data:my_team.map((element) => 
              <div className="team-info-container"><h4>{element.name}</h4><img src={require(`./images/${element.logo}`)}/><p>Head coach: {element.head_coach}</p><p>Home field: {element.home_field}</p><img className="football_field" src={require("./images/soccer_field_stadium.jpg")}/></div>) 
  
            })  
          })  
            
        })

  }
  componentDidMount(){
    this.TeamInfo()
  }
    
  render() {
    return (
      <div className="team_info-body">
      <div className="body-and-buttons-info">
      <div className="back-button-matches"><a className="back-button" onClick={this.context.router.history.goBack} >Back</a></div>
        {this.state.my_team_data != "" ?
        <React.Fragment>
        {this.state.my_team_data}
        </React.Fragment>
        :
        <img alt="loader" id="loaderGif" src={require("./images/load-dribbble.gif")}/>
        }
      </div>

      </div>
    );
  }
}

export default TeamInfo;