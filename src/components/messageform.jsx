import React, { Component } from "react";
import axios from "axios";
class MessageForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      message_content: "",
    };
  }

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
        R_Course_name: chatterArr[0],
        R_Course_year: chatterArr[1],
        R_Course_term: chatterArr[2],
        R_Dept_id: chatterArr[3],
      };
      console.log(
        `${body.R_UCID} ${body.R_ID} ${body.R_Course_name} ${body.R_Course_term} ${body.R_Course_year} ${body.R_Dept_id}`
      );
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
    const arr = this.props.chatter.split(" ");
    return (
      <form
        className="send-message-form"
        onSubmit={async (event) => {
          console.log("submitting...");
          await this.sendMessage();
          updateText();
          event.preventDefault();
          // navigate("/NavBar");
        }}
      >
        {arr[0] !== "UCID" && arr[0] !== "ID" ? (
          <input
            id="messageWriteInput"
            //onChange={this.handleChange}
            //value={this.state.message}
            placeholder="Type your message and hit ENTER"
            type="text"
            style={{
              position: "fixed",
              bottom: "1%",
              width: "88%",
              paddingLeft: "8px",
              paddingTop: "6px",
              paddingBottom: "6px",
              left: "2%",
            }}
            onChange={(e) => this.setState({ message_content: e.target.value })}
          />
        ) : (
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
        )}

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
