import { Dropdown } from "bootstrap";
import React, { Component } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainContent from "./maincontent";
import Messenger from "./messenger";
import Profile from "./profile";
import Login from "./login";
import { Route, Routes, useParams } from "react-router-dom";
import Courses from "./courses";

class NavBar extends React.Component {
  state = {
    user: "",
  };
  componentDidMount = () => {
    var user = "";
    if (sessionStorage.getItem("userUCID") !== "null") {
      user = "UCID " + sessionStorage.getItem("userUCID");
      this.setState({ user: user });
    } else if (sessionStorage.getItem("userSIN") !== "null") {
      user = "SIN " + sessionStorage.getItem("userSIN");
      this.setState({ user: user });
    } else if (sessionStorage.getItem("userAlumni") !== "null") {
      user = "Alumni_ID " + sessionStorage.getItem("userAlumni");
      this.setState({ user: user });
    } else if (sessionStorage.getItem("userAdmin") !== "null") {
      user = "Admin_ID " + sessionStorage.getItem("userAdmin");
      this.setState({ user: user });
    } else {
      return;
    }
  };
  render() {
    console.log(this.state.user);
    // var ucidlink = "/profile/" + this.state.user.split(" ")[1] + "/null/null";
    // var sinlink = "/profile/null/" + this.state.user.split(" ")[1] + "/null";
    // var alumlink = "/profile/null/null/" + this.state.user.split(" ")[1];
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div
            className="container-fluid"
            style={{ marginLeft: "2%", marginRight: "2%" }}
          >
            {/* <a className="navbar-brand" href="#">
            Profile</a> */}
            {/* {this.state.user.split(" ")[0] == "UCID" && (
              <Link to={ucidlink} className="navbar-brand">
                {" "}
                Profile
              </Link>
            )}
            {this.state.user.split(" ")[0] == "SIN" && (
              <Link to={sinlink} className="navbar-brand">
                {" "}
                Profile
              </Link>
            )}
            {this.state.user.split(" ")[0] == "Alumni_ID" && (
              <Link to={alumlink} className="navbar-brand">
                {" "}
                Profile
              </Link>
            )} */}
            <Link to="/profile" className="navbar-brand">
              {" "}
              Profile
            </Link>
            {/* <a className = "navbar-brand" href ="#"><span><Courses/></span> </a> */}
            {(this.state.user.split(" ")[0] == "UCID" ||
              this.state.user.split(" ")[0] == "SIN") && (
              <NavDropdown
                title="Courses"
                className="navbar-brand "
                id="warning"
              >
                <NavDropdown.Item>
                  <Link to="/course"> cpsc471 Fall2021</Link>{" "}
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {(this.state.user.split(" ")[0] == "UCID" ||
              this.state.user.split(" ")[0] == "Alumni_ID") && (
              <Link to="/messenger" className="navbar-brand">
                {" "}
                Messenger
              </Link>
            )}

            {/* <a className="navbar-brand" href="#">
            Messenger!{" "}
          </a> */}
            <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <Link
              to="/"
              className="navbar-brand border border-danger"
              onClick={() => {
                sessionStorage.clear();
                updateText();
                this.setState({ user: "" });
              }}
            >
              Sign Out
            </Link>
          </div>
        </nav>

        <div>
          {/* <Routes>
    <Route path ="/" element ={<Profile/>}/>
    <Route path ="/messenger" element ={<Messenger/>}/>
    <Route path = "/login" element ={<Login/>}/>
    </Routes> */}
        </div>
      </div>
    );
  }
}
const updateText = () => {
  this.setState({ something: {} });
};
export default NavBar;
