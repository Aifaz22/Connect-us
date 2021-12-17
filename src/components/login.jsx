import React, { Component, useState } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import NavBar from "./navbar";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
    };
  }
  // navigate = useNavigate();
  // signIn = async () => {
  //   const body = {
  //     email: this.state.email ,
  //     pass: this.state.pass },
  //   };
  //   var errorFound = false;
  //   console.log(body.email);
  //   const response = await axios
  //     .post("http://localhost:3000/api/login", body)
  //     .then(function (response) {
  //       console.log(response);
  //       //redirect to login
  //       //******************************************************************* */
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       // console.log("XXXXXXXXXXXXXXXXXXXXX");
  //       errorFound = true;
  //     });
  // handleSubmit =

  signIn = async () =>
    // username,
    // email,
    // pass,
    // Admin_ID,
    // UCID,
    // Alumni_ID,
    // SIN
    {
      const body = {
        email: this.state.email,
        pass: this.state.pass,
      };
      var errorFound = false;
      const response = await axios
        .post("http://localhost:3000/api/login", body)
        .then(function (response) {
          console.log(response.data.token);
          console.log(response.data.msg);
          console.log(response.data.user);
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("userUCID", response.data.user.UCID);
          sessionStorage.setItem("userSIN", response.data.user.SIN);
          sessionStorage.setItem("userAlumni", response.data.user.Alumni_ID);
          sessionStorage.setItem("userAdmin", response.data.user.Admin_ID);
          sessionStorage.setItem("logged_in", true);
          sessionStorage.setItem("messageIndex", -1);
          //redirect to HomePage (profile?)
          //******************************************************************* */
        })
        .catch(function (error) {
          console.log(error);
          // console.log("XXXXXXXXXXXXXXXXXXXXX");
          errorFound = true;
        });
      if (errorFound) {
        this.setState({
          errorText: "Incorrect email/password. Please try again.",
        });
      }
    };
  render() {
    const iserror = this.state.errorText !== "";
    return (
      <div style={{ overflow: "auto" }}>
        <form
          onSubmit={(event) => {
            this.signIn();
            updateText();
            event.preventDefault();
            // navigate("/NavBar");
          }}
        >
          <label>
            <p>Email</p>
            <input
              type="text"
              style={{ width: "400px" }}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </label>
          <br />
          <label>
            <p>Password</p>
            <input
              type="password"
              style={{ width: "400px" }}
              onChange={(e) => this.setState({ pass: e.target.value })}
            />
          </label>
          <div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "0.5%" }}
            >
              Submit
            </button>
          </div>
          {/* <Link to = "/register" className="navbar-brand"> Register</Link> */}
        </form>
        <hr />
        <Link to="/register" className="navbar-brand">
          Register
        </Link>
        {iserror ? (
          <p style={{ background: "yellow" }}>{this.state.errorText}</p>
        ) : (
          <p></p>
        )}
      </div>
    );
  }
}

// function Login() {
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     token: "false",
//   //     username: "",
//   //     password: "",
//   //   };

//   // const [email, setEmail] = useState();
//   // const [password, setPassword] = useState();
//   const [login, setLogin] = useState(false);
//   let navigate = useNavigate();

//   return (
//     <div>
//       <div></div>
//       {/* <Routes>
//          <Route path="/" element={<Login />} />
//            <Route path="/NavBar" element={<NavBar />} />

//          </Routes> */}
//     </div>
//   );
// }
const updateText = () => {
  this.setState({ something: {} });
};
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
