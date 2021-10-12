import React, { Component } from 'react';

class Courses extends React.Component {
    state ={
        current : ['cpsc471', 'math211', 'cspc526', 'seng500']
    }
    render() { 
        return (
            <ul className="list-group list-group-flush">
                {
                this.state.current.map(elem =>
                    <li className="list-group-item">{elem}</li>
                )
                }
            </ul>
            
        );
    }
}
 
export default Courses;