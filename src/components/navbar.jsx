import { Dropdown } from "bootstrap";
import React, { Component } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainContent from "./maincontent";
import Messenger from "./messenger";
import Profile from "./profile";
import Login from "./login";
import { Route, Routes } from "react-router-dom";
import Courses from "./courses";

class NavBar extends React.Component {
  state = {
    user: "X 1",
  };
  componentDidMount = () => {
    var user = "";
    if (sessionStorage.getItem("userUCID") !== "null") {
      user = "UCID " + sessionStorage.getItem("userUCID");
    } else if (sessionStorage.getItem("userSIN") !== "null") {
      user = "SIN " + sessionStorage.getItem("userSIN");
    } else if (sessionStorage.getItem("userAlumni") !== "null") {
      user = "Alumni_ID " + sessionStorage.getItem("userAlumni");
    } else if (sessionStorage.getItem("userAdmin") !== "null") {
      user = "Admin_ID " + sessionStorage.getItem("userAdmin");
    } else {
      return;
    }
    this.setState({ user: user });
  };
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div
            className="container-fluid"
            style={{ marginLeft: "2%", marginRight: "2%" }}
          >
            {/* <a className="navbar-brand" href="#">
            Profile</a> */}
            <Link to="/profile" className="navbar-brand">
              {" "}
              Profile
            </Link>
            {/* <a className = "navbar-brand" href ="#"><span><Courses/></span> </a> */}

            <NavDropdown title="Courses" className="navbar-brand " id="warning">
              <NavDropdown.Item>
                <Link to="/course"> Example Course</Link>{" "}
              </NavDropdown.Item>
            </NavDropdown>
            {this.state.user.split(" ")[0] == "UCID" ||
            this.state.user.split(" ")[0] == "Alumni_ID" ? (
              <Link to="/messenger" className="navbar-brand">
                {" "}
                Messenger
              </Link>
            ) : (
              <span />
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

export default NavBar;
