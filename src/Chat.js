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
      chats: [],
      chatsDisplay: ""
    }
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.showChats = this.showChats.bind(this);
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
    
 showChats(){
     firebase.database().ref('/chats').once('value').then((chat)=>{
         let chatsObject = chat.val()
         let temp_chats = [];
         for (let key in chatsObject){
             temp_chats.push([chatsObject[key].title, chatsObject[key].description, key])
         }
         this.chats = temp_chats
         
         this.setState({chatsDisplay: this.chats.map((element, index) => <div key={index}><NavLink to={`chat/${element[0]}/${element[2]}`}><h4 className="chat-title">{element[0]}</h4></NavLink><div className="chat-info">{element[1]}</div></div>
        )})
         
     })
     };
    
  componentDidMount() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      this.setState({ user });
    } 
  })
  
  this.showChats();  
  };
    
  render() {
    return (
      <div className="chat-body">      
        {this.state.user ?
        <div><div className="chat-buttons"><a href="#/chat/newchat"><input type="button" value="+ Start New Chat"/></a><input type="button" onClick={this.signOut} value="Sign Out"/></div>
        <div className="chats-content"><h3>List of Chats:</h3>
        {this.state.chatsDisplay}</div></div>
        :
        <div><h4>Please sign in to use the chat!</h4>
        <input type="button" onClick={this.signIn} value="Sign in with Google"/></div>
        }
      </div>
    );
  }
}

export default Chat;