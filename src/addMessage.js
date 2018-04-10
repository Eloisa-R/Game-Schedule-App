import React, { Component } from 'react';
import firebase, { auth, provider } from './fire';
import messageModel from './models/message';

class addMessage extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      messages: '',
      
    }
      this.showMessages = this.showMessages.bind(this);
    }
  showMessages() {
      var chatSelected = this.props.match.params.id;
      return firebase.database().ref('/messages/'+ chatSelected).once('value').then((chat)=>{
          let chatsObject = chat.val();
          let temp_messages = []
          for (let key in chatsObject) {
              temp_messages.push([chatsObject[key].name, chatsObject[key].message])
          }
          
          this.setState({messages: temp_messages.map((element, index) => {
              <div key={index}><p>author: {element[0]}</p><p>message: {element[1]}</p></div>
          })})
          
        })
}
                                                                                    
  componentDidMount() {
         this.showMessages();
      }                                                                                  
    
  render() {
    return (
      <div className="new_message-body">
        {this.state.messages}
      </div>
    );
  }
}

export default addMessage;