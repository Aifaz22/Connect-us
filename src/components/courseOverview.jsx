import React, { Component } from "react";
import Course from "./courses"
import CoursePosts from "./coursePosts"
import addPost from "./addPost"
class CourseOverview extends React.Component{


    render(){
    return(
        <div>
        <p>Hello</p>
        <CoursePosts/>
        </div>

    );
    }

    
}
export default CourseOverview;