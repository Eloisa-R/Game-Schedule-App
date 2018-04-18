import React, { Component } from 'react';
import firebase, { auth, provider } from './fire';
import messageModel from './models/message';
import moment from 'moment';

class addMessage extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      messages: "",
      chat_id: "",
    }
      this.showMessages = this.showMessages.bind(this);
      this.postMessage = this.postMessage.bind(this);
      this.handleFiles = this.handleFiles.bind(this);
    }
  showMessages() {
      firebase.database().ref('/messages/'+ this.props.match.params.type).orderByChild('timestamp').on('value', (chat) =>{
         let temp_messages = []
         chat.forEach((child) => {
             temp_messages.push([child.val().name, child.val().message, child.val().timestamp])
         })
         this.setState({title: this.props.match.params.id, chat_id: this.props.match.params.type, messages: temp_messages.map((element, index) => {
              if (element[0] == auth.currentUser.displayName) {
                if (element[1].includes("firebasestorage")){
                  return <div className="message user" key={index}><div className="author"><div>{element[0]}</div><div>Sent: {moment.unix(element[2]/1000).format("DD/MM/YYYY")}</div></div><p className="imageSent"><img alt="sentFile" src={element[1]}/></p></div>
                } else {
                  return <div className="message user" key={index}><div className="author"><div>{element[0]}</div><div>Sent: {moment.unix(element[2]/1000).format("DD/MM/YYYY")}</div></div><p className="text">{element[1]}</p></div>
                }
              } else {
                if (element[1].includes("firebasestorage")){
                  return <div className="message" key={index}><div className="author"><div>{element[0]}</div><div>Sent: {moment.unix(element[2]/1000).format("DD/MM/YYYY")}</div></div><p className="imageSent"><img alt="sentFile" src={element[1]}/></p></div>
                } else {
                  return <div className="message" key={index}><div className="author"><div>{element[0]}</div><div>Sent: {moment.unix(element[2]/1000).format("DD/MM/YYYY")}</div></div><p className="text">{element[1]}</p></div>
                }
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

  handleFiles(e){
    let uploadedFile = e.target.files;
    if (uploadedFile.length > 0) {
      let storageRef = firebase.storage().ref();
      let fileRef = storageRef.child(uploadedFile[0].name);
      let fileFolderRef = storageRef.child(this.state.title + '/' + uploadedFile[0].name);
      let uploadTask = fileFolderRef.put(uploadedFile[0])
      uploadTask.on('state_changed',(snapshot) =>{
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, (error) => {
        console.log("Oopsie")
      }, () => {
        let downloadURL= uploadTask.snapshot.downloadURL;
        let key = firebase.database().ref('/').push().key
        let author = auth.currentUser.displayName
        let model = messageModel(key,author,downloadURL,firebase.database.ServerValue.TIMESTAMP)
        return firebase.database().ref('/messages/'+ this.state.chat_id + "/" + key).set(model)
        this.showMessages()
      });
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
        <div className="chat-submit"><form id="addMform"><input id="chatMessage" type="text"/><input onClick={(e) => this.postMessage(e)} type="submit" value="Send"/></form><label htmlFor="inputFiles" className="btn"><img alt="attach" id="attachClip" src={require("./images/Attach-512.png")}/></label><input type="file" id="inputFiles"  onChange={(e) => this.handleFiles(e)}/></div>
      </div>
    );
  }
}

export default addMessage;