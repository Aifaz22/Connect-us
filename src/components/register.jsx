import React, { Component } from "react";

class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }
  render() {
    return (
      <div>
        <form>
          <label>
            <p>Username</p>
            <input
              type="text"
              placeholder="Johndoe"
              style={{ width: "400px" }}
              //   onChange={(event, newValue) => console.log(newValue)}
            />
          </label>
          <br />
          <label>
            <p>Email Id</p>
            <input
              type="email"
              placeholder="johndoe@ucalgary.ca"
              style={{ width: "400px" }}
              //   onChange={(event, newValue) => console.log(newValue)}
            />
          </label>
          <br />
          <label>
            <p>UCID/ID</p>
            <input
              type="number"
              placeholder="Student ID/SIN"
              style={{ width: "400px" }}
              //   onChange={(event, newValue) => console.log(newValue)}
            />
          </label>
          <br />
          <label>
            <p>Password</p>
            <input
              type="password"
              placeholder="Password"
              style={{ width: "400px" }}
              //   onChange={(event, newValue) => console.log(newValue)}
            />
          </label>
          <label>
            <p>Re-enter Password</p>
            <input
              type="password"
              placeholder="Re-type Password"
              style={{ width: "400px" }}
              //   onChange={(event, newValue) => console.log(newValue)}
            />
          </label>
          <br />
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterUser;
