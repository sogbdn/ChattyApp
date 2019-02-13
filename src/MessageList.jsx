import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {
    console.log(this.props);
    const msgs = this.props.messages;
    //const msgList = msgs.map(msg => <li> {msg.content} </li>);

    const msgList = msgs.map(msg => (
      <Message key={msg.id} username={msg.username} content={msg.content} />
    ));

    return (
      <div>
        <ul> {msgList} </ul>
      </div>
    );
  }
}

export default MessageList;
