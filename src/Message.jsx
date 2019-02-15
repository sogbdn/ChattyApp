import React, { Component } from "react";

class Message extends Component {
  render() {
    console.log(this.props.username);
    console.log(this.props.content);
    console.log(this.props.messageType);
    if (this.props.messageType === "incomingMessage") {
      return (
        <div>
          <main className="messages">
            <div className="message">
              <span className="message-username">{this.props.username}</span>
              <span className="message-content">{this.props.content}</span>
            </div>
            <div className="message system"> </div>
          </main>
        </div>
      );
    } else if (true) {
      return (
        <div className="notification">
          <span className="notification-content">{this.props.content} </span>
        </div>
      );
    }
  }
}

export default Message;
