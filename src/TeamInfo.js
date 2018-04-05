import React, { Component } from 'react';

class TeamInfo extends Component {
  
  TeamInfo() {
      var teamSelected = parseInt(this.props.match.params.number) + 1;
      return <div><h4>Team U{teamSelected} Info</h4></div>
  }
    
  render() {
    return (
      <div className="team_info-body">
        {this.TeamInfo()}
      </div>
    );
  }
}

export default TeamInfo;