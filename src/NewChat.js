import React, { Component } from 'react';
import firebase, { auth, provider } from './fire';
import chatModel from './models/chat';

class newChat extends Component {
 
  addChat(e) {
    e.preventDefault();
    let key = firebase.database().ref('/').push().key
    let title = document.getElementById("chatTitle").value
    let desc = document.getElementById("chatDesc").value
    if (title && desc) {
      
      let model = chatModel(key, title, desc, firebase.database.ServerValue.TIMESTAMP)
      window.location.href = '#/chat'
      return firebase.database().ref('/chats/' + key).set(model)
      
    } else {
      console.log("missing input in mandatory fiels")
    }

  }
  
    
  render() {
    return (
      <div className="new_chat-body">
        <h3>Start new chat</h3>
        <div className="input_body">
        <label htmlFor="chatTitle">Enter a title for the chat:</label><input type="text" id="chatTitle"/>
        <label htmlFor="chatDesc">Enter a description for the chat:</label><input type="text" id="chatDesc"/>
        <input onClick={(e) => this.addChat(e)} type="submit" id="submitNewChat" value="Submit"/>
        </div>
      </div>
    );
  }
}

export default newChat;