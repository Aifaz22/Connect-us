import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class EditAlumProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "",
      userID: "",
      degrees: [],
      degreeToAdd: "",
      dyearToAdd: 2021,
      currentEmployment: "",
      currentPosition: "",
    };
  }
  getDegrees = async () => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .get("http://localhost:3000/api/Degree/" + self.state.userID, config)
      .then(function (response) {
        //******************************************************************* */
        console.log(response.data);
        self.setState({
          degrees: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  delDegree = async (s, yr) => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .delete("http://localhost:3000/api/Degree/" + s + "/" + yr, config)
      .then(function (response) {
        //******************************************************************* */
        console.log(response.data);
        // self.setState({ research: [] });
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  addDegree = async () => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var body = {
      Degree_title: this.state.degreeToAdd,
      degree_year: this.state.dyearToAdd,
    };
    const response = await axios
      .post("http://localhost:3000/api/Degree", body, config)
      .then(function (response) {
        console.log(response.data);
        self.setState({ degrees: [] });
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  getEmployment = async () => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .get("http://localhost:3000/api/Alumni/" + self.state.userID, config)
      .then(function (response) {
        //******************************************************************* */
        console.log(response.data);
        if (response.data[0].Current_employer == null) {
          response.data[0].Current_employer = "";
        }
        if (response.data[0].Position == null) {
          response.data[0].Position = "";
        }
        self.setState({
          currentEmployment: response.data[0].Current_employer,
          currentPosition: response.data[0].Position,
        });
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  updateEmployment = async () => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var currEmp = this.state.currentEmployment;
    var currPos = this.state.currentPosition;
    if (currEmp == "" || currEmp == undefined) {
      currEmp = null;
    }
    if (currPos == "" || currPos == undefined) {
      currPos = null;
    }
    var body = {
      Current_employer: currEmp,
      Position: currPos,
    };
    const response = await axios
      .put("http://localhost:3000/api/Alumni", body, config)
      .then(function (response) {
        console.log(response.data);
        self.setState({ degrees: [] });
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  componentDidMount = async () => {
    var errorFound = false;
    var user = "";
    var URL = "http://localhost:3000/api/";
    if (sessionStorage.getItem("userUCID") !== "null") {
      URL += "Students/" + sessionStorage.getItem("userUCID");
      await this.setState({
        userType: "UCID",
        userID: parseInt(sessionStorage.getItem("userUCID")),
      });
    } else if (sessionStorage.getItem("userSIN") !== "null") {
      URL += "Instructor/" + sessionStorage.getItem("userSIN");
      await this.setState({
        userType: "SIN",
        userID: parseInt(sessionStorage.getItem("userSIN")),
      });
    } else if (sessionStorage.getItem("userAlumni") !== "null") {
      URL += "Alumni/" + sessionStorage.getItem("userAlumni");
      await this.setState({
        userType: "Alumni_ID",
        userID: parseInt(sessionStorage.getItem("userAlumni")),
      });
    } else if (sessionStorage.getItem("userAdmin") !== "null") {
      URL += "Admin/" + sessionStorage.getItem("userAdmin");
      await this.setState({
        userType: "Admin_ID",
        userID: parseInt(sessionStorage.getItem("userAdmin")),
      });
    } else {
      errorFound = true;
      return;
    }
    await this.getDegrees();
    await this.getEmployment();
  };
  render = () => {
    console.log(this.state.degrees);
    return (
      <div>
        <button
          style={{ display: "block", position: "absolute", left: "10px" }}
          className="btn btn-info"
        >
          <Link to="/profile" style={{ color: "white" }}>
            Back to profile
          </Link>
        </button>
        <hr />
        <h4>Degrees</h4>
        {this.state.degrees.map((elem) => {
          return (
            <div>
              <span style={{ paddingRight: "1%" }}>
                {elem.Degree_title}-{elem.degree_year}
              </span>
              <button
                style={{ marginLeft: "2%" }}
                className="btn btn-danger"
                onClick={async (event) => {
                  await this.delDegree(elem.Degree_title, elem.degree_year);
                  var temp = [];
                  for (const x of this.state.degrees) {
                    if (
                      x.Degree_title != elem.Degree_title &&
                      x.degree_year != elem.degree_year
                    ) {
                      temp.push(x);
                    }
                  }
                  this.setState({ degrees: temp });
                  //   event.preventDefault();
                }}
              >
                delete
              </button>
              <br />
              <br />
            </div>
          );
        })}
        <form
          onSubmit={async (event) => {
            await this.addDegree();
            event.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Degree title"
            onChange={(e) => {
              this.setState({ degreeToAdd: e.target.value });
              e.preventDefault();
            }}
          />
          <input
            type="number"
            min="1900"
            max="2021"
            placeholder="year"
            onChange={(e) => {
              if (e.target.value > 2021) {
                e.target.value = 2021;
              }
              this.setState({ dyearToAdd: e.target.value });
              e.preventDefault();
            }}
          />

          <button
            className="btn btn-primary"
            type="submit"
            style={{ marginLeft: "1%" }}
          >
            Add
          </button>
        </form>
        <hr />
        <h4>Employment</h4>
        <form
          onSubmit={async (event) => {
            await this.updateEmployment();
            event.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Current Employer"
            value={this.state.currentEmployment}
            onChange={(e) => {
              this.setState({ currentEmployment: e.target.value.trim() });
              e.preventDefault();
            }}
          />
          <input
            type="text"
            placeholder="Position"
            value={this.state.currentPosition}
            onChange={(e) => {
              this.setState({ currentPosition: e.target.value.trim() });
              e.preventDefault();
            }}
          />

          <button
            className="btn btn-primary"
            type="submit"
            style={{ marginLeft: "1%" }}
          >
            Update
          </button>
        </form>
      </div>
    );
  };
}

export default EditAlumProfile;
