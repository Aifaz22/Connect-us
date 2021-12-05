import React, { Component, useState } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";

import NavBar from "./navbar";
function Login() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     token: "false",
  //     username: "",
  //     password: "",
  //   };

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [login, setLogin] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    setLogin(true);
    e.preventDefault();
    // navigate("/NavBar");
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input
              type="text"
              style={{ width: "400px" }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            <p>Password</p>
            <input
              type="password"
              style={{ width: "400px" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div>
            <button type="submit" style={{ marginTop: "0.5%" }}>
              Submit
            </button>
          </div>
          {/* <Link to = "/register" className="navbar-brand"> Register</Link> */}
        </form>
        <Link to="/register" className="navbar-brand">
          {" "}
          Register
        </Link>
      </div>
      {/* <Routes> 
         <Route path="/" element={<Login />} />
           <Route path="/NavBar" element={<NavBar />} />
         
         </Routes> */}
    </div>
  );
}

export default Login;

{
  /* <AppBar title="Login" />
          <TextField
            hintText="Enter your Username"
            floatingLabelText="Username"
            onChange={(event, newValue) =>
              this.setState({ username: newValue })
            }
          />
          <br />
          <TextField
            type="password"
            hintText="Enter your Password"
            floatingLabelText="Password"
            onChange={(event, newValue) =>
              this.setState({ password: newValue })
            }
          />
          <br />
          <RaisedButton
            label="Submit"
            primary={true}
            style={style}
            onClick={(event) => this.handleClick(event)}
          /> */
}
