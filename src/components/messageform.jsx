import React, { Component } from "react";

class MessageForm extends React.Component {
  render() {
    return (
      <form className="send-message-form">
        <input
          id="messageWriteInput"
          //onChange={this.handleChange}
          //value={this.state.message}
          placeholder="Type your message and hit ENTER"
          type="text"
          style={{
            position: "fixed",
            bottom: "1%",
            width: "70%",
            paddingLeft: "8px",
            paddingTop: "6px",
            paddingBottom: "6px",
          }}
        />
        <input
          id="messageSendInput"
          type="button"
          value="Send"
          style={{
            position: "fixed",
            bottom: "1%",
            right: "1%",
            width: "8%",
            paddingLeft: "8px",
            paddingTop: "6px",
            paddingBottom: "6px",
          }}
        />
      </form>
    );
  }
}

export default MessageForm;
