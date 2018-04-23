import React, { Component } from 'react';
import firebase, { auth} from './fire';
import chatModel from './models/chat';
import messageModel from './models/message';

class newChat extends Component {
 
  addChat(e) {
    e.preventDefault();
    let key = firebase.database().ref('/').push().key
    let title = document.getElementById("chatTitle").value
    let desc = document.getElementById("chatDesc").value
    let mess = document.getElementById("chatFirstM").value

    if (title.includes("?")) {
      document.getElementById("errorNoQ").style.display="block";
      document.getElementById("errorNewChat").style.display="none";
    }

    else if (title && desc && mess) {
      
      let model = chatModel(key, title, desc, firebase.database.ServerValue.TIMESTAMP)
      let key_m = firebase.database().ref('/').push().key
      let author = auth.currentUser.displayName
      let model_m = messageModel(key_m,author,mess,firebase.database.ServerValue.TIMESTAMP)
      window.location.href = '#/chat'
      return firebase.database().ref('/chats/' + key).set(model), firebase.database().ref('/messages/'+ key + "/" + key).set(model_m)
        
    } else {
      document.getElementById("errorNewChat").style.display="block";
      document.getElementById("errorNoQ").style.display="none";
    }

  }
  
    
  render() {
    return (
      <div className="new_chat-body">
        <div className="startChatHeader"><a href="#/chat">Back</a><h3>Start new chat</h3></div>
        <div className="input_body">
        <label htmlFor="chatTitle">Enter a title for the chat:<span className="comp">*</span></label><input type="text" id="chatTitle"/>
        <label htmlFor="chatDesc">Enter a description for the chat:<span className="comp">*</span></label><input type="text" id="chatDesc"/>
        <label htmlFor="chatFirstM">Add an initial message for the chat!<span className="comp">*</span></label><input type="text" id="chatFirstM"/>
        <div id="errorNewChat">Please make sure you filled all the fields!</div>
        <div id="errorNoQ">Please don't use question marks in the title</div>
        <input onClick={(e) => this.addChat(e)} type="submit" id="submitNewChat" value="Submit"/>
        </div>
      </div>
    );
  }
}

export default newChat;