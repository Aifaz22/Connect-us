import React, { Component } from "react";
import MessageForm from "./messageform";
import MessageList from "./messagelist";
import axios from "axios";

class Messenger extends React.Component {
  constructor(props) {
    super();
    this.state = {
      log: [{ fname: "", lname: "" }],
      chatter: "",
      chatterName: "",
      index: parseInt(sessionStorage.getItem("messageIndex")),
    };
  }
  setChatter = (index) => {
    var self = this;
    self.setState({ chatter: "", chatterName: "" });

    if (self.state.log[index].UCID == undefined) {
      self.setState({ chatter: "ID " + self.state.log[index].ID });
    } else {
      self.setState({ chatter: "UCID " + self.state.log[index].UCID });
    }
    self.setState({
      chatterName: self.state.log[0].fname + " " + self.state.log[index].lname,
    });
    console.log(self.state.chatter);
    console.log(self.state.chatterName);
  };
  getList = async () => {
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
        // response.data.map((elem) => {

        // });
        self.setState({ log: response.data });

        // self.setState({chatter: response.data[0].})
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
        console.log("STATE==== ");
        console.log(response2.data[0]);
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
  componentDidMount = async () => {
    console.log(this.state.index);
    await this.getList();
    this.setChatter(this.state.index);
    console.log("DONE******************************************************");
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
            {this.state.log.map((elem, index) => (
              <li
                className="list-group-item"
                style={{ wordWrap: "break-word" }}
                value={index}
                onClick={async (e) => {
                  await this.setState({
                    index: index,
                  });
                  sessionStorage.setItem("messageIndex", index);
                  console.log(
                    "-------------------------" +
                      this.state.index +
                      "--------------------------"
                  );
                  this.setChatter(this.state.index);
                }}
              >
                {elem.fname} {elem.lname}
              </li>
            ))}
          </ul>
        </div>
        {/* Actual messages */}
        {this.state.chatterName !== "" ? (
          <div>
            <MessageList
              style={{ float: "right" }}
              chatter={this.state.chatter}
              chatterName={this.state.chatterName}
            />
            <MessageForm
              style={{ float: "right" }}
              chatter={this.state.chatter}
            />{" "}
          </div>
        ) : (
          <div></div>
        )}
      </React.Fragment>
    );
  };
}

export default Messenger;
