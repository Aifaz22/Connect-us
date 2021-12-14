import React, { Component } from "react";
import Courses from "./courses";
import pictureUofC from "../UofCLogo.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
class Profile extends React.Component {
  state = {
    id: "N 2",
    name: "",
    currentCourses: [],
    allCourses: [],
    taCourses: [],
    Major: [],
    Minor: [],
    Degrees: [],
    Research: [],
    currentEmployment: "",
    currentPosition: "",
    inProgress: 1,
    sinDepartment: "",
  };
  getUser = async () => {
    var body = {};
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var user = "";
    var URL = "http://localhost:3000/api/";
    if (sessionStorage.getItem("userUCID") !== "null") {
      URL += "Students/" + sessionStorage.getItem("userUCID");
      user = "UCID " + sessionStorage.getItem("userUCID");
      this.setState({ inProgress: 1 });
    } else if (sessionStorage.getItem("userSIN") !== "null") {
      URL += "Instructor/" + sessionStorage.getItem("userSIN");
      user = "SIN " + sessionStorage.getItem("userSIN");
      this.setState({ inProgress: -1 });
    } else if (sessionStorage.getItem("userAlumni") !== "null") {
      URL += "Alumni/" + sessionStorage.getItem("userAlumni");
      user = "Alumni_ID " + sessionStorage.getItem("userAlumni");
      this.setState({ inProgress: 0 });
    } else if (sessionStorage.getItem("userAdmin") !== "null") {
      URL += "Admin/" + sessionStorage.getItem("userAdmin");
      user = "Admin_ID " + sessionStorage.getItem("userAdmin");
      this.setState({ inProgress: -1 });
    } else {
      errorFound = true;
      return;
    }

    console.log(URL);
    var self = this;
    const response = await axios
      .get(URL, config)
      .then(function (response) {
        //******************************************************************* */
        console.log(response.data);
        self.setState({
          name: response.data[0].Fname + " " + response.data[0].Lname,
          sinDepartment: response.data[0].Dname,
          currentEmployment: response.data[0].Current_employer,
          currentPosition: response.data[0].Position,
        });
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
    self.setState({ id: user });
    var userArr = user.split(" ");
    if (userArr[0] === "UCID") {
      //is student
      //get major
      const response2 = await axios
        .get("http://localhost:3000/api/Majors_in/" + userArr[1], config)
        .then(function (response2) {
          //******************************************************************* */
          console.log(response2.data);
          self.setState({
            Major: response2.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          // console.log("XXXXXXXXXXXXXXXXXXXXX");
          errorFound = true;
        });
      //get minor
      const response3 = await axios
        .get("http://localhost:3000/api/Minors_in/" + userArr[1], config)
        .then(function (response3) {
          //******************************************************************* */
          console.log(response3.data);
          self.setState({
            Minor: response3.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          // console.log("XXXXXXXXXXXXXXXXXXXXX");
          errorFound = true;
        });
      //get current courses
      const response4 = await axios
        .get(
          "http://localhost:3000/api/Course/currentCourses/" + userArr[1],
          config
        )
        .then(function (response4) {
          //******************************************************************* */
          console.log(response4.data);
          self.setState({
            currentCourses: response4.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          // console.log("XXXXXXXXXXXXXXXXXXXXX");
          errorFound = true;
        });
      //get all courses
      const response5 = await axios
        .get(
          "http://localhost:3000/api/Course/allCourses/" + userArr[1],
          config
        )
        .then(function (response5) {
          //******************************************************************* */
          console.log(response5.data);
          self.setState({
            allCourses: response5.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          // console.log("XXXXXXXXXXXXXXXXXXXXX");
          errorFound = true;
        });
      //get TA course
      const response6 = await axios
        .get(
          "http://localhost:3000/api/Course/instructors/" +
            userArr[1] +
            "/null",
          config
        )
        .then(function (response6) {
          //******************************************************************* */
          console.log(response6.data);
          self.setState({
            taCourses: response6.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          // console.log("XXXXXXXXXXXXXXXXXXXXX");
          errorFound = true;
        });
    } else if (userArr[0] === "SIN") {
      //is instructor
      //get research /Research/:sin
      const response2 = await axios
        .get("http://localhost:3000/api/Research/" + userArr[1], config)
        .then(function (response2) {
          //******************************************************************* */
          console.log(response2.data);
          self.setState({
            Research: response2.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          // console.log("XXXXXXXXXXXXXXXXXXXXX");
          errorFound = true;
        });
      //current Teaching /Course/instructors/:UCID/:SIN
      const response3 = await axios
        .get(
          "http://localhost:3000/api/Course/instructors/null/" + userArr[1],
          config
        )
        .then(function (response3) {
          //******************************************************************* */
          console.log(response3.data);
          self.setState({
            allCourses: response3.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          // console.log("XXXXXXXXXXXXXXXXXXXXX");
          errorFound = true;
        });
    } else if (userArr[0] === "Alumni_ID") {
      //is Alumni
      // get all completed courses
      const response2 = await axios
        .get("http://localhost:3000/api/Completed/" + userArr[1], config)
        .then(function (response2) {
          //******************************************************************* */
          console.log(response2.data);
          self.setState({
            allCourses: response2.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          // console.log("XXXXXXXXXXXXXXXXXXXXX");
          errorFound = true;
        });

      // get degrees
      const response3 = await axios
        .get("http://localhost:3000/api/Degree/" + userArr[1], config)
        .then(function (response3) {
          //******************************************************************* */
          console.log(response3.data);
          self.setState({
            Degrees: response3.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          // console.log("XXXXXXXXXXXXXXXXXXXXX");
          errorFound = true;
        });
    } else {
      //is Admin :)
    }
  };
  componentDidMount = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    //use for other profiles******************
    console.log("=========================================================");
    console.log(queryParams.get("id"));
    console.log("=========================================================");
    this.setState({
      id: "N 2",
      name: "",
      currentCourses: [],
      allCourses: [],
      taCourses: [],
      Major: [],
      Minor: [],
      Degrees: [],
      Research: [],
      currentEmployment: "",
      currentPosition: "",
      inProgress: 1,
      sinDepartment: "",
    });
    await this.getUser();
  };
  render() {
    console.log(this.state.id);
    console.log(this.state.currentEmployment);
    return (
      <React.Fragment>
        <div>
          {/* test */}
          <view style={{ flex: 1, flexDirection: "column", marginRight: "3%" }}>
            <button style={{ right: "0%" }}>
              <Link to="/messenger">Message</Link>
            </button>
            <h2>{this.state.name}</h2>

            <img style={{ height: "15%", width: "15%" }} src={pictureUofC} />
            {this.state.inProgress >= 0 ? (
              <h4>
                Degree -
                {this.state.inProgress === 1 ? (
                  <b> in progress</b>
                ) : (
                  <div>
                    <b> completed</b>
                    {this.state.currentEmployment !== null && (
                      <div>
                        <h5>
                          {this.state.currentPosition !== null ? (
                            <i>{this.state.currentPosition}</i>
                          ) : (
                            <i>Works</i>
                          )}{" "}
                          @ {this.state.currentEmployment}
                        </h5>
                      </div>
                    )}
                  </div>
                )}
              </h4>
            ) : (
              <h4> Instructor in {this.state.sinDepartment} department</h4>
            )}
            {this.state.id.split(" ")[0] === "UCID" && (
              <h2 style={{ marginTop: "1.5%" }}>
                Major:{" "}
                {this.state.Major.map((elem) => (
                  <h4>{elem.Dname} </h4>
                ))}
                Minor:
                {this.state.Minor.map((elem) => (
                  <h4>{elem.Dname} </h4>
                ))}
              </h2>
            )}
            {/* {this.state.Major} */}
            {this.state.id.split(" ")[0] === "UCID" &&
              this.state.taCourses.length > 0 && (
                <h2
                  style={{
                    float: "right",
                    marginRight: "5%",
                    marginTop: "-5%",
                  }}
                >
                  TA of Courses:
                  <span
                    style={{
                      clear: "both",
                      fontFamily: "Titillium Web",
                      fontWeight: "700",
                      marginTop: "15%",
                      fontSize: "20px",
                    }}
                  >
                    <ul className="list-group list-group-flush">
                      {this.state.taCourses.map((elem) => (
                        <li className="list-group-item">
                          {elem.Course_name} {elem.Course_term}
                          {elem.Course_year}{" "}
                        </li>
                      ))}
                    </ul>
                  </span>
                </h2>
              )}
            {/* {this.state.id.split(" ")[0] === "Alumni_ID" &&
              this.state.currentEmployment !== null && (
                <h2
                  style={{
                    float: "right",
                    marginRight: "5%",
                    marginTop: "-5%",
                  }}
                >
                  Employment:
                  <span
                    style={{
                      clear: "both",
                      fontFamily: "Titillium Web",
                      fontWeight: "700",
                      marginTop: "15%",
                      fontSize: "20px",
                    }}
                  >
                    {this.state.currentEmployment} - {this.state.position}
                  </span>
                </h2>
              )} */}
            <h2 style={{ float: "right", marginRight: "5%", marginTop: "-5%" }}>
              All Courses
              <span
                style={{
                  clear: "left",
                  fontFamily: "Titillium Web",
                  fontWeight: "700",
                  marginTop: "15%",
                  fontSize: "20px",
                }}
              >
                <ul className="list-group list-group-flush">
                  {this.state.allCourses.map((elem) => (
                    <li className="list-group-item">
                      {elem.Course_name} {elem.Course_term}
                      {elem.Course_year}{" "}
                    </li>
                  ))}
                </ul>
              </span>
            </h2>
            {this.state.id.split(" ")[0] === "UCID" && (
              <div
                style={{
                  position: "relative",
                  marginRight: "10%",
                  marginTop: "-5%",
                  marginLeft: "5%",
                  float: "left",
                }}
              >
                <h2>
                  Enrolled Courses
                  <span
                    style={{
                      clear: "left",
                      fontFamily: "Titillium Web",
                      fontWeight: "700",
                      marginTop: "15%",
                      fontSize: "20px",
                    }}
                  >
                    <ul className="list-group list-group-flush">
                      {this.state.currentCourses.map((elem) => (
                        <li className="list-group-item">
                          {elem.Course_name} {elem.Course_term}
                          {elem.Course_year}{" "}
                        </li>
                      ))}
                    </ul>
                  </span>
                </h2>
              </div>
            )}
            {this.state.id.split(" ")[0] === "SIN" && (
              <div
                style={{
                  position: "relative",
                  marginRight: "10%",
                  marginTop: "-5%",
                  marginLeft: "5%",
                  float: "left",
                }}
              >
                <h2>
                  Research Areas
                  <span
                    style={{
                      clear: "left",
                      fontFamily: "Titillium Web",
                      fontWeight: "700",
                      marginTop: "15%",
                      fontSize: "20px",
                    }}
                  >
                    <ul className="list-group list-group-flush">
                      {this.state.Research.map((elem) => (
                        <li className="list-group-item">
                          {elem.Research_area}{" "}
                        </li>
                      ))}
                    </ul>
                  </span>
                </h2>
              </div>
            )}
            {this.state.id.split(" ")[0] === "Alumni_ID" && (
              <div
                style={{
                  position: "relative",
                  marginRight: "10%",
                  marginTop: "-5%",
                  marginLeft: "5%",
                  float: "left",
                }}
              >
                <h2>
                  Degrees
                  <span
                    style={{
                      clear: "left",
                      fontFamily: "Titillium Web",
                      fontWeight: "700",
                      marginTop: "15%",
                      fontSize: "20px",
                    }}
                  >
                    <ul className="list-group list-group-flush">
                      {this.state.Degrees.map((elem) => (
                        <li className="list-group-item">
                          {elem.Degree_title}-{elem.degree_year}{" "}
                        </li>
                      ))}
                    </ul>
                  </span>
                </h2>
              </div>
            )}
          </view>
        </div>

        {/* <button className="btn btn-primary">Connect</button> */}
        <br />

        {/* <h4 style={{ float: "left" }}>current courses</h4>
        <span style={{ float: "left", clear: "left", fontFamily: "Titillium Web", fontWeight: "700", fontSize: "1em"}}>
          <Courses />
        </span> */}
      </React.Fragment>
    );
  }
}

export default Profile;
