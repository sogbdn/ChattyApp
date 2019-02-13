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
    // ONLY time to assi gn directly to state:
    this.state = {
      currentUser: { name: "Jane" },
      messages: [{ id: uuid.v1(), username: "Bob", content: "Hey everyone!" }]
    };
  }
  updateUsername = username => {
    //this.sendUpdateUsername(this.state.currentUser.username, username);
    this.setState({
      currentUser: { ...this.state.currentUser, username: username }
    });
  };

  updateMessage = message => {
    //this.sendUpdateUsername(this.state.currentUser.message, message);
    console.log("update");
    const newMessage = {
      id: uuid.v1(),
      username: this.state.currentUser.username,
      content: message
    };
    this.setState({
      messages: [...this.state.messages, newMessage]
    });
  };

  //Code called when the App component is first rendered on the page
  //The setTimeout waits 3 seconds and then adds a new message
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
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
        <Message
          updateUsername={this.updateUsername}
          updateMessage={this.updateMessage}
        />
        <MessageList
          messages={this.state.messages}
          updateMessage={this.updateMessage}
        />
        <ChatBar
          currentUser={this.state.currentUser}
          updateUsername={this.updateUsername}
          updateMessage={this.updateMessage}
        />
      </div>
    );
  }
}

export default App;
