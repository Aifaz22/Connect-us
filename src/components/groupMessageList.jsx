import React, { Component } from "react";
import axios from "axios";

class GroupMessageList extends Component {
  constructor(props) {
    super();
    this.state = {
      chatterName: "cpsc471 Fall2021",
      chatterID: "cpsc471 2021 Fall 1",
      userID: "UCID 23",
      userName: "Me",
      messages: [
        {
          senderId: "Aifaz",
          text: "Hi",
        },
        {
          senderId: "janedoe",
          text: "Hello",
        },
      ],
    };
  }

  getMessages = async (x) => {
    const chatterArr = x.trim().split(" ");
    var URL = `http://localhost:3000/api/Get_group_message/${chatterArr[0]}/${
      chatterArr[1]
    }/${chatterArr[2]}/${chatterArr[3].trim()}`;
    // // const body = {};
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var errorFound = false;
    var self = this;
    const response = await axios
      .get(URL, config)
      .then(function (response) {
        console.log(response.data);
        self.setState({ messages: response.data.reverse() });
      })
      .catch(function (error) {
        console.log(error);
        console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  // getSName = async (x) => {
  //   const chatterArr = x.split(" ");
  //   var URL = "http://localhost:3000/api/";
  //   if (chatterArr[0] === "UCID") {
  //     URL += "Students/" + chatterArr[1];
  //   } else {
  //     URL += "Alumni/" + chatterArr[1];
  //   }

  //   // // const body = {};
  //   var token = sessionStorage.getItem("token");
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };
  //   var errorFound = false;
  //   var self = this;
  //   const response = await axios
  //     .get(URL, config)
  //     .then(function (response) {
  //       console.log("/////////////////////////////////////////////");
  //       console.log(response.data);
  //       self.setState({
  //         chatterName: response.data.fname + " " + response.data.lname,
  //       });
  //       console.log(self.state.chatterName);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       console.log("XXXXXXXXXXXXXXXXXXXXX");
  //       errorFound = true;
  //     });
  // };
  componentDidMount = () => {
    console.log(this.props.chatter);
    this.getMessages(this.props.chatter);
    // this.getSName(this.props.chatter);
    if (sessionStorage.getItem("userUCID") == "null") {
      this.setState({
        chatterID: this.props.chatter,
        userID: "ID " + sessionStorage.getItem("userAlumni"),
        chatterName: this.props.chatterName,
      });
    } else {
      this.setState({
        chatterID: this.props.chatter,
        userID: "UCID " + sessionStorage.getItem("userUCID"),
        chatterName: this.props.chatterName,
      });
    }
  };
  // how to get name
  render() {
    return (
      <section>
        <h5>{this.state.chatterName}</h5>
        <ul
          style={{
            paddingRight: "1%",
            width: "100%",
            float: "right",
            listStyle: "none",
            height: window.innerHeight * 0.6,
            overflow: "auto",
            display: "flex",
            flexDirection: "column-reverse",
            bottom: "20",
          }}
        >
          {this.state.messages.map((message) => {
            return (
              <li
                style={{
                  wordWrap: "break-word",
                  border: " 1px solid black",
                  marginTop: "0.2%",
                  textAlign: "left",
                }}
                // key={"'" + message.Message_ID + "'"}
              >
                <div className="MessageElement" style={{ fontSize: "12px" }}>
                  {"ID " + message.S_ID == this.state.userID ||
                  "UCID " + message.S_UCID == this.state.userID ? (
                    this.state.userName
                  ) : (
                    <span>
                      {message.Fname} {message.Lname}
                    </span>
                  )}{" "}
                  <br />
                  <div
                    className="MessageText"
                    style={{
                      wordWrap: "break-word",
                      background: "rgba(189, 227, 230,0.5)",
                      marginTop: "0.2%",
                      textAlign: "left",
                      fontSize: "17px",
                      paddingLeft: "100px",
                    }}
                  >
                    {message.message_content}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default GroupMessageList;
