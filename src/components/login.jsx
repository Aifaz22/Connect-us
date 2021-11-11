import React, { Component } from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  render() {
    return (
      <div>
        <div>
          <form>
            <label>
              <p>Username</p>
              <input
                type="text"
                style={{ width: "400px" }}
                onChange={(event, newValue) =>
                  this.setState({ username: newValue })
                }
              />
            </label>
            <br />
            <label>
              <p>Password</p>
              <input
                type="password"
                style={{ width: "400px" }}
                onChange={(event, newValue) =>
                  this.setState({ password: newValue })
                }
              />
            </label>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
          {/* <AppBar title="Login" />
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
          /> */}
        </div>
      </div>
    );
  }
}

export default Login;
