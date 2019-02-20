import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Message from "./Message.jsx";
import Nav from "./Nav.jsx";

class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    // ONLY time to assign directly to state:
    this.state = {
      currentUser: { name: "Anonymous" },
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

  addClient = username => {
    this.setState({
      messages: [...this.state.messages, message]
    });
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
  };

  //Called when App component is first rendered on the page
  componentDidMount() {
    console.log("componentDiMount </App>");

    // Connects the application to the WebSocket server and store the WebSocket connection object (this.socket)
    this.socketServer = new WebSocket("ws://localhost:3001/", "protocolOne");
    this.socketServer.onopen = event => {
      console.log("Connected to server");
    };

    // Incomming message listener
    this.socketServer.onmessage = event => {
      // The socket event is encoded as a JSON string.
      // This line turns it into an object
      const serverMessage = JSON.parse(event.data);

      switch (serverMessage.type) {
        case "incomingMessage":
          this.updateMessages(serverMessage);
          break;
        case "incomingNotification":
          this.setState({ messages: [...this.state.messages, serverMessage] });
          break;
        case "connectionUpdate":
          const newNotification = {
            type: "incomingNotification",
            id: serverMessage.id,
            content: serverMessage.content
          };

          this.setState({
            nbClientConnected: serverMessage.nbClientConnected,
            messages: [...this.state.messages, newNotification]
          });

          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + serverMessage.type);
      }
    };
  }

  render() {
    return (
      <div>
        <Nav nbClientConnected={this.state.nbClientConnected} />
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
