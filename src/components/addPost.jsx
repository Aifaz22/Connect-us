import React, { Component } from "react";
import axios from "axios";

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posttype: "Question",
      subject: "",
      cname: "cpsc471", //// need to channnnnnnnnnnnnnnnnnnnnnnngggggggggeeeeee
      cyear: "2021",
      cterm: "Fall",
      cdept_id: 1,
    };
  }

  postFeedPost = async () => {
    var body = {
      content: this.state.subject,
      Post_type: this.state.posttype,
      Course_name: this.state.cname,
      Course_term: this.state.cterm,
      Course_year: this.state.cyear,
      Dept_id: this.state.cdept_id,
    };
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var errorFound = false;
    const response = await axios
      .post("http://localhost:3000/api/Feed_post", body, config)
      .then(function (response) {
        console.log(response.data);
        //******************************************************************* */
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  render = () => {
    return (
      <div
        className="col-md-5"
        style={{
          marginTop: "5%",
          paddingRight: "3%",
        }}
      >
        {/* <h1> Course Example info above</h1> */}
        <div className="form-area">
          <h2>Post a discussion </h2>
          <form
            role="form"
            onSubmit={async (event) => {
              console.log("submitting...");
              console.log(this.state.subject);
              console.log(this.state.posttype);
              // await this.sendMessage();
              // updateText();
              await this.postFeedPost();
              event.preventDefault();
              // navigate("/NavBar");
            }}
          >
            <br />
            <div className="form-group" style={{ marginBottom: "3%" }}>
              <select
                defaultValue={"Question"}
                onChange={(event) => {
                  this.setState({ posttype: event.target.value });

                  //console.log(this.state.usertype);
                }}
              >
                <option value="Note">Note</option>
                <option value="Question">Question</option>
              </select>
              {/* <input
                type="text"
                onChange={this.handleTitleChange}
                className="form-control"
                id="title"
                name="title"
                placeholder="Title"
                required
              /> */}
            </div>

            <div className="form-group">
              <textarea
                className="form-control"
                onChange={(e) => this.setState({ subject: e.target.value })}
                type="textarea"
                id="subject"
                placeholder="Subject"
                maxlength="140"
                rows="7"
              ></textarea>
            </div>
            <input
              type="submit"
              value="Add Post"
              disabled={this.state.subject === ""}
            />
          </form>
        </div>
      </div>
    );
  };
}

export default AddPost;
