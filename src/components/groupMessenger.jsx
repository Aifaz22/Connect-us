import React, { Component } from "react";
import MessageForm from "./messageform";
import GroupMessageList from "./groupMessageList";
class GroupMessenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatter: "cpsc471 2021 Fall 1",
      chatterName: "",
      enabled: 1,
    };
  }
  enabilityCheck = async (x) => {
    const chatterArr = x.trim().split(" ");
    var URL = `http://localhost:3000/api/Get_group_message/${chatterArr[0]}/${
      chatterArr[1]
    }/${chatterArr[2]}/${chatterArr[3].trim()}`;
  };
  componentDidMount = () => {
    this.enabilityCheck(this.state.chatter);
  };
  render() {
    return (
      <div>
        <GroupMessageList
          chatterName="cpsc471 Fall2021"
          chatter="cpsc471 2021 Fall 1"
        />
        {this.state.enabled === 0 ? (
          <p>This group is disabled. no messages can be sent.</p>
        ) : (
          <MessageForm chatter="cpsc471 2021 Fall 1" />
        )}
      </div>
    );
  }
}

export default GroupMessenger;
