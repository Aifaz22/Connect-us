import React, { Component } from "react";
import axios from "axios";
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Post_comment: "",
    };
  }

  postComment = async () => {
    var body = {
      content: this.state.Post_comment,
      P_Author_id: this.props.paid,
      Post_id: this.props.pid,
    };
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var errorFound = false;
    const response = await axios
      .post("http://localhost:3000/api/Post_comment", body, config)
      .then(function (response) {
        //******************************************************************* */
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  componentDidMount = () => {
    console.log(this.props.pid);
    console.log(this.props.paid);
  };
  render = () => {
    return (
      <div>
        <form onSubmit={(e) => this.postComment()}>
          <input
            type="text"
            placeholder="Comment"
            style={{ width: "85%" }}
            onChange={(e) => {
              this.setState({ Post_comment: e.target.value });
            }}
          ></input>
          <button
            type="submit"
            style={{ width: "15%" }}
            className="btn btn-primary"
          >
            Post
          </button>
        </form>{" "}
      </div>
    );
  };
}

export default CommentForm;
