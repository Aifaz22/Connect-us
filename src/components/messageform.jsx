import React, { Component } from "react";
import axios from "axios";
class MessageForm extends React.Component {
  state = {
    message_content: "",
  };
  sendMessage = async () => {
    var chatterArr = this.props.chatter.split(" ");
    var body = {};
    if (chatterArr[0] == "ID") {
      body = {
        message_content: this.state.message_content,
        R_UCID: null,
        R_ID: chatterArr[1],
        R_Course_name: null,
        R_Course_year: null,
        R_Course_term: null,
        R_Dept_id: null,
      };
    } else if (chatterArr[0] == "UCID") {
      body = {
        message_content: this.state.message_content,
        R_UCID: chatterArr[1],
        R_ID: null,
        R_Course_name: null,
        R_Course_year: null,
        R_Course_term: null,
        R_Dept_id: null,
      };
    } else {
      body = {
        message_content: this.state.message_content,
        R_UCID: null,
        R_ID: null,
        R_Course_name: chatterArr[1],
        R_Course_year: chatterArr[2],
        R_Course_term: chatterArr[3],
        R_Dept_id: chatterArr[4],
      };
    }

    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var errorFound = false;
    const response = await axios
      .post("http://localhost:3000/api/Send_message", body, config)
      .then(function (response) {
        //******************************************************************* */
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  render() {
    return (
      <form
        className="send-message-form"
        onSubmit={(event) => {
          console.log("submitting...");
          this.sendMessage();
          updateText();
          event.preventDefault();
          // navigate("/NavBar");
        }}
      >
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
          onChange={(e) => this.setState({ message_content: e.target.value })}
        />
        <button
          id="messageSendInput"
          type="submit"
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
        >
          Send
        </button>
      </form>
    );
  }
}
const updateText = () => {
  this.setState({ message: [] });
};

export default MessageForm;
