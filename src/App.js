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

function App() {
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
        <Route path="/course" element={<CourseOverview />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/addPost" element={<AddPost />} />
      </Routes>
      {/* <Routes> 
         <Route path="/" element={<Login />} />
           <Route path="/NavBar" element={<NavBar />} />
         
         </Routes>
     */}
    </div>
  );
}

export default App;
