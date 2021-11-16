import {  Route, Routes,  } from "react-router-dom";

// import {NavBar, MainContent, Profile} from "./components"

import "./App.css";
import NavBar from "./components/navbar";
import Messenger from "./components/messenger";
import Profile from "./components/profile";
import Login from "./components/login";
import RegisterUser from "./components/register";
import { render } from "@testing-library/react";

  {/* <div className="App">
    <h1>ConnectUs</h1>
      {/* <Profile/> */}
      {/* <NavBar />
      <MainContent />
      <RegisterUser />
      </div> */} 

function App() {
  return (
   
    <div className="App">
      <h1>ConnectUs</h1>
      <NavBar/>
    

      <Routes>
    <Route path ="/" element ={<Messenger/>}/>
    <Route path ="/profile" element ={<Profile/>}/>

    </Routes>
      
    
    </div>
    
  );
};

export default App;
