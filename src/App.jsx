import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Message from "./Message.jsx";
import Nav from "./Nav.jsx";
import uuid from "uuid";

class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    // ONLY time to assign directly to state:
    this.state = {
      currentUser: { username: "Anonymous" },
      messages: [] // messages coming from the server will be stored here as they arrive
    };
  }
  addUsername = username => {
    this.setState({
      currentUser: { ...this.state.currentUser, name: username }
    });
    // client sends object with type, username and content
    const objectClient = {
      type: "postNotification",
      username: username,
      content: `${this.state.currentUser.name ||
        "anonymous"} changed their name to ${username}`
    };

    this.socketServer.send(JSON.stringify(objectClient));
  };
  addMessage = message => {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: message
    };
    this.socketServer.send(JSON.stringify(newMessage));
  };

  updateMessages = message => {
    this.setState({
      messages: [...this.state.messages, message]
    });
    console.log(message);
  };

  //Called when the App component is first rendered on the page
  componentDidMount() {
    console.log("componentDiMount </App>");

    // Connects the application to the WebSocket server and store the WebSocket connection object (this.socket)
    this.socketServer = new WebSocket("ws://localhost:3001/", "protocolOne");

    this.socketServer.onopen = event => {
      console.log("Connected to server");
    };

    // Incomming message listener
    this.socketServer.onmessage = event => {
      console.log(event);
      // The socket event is encoded as a JSON string.
      // This line turns it into an object
      const serverMessage = JSON.parse(event.data);

      switch (serverMessage.type) {
        case "incomingMessage":
          this.updateMessages(serverMessage);
          break;
        case "incomingNotification":
          this.setState({ messages: [...this.state.messages, serverMessage] });
          console.log(serverMessage);
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + serverMessage.type);
      }
    };
  }

  render() {
    //if (this.state.loading) {
    return (
      <div>
        <Nav />
        <MessageList
          messages={this.state.messages}
          addMessage={this.addMessage}
        />
        <ChatBar
          currentUser={this.state.currentUser}
          addUsername={this.addUsername}
          addMessage={this.addMessage}
        />
      </div>
    );
  }
}

export default App;
