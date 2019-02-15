import React, { Component } from "react";

class Message extends Component {
  render() {
    console.log(this.props);
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
    } else if (this.props.messageType === "incomingNotification") {
      return (
        <div className="notification">
          <span className="notification-content">{this.props.content} </span>
        </div>
      );
    }
  }
}

export default Message;
