import React, { Component } from 'react';

class NavBar extends React.Component {
    render() { 
        return (<nav className="navbar fixed-top navbar-dark bg-dark">
        <div className="container-fluid" style={{marginLeft: '2%', marginRight:'2%'}}>
          <a className="navbar-brand" href="#">Home</a>
          <a className="navbar-brand" href="#">course 1 </a>
          <a className="navbar-brand" href="#">course 2 </a>
          <a className="navbar-brand" href="#">course 3 </a>
          <a className="navbar-brand" href="#">course 4 </a>
          <a className="navbar-brand" href="#">course 5 </a>
          <a className="navbar-brand" href="#">course 6 </a>
          <a className="navbar-brand" href="#">Messenger </a>
          <a className="navbar-brand" href="#">sign out</a>
          
        </div>
      </nav>);
    }
}
 
export default NavBar;