import React, { Component } from "react";
import { Link,  } from "react-router-dom";
import MainContent from "./maincontent";
import Messenger from "./messenger";
import Profile from "./profile";



class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div
          className="container-fluid"
          style={{ marginLeft: "2%", marginRight: "2%" }}
        >
          {/* <a className="navbar-brand" href="#">
            Profile</a> */}
            <Link to ="/profile" className="navbar-brand"> Profile</Link>
           
          <a className="navbar-brand" href="#">
            course dropdown{" "}
          </a>
          <Link to ="/" className="navbar-brand"> Messenger!</Link>
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
          <a className="navbar-brand" href="#">
            sign out
          </a>
        </div>
      </nav>
    );
  }
}


export default NavBar;
