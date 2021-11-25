import React, { Component } from "react";



class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.state = {
          title:'',
          subject:''
        };
      }

     handleTitleChange(e){
        this.setState({title:e.target.value})
    }
      handleSubjectChange(e){
        this.setState({body:e.target.value})
    }
    
    render() {
      return (
        <div className="col-md-5">
          <div className="form-area">  
              <form role="form">
              <br styles="clear:both" />
                <div className="form-group">
                  <input type="text" onChange ={this.handleTitleChange} className="form-control" id="title" name="title" placeholder="Title" required />
                </div>
                
                <div className="form-group">
                <textarea className="form-control" onChange ={this.handleSubjectChange} type="textarea" id="subject" placeholder="Subject" maxlength="140" rows="7"></textarea>
                </div>
                   
              <button type="button" id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
              </form>
          </div>
        </div>
      )
    }
}

export default AddPost;