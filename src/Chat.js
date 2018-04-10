import React, { Component } from 'react';
import firebase, { auth, provider } from './fire';

import {
  NavLink
} from "react-router-dom";

class Chat extends Component {
    constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null,
    }
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    }
    
  signIn() {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
  };

  
  signOut() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  };
    
  componentDidMount() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      this.setState({ user });
    } 
  })
  }
    
  render() {
    return (
      <div className="chat-body">      
        {this.state.user ?
        <input type="button" onClick={this.signOut} value="Sign Out"/>
        :
        <div><h4>Please sign in to use the chat!</h4>
        <input type="button" onClick={this.signIn} value="Sign in with Google"/></div>
        }
      </div>
    );
  }
}

export default Chat;