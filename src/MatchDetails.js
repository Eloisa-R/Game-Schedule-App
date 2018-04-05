import React, { Component } from 'react';

class MatchDetails extends Component {
  
  TeamMatches() {
      var teamSelected = parseInt(this.props.match.params.number) + 1;
      return <div><h4>Team U{teamSelected} Matches</h4></div>
  }
    
  render() {
    return (
      <div className="matches-body">
        {this.TeamMatches()}
      </div>
    );
  }
}

export default MatchDetails;