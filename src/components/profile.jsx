import React, { Component } from "react";
import Courses from "./courses";
import defaultProfile from "../defaultProfile.jpg"
class Profile extends React.Component {
  state = { name: "John Doe" };
  render() {
    return (
      <React.Fragment>
        <view style={{flex:1, flexDirection:'column', float : "right", marginRight: "3%"}} > 
        <h2 >{this.state.name}</h2>
        <img src ={defaultProfile} />
        <h4>Degree - (in progress/completed)</h4>
        </view>
        {/* <button className="btn btn-primary">Connect</button> */}
        <br />
        
        <h4 style={{ float: "left" }}>current courses</h4>
        <span style={{ float: "left", clear: "left" }}>
          <Courses />
        </span>
       
      </React.Fragment>
    );
  }
}

export default Profile;
