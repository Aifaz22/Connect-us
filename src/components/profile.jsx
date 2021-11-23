import React, { Component } from "react";
import Courses from "./courses";
import defaultProfile from "../defaultProfile.jpg"
class Profile extends React.Component {
  state = { name: "John Doe" };
  render() {
    return (
      <React.Fragment>
        <div>
        <view style={{flex:1, flexDirection:'column', float : "right", marginRight: "3%"}} > 
        <h2 >{this.state.name}</h2>
        <img src ={defaultProfile} />
        <h4>Degree - (in progress/completed)</h4>

        <div style ={{position:"relative", marginRight :"10%"}}>

        <h4 style={{ float: "right", marginTop: "3%", marginRight: "15%"}}>Enrolled Courses</h4>
        <span style={{float:"right", clear: "left", fontFamily: "Titillium Web", fontWeight: "700", marginTop: "15%", marginRight: "-35%"}}>
          <Courses />
        </span>
        </div>
        </view>
        </div>


        {/* <button className="btn btn-primary">Connect</button> */}
        <br />
       
        {/* <h4 style={{ float: "left" }}>current courses</h4>
        <span style={{ float: "left", clear: "left", fontFamily: "Titillium Web", fontWeight: "700", fontSize: "1em"}}>
          <Courses />
        </span> */}
        
       
      </React.Fragment>
    );
  }
}

export default Profile;
