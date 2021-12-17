import { Route, Routes, Navigate } from "react-router-dom";

// import {NavBar, MainContent, Profile} from "./components"

import "./App.css";
import NavBar from "./components/navbar";
import Messenger from "./components/messenger";
import Profile from "./components/profile";
import Login from "./components/login";
import CourseOverview from "./components/courseOverview";
import RegisterUser from "./components/register";
import AddPost from "./components/addPost";
import { render } from "@testing-library/react";
import GroupMessenger from "./components/groupMessenger";
import React, { Component } from "react";
import EditProfile from "./components/editProfile";
import EditSinProfile from "./components/editSinProfile";
import EditAlumProfile from "./components/editAlumProfile";
import ChangePassword from "./components/changePassword";

{
  /* <div className="App">
    <h1>ConnectUs</h1>
      {/* <Profile/> */
}
{
  /* <NavBar />
      <MainContent />
      <RegisterUser />
      </div> */
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { something: {} };
  }

  render() {
    var tokenPresent = sessionStorage.getItem("token") !== null;
    console.log(tokenPresent);

    return (
      <div className="App">
        <h1>ConnectUs</h1>
        {/* <Login/> */}
        {/* <RegisterUser/> */}
        {tokenPresent && <NavBar />}

        {/* when navigating goes to infinite loop*********************************************
        {!tokenPresent ? (
          <div>
            <Navigate to="/login" replace={true} />
          </div>
        ) : (
          <p />
        )} */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/profile/:ucid/:sin/:alumid" element={<Profile />} /> */}
          <Route path="/course" element={<CourseOverview />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/addPost" element={<AddPost />} />
          <Route path="/group-messenger" element={<GroupMessenger />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/editSinProfile" element={<EditSinProfile />} />
          <Route path="/editAlumProfile" element={<EditAlumProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
        {/* <Routes> 
           <Route path="/" element={<Login />} />
             <Route path="/NavBar" element={<NavBar />} />
           
           </Routes>
       */}
      </div>
    );
  }
}

export default App;
