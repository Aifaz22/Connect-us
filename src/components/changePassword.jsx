import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = { pass: "", repass: "", success: "", errortext: "" };
  }
  resetPassword = async () => {
    var body = { Pass: this.state.pass };
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var self = this;
    const response3 = await axios
      .put("http://localhost:3000/api/login", body, config)
      .then(function (response3) {
        //******************************************************************* */
        console.log(response3.data);
        self.setState({
          success: response3.data.msg,
          errortext: "",
        });
      })
      .catch(function (error) {
        self.setState({
          errortext: "error changing password",
          success: "",
        });
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  resetFormPass = () => {
    document.getElementById("changePass-form").reset();
  };
  render() {
    return (
      <React.Fragment>
        <button
          className="btn btn-info"
          style={{
            display: "block",
            position: "absolute",
            left: "10px",
          }}
        >
          <Link to="/profile" style={{ color: "white" }}>
            Go back
          </Link>
        </button>
        <h3>Change Password</h3>
        <hr />

        <form
          style={{ textAlign: "center", margin: "0 auto" }}
          id="changePass-form"
        >
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            style={{ width: "40%", margin: "0 auto" }}
            onChange={(e) => {
              this.setState({
                pass: e.target.value,
              });
            }}
          />
          <input
            className="form-control"
            type="password"
            placeholder="Re-type Password"
            style={{ width: "40%", margin: "0 auto" }}
            onChange={(e) => {
              this.setState({
                repass: e.target.value,
              });
            }}
          />
          <button
            className="btn btn-primary"
            type="button"
            disabled={
              this.state.pass === "" || this.state.pass !== this.state.repass
            }
            onClick={(e) => {
              this.resetPassword();
              this.resetFormPass();
            }}
          >
            Change password
          </button>
        </form>
        <p style={{ backgroundColor: "yellow" }}>{this.state.errortext}</p>
        <p style={{ backgroundColor: "green", color: "white" }}>
          {this.state.success}
        </p>
      </React.Fragment>
    );
  }
}

export default ChangePassword;
