import React, { Component } from "react";
import MessageForm from "./messageform";
import GroupMessageList from "./groupMessageList";
import axios from "axios";
import { Link } from "react-router-dom";
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
    var URL = `http://localhost:3000/api/Course-group/isEnabled/${
      chatterArr[0]
    }/${chatterArr[1]}/${chatterArr[2]}/${chatterArr[3].trim()}`;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var self = this;
    const response = await axios
      .get(URL, config)
      .then(function (response) {
        //******************************************************************* */
        console.log(response.data);
        self.setState({
          enabled: response.data[0].Enabled,
        });
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  componentDidMount = () => {
    this.enabilityCheck(this.state.chatter);
  };
  render() {
    return (
      <div>
        <button
          style={{ display: "block", position: "absolute", left: "10px" }}
          className="btn btn-info"
        >
          <Link to="/course" style={{ color: "white" }}>
            Back to Course
          </Link>
        </button>

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
