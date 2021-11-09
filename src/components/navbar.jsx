import React, { Component } from "react";

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div
          className="container-fluid"
          style={{ marginLeft: "2%", marginRight: "2%" }}
        >
          <a className="navbar-brand" href="#">
            Profile
          </a>
          <a className="navbar-brand" href="#">
            course dropdown{" "}
          </a>

          <a className="navbar-brand" href="#">
            Messenger!{" "}
          </a>
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
