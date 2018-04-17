import React, { Component } from 'react';
import firebase, { auth, provider } from './fire';
import messageModel from './models/message';

class addMessage extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      messages: "",
      chat_id: ""
    }
      this.showMessages = this.showMessages.bind(this);
      this.postMessage = this.postMessage.bind(this);
    }
  showMessages() {
      firebase.database().ref('/messages/'+ this.props.match.params.type).orderByChild('timestamp').on('value', (chat) =>{
         let temp_messages = []
         chat.forEach((child) => {
             temp_messages.push([child.val().name, child.val().message])
         })
         this.setState({title: this.props.match.params.id, chat_id: this.props.match.params.type, messages: temp_messages.map((element, index) => {
              if (element[0] == auth.currentUser.displayName) {
                return <div className="message user" key={index}><p className="author">{element[0]}</p><p className="text">{element[1]}</p></div>  
              } else {
              return <div className="message" key={index}><p className="author">{element[0]}</p><p className="text">{element[1]}</p></div>
            }
            })})
      })
     }
    
   postMessage(e){
       e.preventDefault()
        let message = document.getElementById("chatMessage").value
        document.getElementById("chatMessage").value = ""
        if (message) {
        let key = firebase.database().ref('/').push().key
        let author = auth.currentUser.displayName
        let model = messageModel(key,author,message,firebase.database.ServerValue.TIMESTAMP)
        return firebase.database().ref('/messages/'+ this.state.chat_id + "/" + key).set(model)
        this.showMessages()
        } else {
            console.log("please write a message")
        }
    }
    
                                                                                    
  componentDidMount() {
      this.showMessages();
      }

    
  render() {
    return (
      <div className="new_message-body">
        <div className="chat-header"><a href="#/chat">Back</a><h3>{this.state.title}</h3></div>
        {this.state.messages != "" ?
        <div className="chat-messages">{this.state.messages}</div>
        :
        <img alt="loader" id="loaderGif" src={require("./images/load-dribbble.gif")}/>
        }
        <div className="chat-submit"><form><input id="chatMessage" type="text"/><input onClick={(e) => this.postMessage(e)} type="submit" value="Send"/></form></div>
      </div>
    );
  }
}

export default addMessage;