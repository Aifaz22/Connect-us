import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "",
      userID: "",
      oldMajor: [],
      major: [],
      oldMinor: [],
      minor: [],
      department: [],
      majorChange: false,
      minorChange: false,
    };
  }

  getStudentDet = async () => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .get("http://localhost:3000/api/Department", config)
      .then(function (response) {
        //******************************************************************* */
        console.log(response.data);
        self.setState({
          department: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
    const response2 = await axios
      .get("http://localhost:3000/api/Majors_in/" + self.state.userID, config)
      .then(function (response2) {
        //******************************************************************* */
        console.log(response2.data);
        self.setState({
          //   major: response2.data,
          oldMajor: response2.data,
        });
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
    //get minor
    const response3 = await axios
      .get("http://localhost:3000/api/Minors_in/" + self.state.userID, config)
      .then(function (response3) {
        //******************************************************************* */
        console.log(response3.data);
        self.setState({
          //   minor: response3.data,
          oldMinor: response3.data,
        });
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  deleteMajors = async () => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // delete all majors and minors of student
    if (this.state.majorChange) {
      console.log("deleting majors");
      //if major changed
      for (const maj of this.state.oldMajor) {
        const body = {
          UCID: parseInt(this.state.userID),
          Dept_id: parseInt(maj.Dept_id),
        };
        console.log(body);
        const response = await axios
          .delete(
            "http://localhost:3000/api/Majors_in/" +
              body.UCID +
              "/" +
              body.Dept_id,
            config
          )
          .then(function (response) {
            //******************************************************************* */
            console.log(response.data);
            //   self.setState({
            //     department: response.data,
            //   });
          })
          .catch(function (error) {
            console.log(error);
            // console.log("XXXXXXXXXXXXXXXXXXXXX");
            errorFound = true;
          });
      }
    }
  };
  addMajors = async () => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    //add new majors and minors
    if (this.state.majorChange) {
      console.log("adding majors");
      //if major changed
      for (const maj of this.state.major) {
        const body = {
          UCID: this.state.userID,
          Dept_id: maj,
        };
        console.log(body);
        const response = await axios
          .post("http://localhost:3000/api/Majors_in", body, config)
          .then(function (response) {
            //******************************************************************* */
            console.log(response.data);
            //   self.setState({
            //     department: response.data,
            //   });
          })
          .catch(function (error) {
            console.log(error);
            // console.log("XXXXXXXXXXXXXXXXXXXXX");
            errorFound = true;
          });
      }
    }
  };
  deleteMinors = async () => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if (this.state.minorChange) {
      console.log("deleting minors");

      for (const maj of this.state.oldMinor) {
        const body = {
          UCID: parseInt(this.state.userID),
          Dept_id: parseInt(maj.Dept_id),
        };
        console.log("body");
        console.log(body);
        const response = await axios
          .delete(
            "http://localhost:3000/api/Minors_in/" +
              body.UCID +
              "/" +
              body.Dept_id,
            config
          )
          .then(function (response) {
            //******************************************************************* */
            console.log(response.data);
            //   self.setState({
            //     department: response.data,
            //   });
          })
          .catch(function (error) {
            console.log(error);
            // console.log("XXXXXXXXXXXXXXXXXXXXX");
            errorFound = true;
          });
      }
    }
  };
  addMinors = async () => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if (this.state.minorChange) {
      var noUpdateNeeded = false;
      for (const m of this.state.minor) {
        if (m === "-1") {
          console.log("not adding minors");

          noUpdateNeeded = true;
          break;
        }
      }
      if (noUpdateNeeded === false) {
        console.log("adding minors");

        for (const maj of this.state.minor) {
          const body = {
            UCID: this.state.userID,
            Dept_id: parseInt(maj),
          };
          console.log(body);
          const response = await axios
            .post("http://localhost:3000/api/Minors_in", body, config)
            .then(function (response) {
              //******************************************************************* */
              console.log(response.data);
              //   self.setState({
              //     department: response.data,
              //   });
            })
            .catch(function (error) {
              console.log(error);
              // console.log("XXXXXXXXXXXXXXXXXXXXX");
              errorFound = true;
            });
        }
      }
    }
  };
  updatestudent = async () => {
    await this.deleteMajors();
    await this.addMajors();
    await this.deleteMinors();
    await this.addMinors();
  };
  componentDidMount = async () => {
    var errorFound = false;
    var user = "";
    var URL = "http://localhost:3000/api/";
    if (sessionStorage.getItem("userUCID") !== "null") {
      URL += "Students/" + sessionStorage.getItem("userUCID");
      this.setState({
        userType: "UCID",
        userID: parseInt(sessionStorage.getItem("userUCID")),
      });
      await this.getStudentDet();
    } else if (sessionStorage.getItem("userSIN") !== "null") {
      URL += "Instructor/" + sessionStorage.getItem("userSIN");
      this.setState({
        userType: "SIN",
        userID: parseInt(sessionStorage.getItem("userSIN")),
      });
    } else if (sessionStorage.getItem("userAlumni") !== "null") {
      URL += "Alumni/" + sessionStorage.getItem("userAlumni");
      this.setState({
        userType: "Alumni_ID",
        userID: parseInt(sessionStorage.getItem("userAlumni")),
      });
    } else if (sessionStorage.getItem("userAdmin") !== "null") {
      URL += "Admin/" + sessionStorage.getItem("userAdmin");
      this.setState({
        userType: "Admin_ID",
        userID: parseInt(sessionStorage.getItem("userAdmin")),
      });
    } else {
      errorFound = true;
      return;
    }
  };
  render = () => {
    console.log(this.state.major);
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
        PRESS CTRL key +Submit to update your profile (you may close the other
        opened tab)
        <form
          onSubmit={async (event) => {
            // var token = sessionStorage.getItem("token");
            // const config = {
            //   headers: { Authorization: `Bearer ${token}` },
            // };
            // const body = { UCID: 23, Dept_id: 2 };
            // const response = await axios
            //   .delete(
            //     "http://localhost:3000/api/Minors_in/" +
            //       body.UCID +
            //       "/" +
            //       body.Dept_id,
            //     config
            //   )
            //   .then(function (response) {
            //     //******************************************************************* */
            //     console.log(response.data);
            //     //   self.setState({
            //     //     department: response.data,
            //     //   });
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //     // console.log("XXXXXXXXXXXXXXXXXXXXX");
            //     // errorFound = true;
            //   });
            await this.updatestudent();
            event.preventDefault();
          }}
        >
          <label>
            Major
            <br />
            {this.state.department !== [] ? (
              <select
                multiple
                onChange={(e) => {
                  const options = e.target.options;
                  //   const selectedOptions = [];
                  const selectedValues = [];

                  for (let i = 0; i < options.length; i++) {
                    if (options[i].selected) {
                      //   selectedOptions.push(options[i]);
                      selectedValues.push(options[i].value);
                    }
                  }
                  console.log(selectedValues);
                  this.setState({
                    major: selectedValues,
                    majorChange: true,
                  });
                }}
              >
                {this.state.majorChange === true ? (
                  <React.Fragment>
                    {this.state.department.map((dept, index) => {
                      //   var found = false;
                      for (const maj of this.state.major) {
                        if (maj.Dept_id === dept.Dept_id) {
                          return (
                            <option value={dept.Dept_id} selected>
                              {dept.Dname}
                            </option>
                          );
                        }
                      }
                      return <option value={dept.Dept_id}>{dept.Dname}</option>;
                    })}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {this.state.department.map((dept, index) => {
                      //   var found = false;
                      console.log(dept);
                      for (const maj of this.state.oldMajor) {
                        if (maj.Dept_id === dept.Dept_id) {
                          console.log(this.state.majorChange);
                          return (
                            <option value={dept.Dept_id} selected>
                              {dept.Dname}
                            </option>
                          );
                        }
                      }
                      return <option value={dept.Dept_id}>{dept.Dname}</option>;
                    })}
                  </React.Fragment>
                )}
              </select>
            ) : (
              <select multiple>
                {" "}
                <option value="1">WOW</option>{" "}
              </select>
            )}
          </label>
          <hr />
          <label>
            Minor
            <div style={{ background: "yellow" }}>
              NOTE: if no minor is one of the selected values.. only "No Minor"
              option will be considered
            </div>
            <br />
            {this.state.department !== [] ? (
              <select
                multiple
                onChange={(e) => {
                  const options = e.target.options;
                  //   const selectedOptions = [];
                  const selectedValues = [];

                  for (let i = 0; i < options.length; i++) {
                    if (options[i].selected) {
                      //   selectedOptions.push(options[i]);
                      selectedValues.push(options[i].value);
                    }
                  }
                  console.log(selectedValues);
                  this.setState({
                    minor: selectedValues,
                    minorChange: true,
                  });
                }}
              >
                {this.state.minor === [] ? (
                  <option value="-1" selected>
                    No Minor
                  </option>
                ) : (
                  <option value="-1">No Minor</option>
                )}
                {this.state.minorChange === true ? (
                  <React.Fragment>
                    {this.state.department.map((dept, index) => {
                      //   var found = false;
                      for (const maj of this.state.minor) {
                        if (maj.Dept_id === dept.Dept_id) {
                          return (
                            <option value={dept.Dept_id} selected>
                              {dept.Dname}
                            </option>
                          );
                        }
                      }
                      return <option value={dept.Dept_id}>{dept.Dname}</option>;
                    })}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {this.state.department.map((dept, index) => {
                      //   var found = false;
                      console.log(dept);
                      for (const maj of this.state.oldMinor) {
                        if (maj.Dept_id === dept.Dept_id) {
                          console.log(this.state.minorChange);
                          return (
                            <option value={dept.Dept_id} selected>
                              {dept.Dname}
                            </option>
                          );
                        }
                      }
                      return <option value={dept.Dept_id}>{dept.Dname}</option>;
                    })}
                  </React.Fragment>
                )}
              </select>
            ) : (
              <select multiple>{/* <option value="1">WOW</option> */}</select>
            )}
          </label>
          <hr />
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </form>
      </div>
    );
  };
}

export default EditProfile;
