import React, { Component } from "react";
import Courses from "./courses";

class Profile extends React.Component {
  state = { name: "John Doe" };
  render() {
    return (
      <React.Fragment>
        <h2>{this.state.name}</h2>
        <button className="btn btn-primary">Connect</button>
        <br />
        <h4 style={{ float: "left" }}>current courses</h4>
        <span style={{ float: "left", clear: "left" }}>
          <Courses />
        </span>
        <h4 style={{ float: "right" }}>Degree - (in progress/completed)</h4>
      </React.Fragment>
    );
  }
}

export default Profile;
