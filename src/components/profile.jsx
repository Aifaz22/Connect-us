import React, { Component } from "react";
import Courses from "./courses";
import pictureUofC from "../UofCLogo.jpg"
class Profile extends React.Component {
  state = { name: "John Doe" };
  render() {
    return (
      <React.Fragment>
        <div>{/* test */}
        <view style={{flex:1, flexDirection:'column',  marginRight: "3%",}} > 
        <h2 >{this.state.name}</h2>
        <img style= {{height: "15%", width: "15%"}} src ={pictureUofC} />
        <h4>Degree - (in progress/completed)</h4>
        <h2 style = {{marginTop: "1.5%",}}>Major / Minor

        <p style = {{fontSize: "15px", marginTop: "1.5%"}}>Context for {this.state.name} </p>
        </h2>
        <h2 style = {{float: "right", marginRight: "5%", marginTop: "-5%"}}>Completed Courses</h2>

        <div style ={{position:"relative", marginRight :"10%",marginTop: "-5%", marginLeft: "5%", float: "left"}}>
        <h2 >Enrolled Courses
        <span style={{ clear: "left", fontFamily: "Titillium Web", fontWeight: "700", marginTop: "15%", fontSize: "20px"}}>
          <Courses />
        </span>
        </h2>
        
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
