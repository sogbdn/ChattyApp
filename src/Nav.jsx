import React, { Component } from "react";

class Nav extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <div id="nbClient">{this.props.nbClientConnected} users online </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
