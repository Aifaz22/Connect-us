import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      pass: "",
      repass: "",
      UCID: null,
      SIN: null,
      Admin_ID: null,
      Alumni_ID: null,
      usertype: "UCID",
    };
  }

  registration = async () =>
    // username,
    // email,
    // pass,
    // Admin_ID,
    // UCID,
    // Alumni_ID,
    // SIN
    {
      console.log("user type:" + this.state.usertype);
      const body = {
        username: this.state.username,
        email: this.state.email,
        pass: this.state.pass,
        Admin_ID: this.state.Admin_ID,
        UCID: this.state.UCID,
        Alumni_ID: this.state.Alumni_ID,
        SIN: this.state.SIN,
      };
      var errorFound = false;
      const response = await axios
        .post("http://localhost:3000/api/register", body)
        .then(function (response) {
          console.log(response);
          //redirect to login
          //******************************************************************* */
        })
        .catch(function (error) {
          console.log(error);
          // console.log("XXXXXXXXXXXXXXXXXXXXX");
          errorFound = true;
        });
      if (errorFound) {
        this.setState({
          errorText:
            "Could not register. Account may already exist. Please contact the admin to add you to the database before you register or for the inquiry.",
        });
      }
    };
  render() {
    const iserror = this.state.errorText !== "";
    return (
      <div style={{ overflow: "auto" }}>
        <form
          onSubmit={(event) => {
            if (this.state.UCID === "") {
              this.setState({ UCID: null });
              //console.log(this.state.UCID);
            } else if (this.state.SIN === "") {
              this.setState({ SIN: null });
              //console.log(this.state.SIN);
            } else if (this.state.Admin_ID === "") {
              this.setState({ Admin_ID: null });
              //console.log(this.state.Admin_ID);
            } else if (this.state.Alumni_ID === "") {
              this.setState({ Alumni_ID: null });
              //console.log(this.state.Alumni_ID);
            }
            // this.setState({ username: event.target.value });
            console.log(this.state.UCID);
            this
              .registration
              // this.state.username,
              // this.state.email,
              // this.state.pass,
              // this.state.Admin_ID,
              // this.state.UCID,
              // this.state.Alumni_ID,
              // this.state.SIN
              ();
            //this.resetState();
            event.preventDefault();
          }}
        >
          <label>
            <p>Username</p>
            <input
              type="text"
              placeholder="Johndoe"
              style={{ width: "400px" }}
              onChange={(event) => {
                this.setState({ username: event.target.value });
                //console.log(this.state.username);
              }}
            />
          </label>
          <br />
          <label>
            <p>Email Id</p>
            <input
              type="email"
              placeholder="johndoe@ucalgary.ca"
              style={{ width: "400px" }}
              onChange={(event) => {
                this.setState({ email: event.target.value });
                //console.log(this.state.email);
              }}
              required
            />
          </label>

          <br />
          <label>
            <p>Password</p>
            <input
              type="password"
              placeholder="Password"
              style={{ width: "400px" }}
              onChange={(event) => {
                this.setState({ pass: event.target.value });
                //console.log(this.state.pass);
              }}
              required
            />
          </label>
          <br />
          <label>
            <p>Re-enter Password</p>
            <input
              type="password"
              placeholder="Re-type Password"
              style={{ width: "400px" }}
              onChange={(event) => {
                this.setState({ repass: event.target.value });
                //console.log(this.state.repass);
              }}
              required
            />
          </label>
          <br />
          <br />
          <select
            defaultValue={"UCID"}
            onChange={(event) => {
              this.setState({ usertype: event.target.value });
              //console.log(this.state.usertype);
            }}
          >
            <option value="Alumni_ID">Alumni</option>
            <option value="UCID">Student</option>
            <option value="SIN">Instructor</option>
            <option value="Admin_ID">Admin</option>
          </select>
          <br />
          <label>
            <p>ID</p>
            <input
              type="number"
              placeholder="Student ID/SIN"
              style={{ width: "400px" }}
              onChange={(event) => {
                const user = this.state.usertype;
                if (user === "UCID") {
                  this.setState({ UCID: event.target.value });
                  //console.log(this.state.UCID);
                } else if (user === "SIN") {
                  this.setState({ SIN: event.target.value });
                  //console.log(this.state.SIN);
                } else if (user === "Admin_ID") {
                  this.setState({ Admin_ID: event.target.value });
                  //console.log(this.state.Admin_ID);
                } else if (user === "Alumni_ID") {
                  this.setState({ Alumni_ID: event.target.value });
                  //console.log(this.state.Alumni_ID);
                }
              }}
            />
          </label>
          <br />
          <br />

          <input
            type="submit"
            value="Submit"
            disabled={
              this.state.pass === "" || this.state.pass !== this.state.repass
            }
          />
        </form>
        {iserror ? (
          <p style={{ background: "yellow" }}>{this.state.errorText}</p>
        ) : (
          <p></p>
        )}
        <Link to="/" className="navbar-brand">
          {" "}
          Already have an account? Log In
        </Link>
      </div>
    );
  }
}
// let
export default RegisterUser;
