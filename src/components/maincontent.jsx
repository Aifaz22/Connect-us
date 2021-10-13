import React, { Component } from "react";
import Profile from "./profile";
import Messenger from "./messenger";

class MainContent extends Component {
  render() {
    return (
      <div style={{ margin: "3%", marginLeft: "1%", marginRight: "1%" }}>
        <Messenger />
      </div>
    );
  }
}

export default MainContent;
