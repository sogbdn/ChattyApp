import React, { Component } from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "Anonymous", message: "" };
  }
  // Update the input when typing
  handleNameChange = event => {
    this.setState({
      username: event.target.value
    });
  };
  handleMessageChange = event => {
    this.setState({
      message: event.target.value
    });
  };
  // Update the input when "enter"
  handleNameSubmit = event => {
    if (event.key === "Enter") {
      this.props.addUsername(this.state.username);
    }
  };
  handleMessageSubmit = event => {
    if (event.key === "Enter") {
      this.props.addMessage(this.state.message);
      this.setState({ message: "" }); // Clear the field
    }
  };
  render() {
    return (
      <div>
        <footer className="chatbar">
          <input
            className="chatbar-username"
            placeholder="Your Name (Optional)"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleNameChange}
            onKeyUp={this.handleNameSubmit}
          />
          <input
            className="chatbar-message"
            placeholder="Type a message and hit ENTER"
            type="text"
            name="message"
            value={this.state.message}
            onChange={this.handleMessageChange}
            onKeyUp={this.handleMessageSubmit}
          />
        </footer>
      </div>
    );
  }
}

export default ChatBar;
