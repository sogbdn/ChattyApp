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
      currentUser: { name: "Jane" },
      messages: [] // messages coming from the server will be stored here as they arrive
    };
  }
  addUsername = username => {
    this.setState({
      currentUser: { ...this.state.currentUser, name: username }
    });
  };
  addMessage = message => {
    const newMessage = {
      username: this.state.currentUser.name,
      content: message
    };
    this.socketServer.send(JSON.stringify(newMessage));
  };

  //Called when the App component is first rendered on the page
  //The setTimeout waits 3 seconds and then adds a new message
  componentDidMount() {
    console.log("componentDiMount </App>");

    // Connects the application to the WebSocket server and store the WebSocket connection object (this.socket)
    this.socketServer = new WebSocket("ws://localhost:3001/", "protocolOne");
    //this.socketServer.onopen = event => {
    // };

    // Incomming message listener
    this.socketServer.onmessage = event => {
      const serverMessage = JSON.parse(event.data);
      console.log(serverMessage);
      this.setState({
        messages: [...this.state.messages, serverMessage]
      });
    };

    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
  }

  render() {
    //if (this.state.loading) {
    return (
      <div>
        <Nav />
        <Message addUsername={this.addUsername} addMessage={this.addMessage} />
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
