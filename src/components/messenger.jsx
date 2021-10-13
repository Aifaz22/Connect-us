import React, { Component } from "react";
import MessageList from "./messagelist";
class Messenger extends React.Component {
  state = {
    log: ["alyssaaa", "james", "elton"],
  };
  render() {
    return (
      <React.Fragment>
        {/* <Title /> */}

        {/* List on the left for all names */}
        <div
          style={{
            float: "left",
            borderRight: "2px solid Black ",
            width: "20%",
            height: window.innerHeight * 0.6,
            overflow: "auto",
          }}
        >
          <ul className="list-group list-group-flush">
            {this.state.log.map((elem) => (
              <li
                className="list-group-item"
                style={{ wordWrap: "break-word" }}
              >
                {elem}
              </li>
            ))}
          </ul>
        </div>
        {/* Actual messages */}
        <MessageList style={{ float: "right" }} />

        {/* <SendMessageForm /> */}
      </React.Fragment>
    );
  }
}

export default Messenger;
