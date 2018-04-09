import React, { Component } from 'react';

import {
  NavLink
} from "react-router-dom";

class Welcome extends Component {
    
  render() {
    return (
      <div id="welcome-message"><h3>Hello there! Welcome to the NYSL App. To start, click on the icon on the top letf!</h3></div>
    );
  }
}

export default Welcome;