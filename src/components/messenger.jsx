import React, { Component } from "react";
import MessageForm from "./messageform";
import MessageList from "./messagelist";
import axios from "axios";

class Messenger extends React.Component {
  constructor(props) {
    super();
    this.state = {
      log: [
        { fname: "abc", lname: "def" },
        { fname: "aaa", lname: "bbb" },
      ],
    };
  }

  getList = async (char) => {
    // const body = {};
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var errorFound = false;
    var self = this;
    const response = await axios
      .get(`http://localhost:3000/api/Message_list_Suser`, config)
      .then(function (response) {
        console.log(self.state.log);
        // response.data.map((elem) => {

        // });
        self.setState({ log: response.data });
        // console.log(this.state.log);
        //redirect to HomePage (profile?)
        //******************************************************************* */
      })
      .catch(function (error) {
        console.log(error);
        console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
    const response2 = await axios
      .get(`http://localhost:3000/api/Message_list_Auser`, config)
      .then(function (response2) {
        console.log(self.state.log);
        // response.data.map((elem) => {

        // });
        self.setState({ log: [...self.state.log, ...response2.data] });
        // console.log(this.state.log);
        //redirect to HomePage (profile?)
        //******************************************************************* */
      })
      .catch(function (error) {
        console.log(error);
        console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });

    // if (errorFound) {
    //   this.setState({
    //     errorText: "Incorrect email/password. Please try again.",
    //   });
    // }
  };
  componentDidMount = () => {
    this.getList("S");
  };
  render = () => {
    return (
      <React.Fragment>
        {/* <Title /> */}

        {/* List on the left for all names */}
        <div
          style={{
            float: "left",
            borderRight: "2px solid Black ",
            width: "20%",
            height: window.innerHeight * 0.73,
            overflow: "auto",
          }}
        >
          <ul className="list-group list-group-flush">
            {this.state.log.map((elem) => (
              <li
                className="list-group-item"
                style={{ wordWrap: "break-word" }}
                // onClick={}
              >
                {elem.fname} {elem.lname}
              </li>
            ))}
          </ul>
        </div>
        {/* Actual messages */}
        <MessageList
          style={{ float: "right" }}
          chatter="UCID 4"
          chatterName="Sergio Ramos"
        />

        {/* <SendMessageForm /> */}
        <MessageForm style={{ float: "right" }} chatter="UCID 4" />
      </React.Fragment>
    );
  };
}

export default Messenger;
