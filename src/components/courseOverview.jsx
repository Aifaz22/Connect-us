import React, { Component } from "react";
import Course from "./courses"
import CoursePosts from "./coursePosts"
import AddPost from "./addPost"
class CourseOverview extends React.Component{


    render(){
    return(
        <div style ={{display: "flex", flexDirection: "row"}}>
        {/* <p>Hello</p> */}
        <CoursePosts style ={{float: "left", flex:"3"}} />
       

        <AddPost style ={{float: "right"}} />
        
        {/* <AddPost style ={{float: "right"}} /> */}
        </div>

    );
    }

    
}
export default CourseOverview;