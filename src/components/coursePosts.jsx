import React, { Component } from "react";
import axios from "axios";
import CommentForm from "./commentForm";
import { Link } from "react-router-dom";

class CoursePosts extends Component {
  state = {
    cname: "cpsc471", //// need to channnnnnnnnnnnnnnnnnnnnnnngggggggggeeeeee
    cyear: "2021",
    cterm: "Fall",
    cdept_id: 1,
    userAuthorID: -1,
    posts: [],
    comments: {},
    showComments: {},
    groupMessengerStatus: 1,
    commentPost: "",
    Ta_ucid: -1,
    ins_sin: -1,
  };
  enabilityCheck = async () => {
    var URL = `http://localhost:3000/api/Course-group/isEnabled/${this.state.cname}/${this.state.cyear}/${this.state.cterm}/${this.state.cdept_id}`;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var self = this;
    const response = await axios
      .get(URL, config)
      .then(function (response) {
        //******************************************************************* */
        console.log(response.data);
        self.setState({
          groupMessengerStatus: response.data[0].Enabled,
        });
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  // /Feed_post/:name/:year/:term/:dept
  getPosts = async () => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .get(
        `http://localhost:3000/api/Feed_post/${self.state.cname}/${self.state.cyear}/${self.state.cterm}/${self.state.cdept_id}`,
        config
      )
      .then(async (response) => {
        //******************************************************************* */
        console.log(response.data);
        self.setState({
          posts: response.data,
        });
        await this.state.posts.map(async (post, index) => {
          await this.getComments(post.Post_id, post.Author_id, index);
        });
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  getComments = async (pid, paid, index) => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .get(`http://localhost:3000/api/Post_comment/${pid}/${paid}`, config)
      .then((response) => {
        //******************************************************************* */
        let comments = this.state.comments;
        comments = { ...comments, [pid]: response.data };
        this.setState({ comments: comments });
        this.setState({
          showComments: { ...this.state.showComments, [pid]: false },
        });
        console.log(self.state.comments[pid].length);
        console.log("pid: " + typeof pid);
        // console.log(self.state.posts[index].comments.length);
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  toggleGroup = async () => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var toggleVal = false;
    if (this.state.groupMessengerStatus === 0) {
      toggleVal = true;
    } else {
      toggleVal = false;
    }
    var body = {
      toggleVal: toggleVal,
    };
    // /Course-group/:name/:year/:term/:D_id/:toggleVal
    var URL = `http://localhost:3000/api/Course-group/${this.state.cname}/${this.state.cyear}/${this.state.cterm}/${this.state.cdept_id}`;
    const response = await axios
      .put(URL, body, config)
      .then((response) => {
        //******************************************************************* */
        console.log(response.data);
        self.setState({ groupMessengerStatus: toggleVal });
        // console.log(self.state.posts[index].comments.length);
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  toggleComment = (pid) => {
    this.setState({
      showComments: {
        ...this.state.showComments,
        [pid]: !this.state.showComments[pid],
      },
    });
    console.log(this.state.showComments[pid]);
  };
  delPost = async (pid) => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .delete("http://localhost:3000/api/Feed_post/" + pid, config)
      .then((response) => {
        //******************************************************************* */
        console.log(response.data);
        var temp = [];
        for (const post of this.state.posts) {
          if (post.Post_id !== pid) {
            temp.push(post);
          }
        }
        this.setState({ posts: temp });
        // console.log(self.state.posts[index].comments.length);
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  delComment = async (cid, pid) => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .delete("http://localhost:3000/api/Post_comment/" + cid, config)
      .then((response) => {
        //******************************************************************* */
        console.log(response.data);
        var temp = [];
        for (const comm of this.state.comments[pid]) {
          if (comm.Comment_id !== cid) {
            temp.push(comm);
          }
        }
        let comments = this.state.comments;
        comments = { ...comments, [pid]: temp };
        this.setState({ comments: comments });
        // this.state.comments[pid] = temp;
        // this.setState({ comments: temp });
        // console.log(self.state.posts[index].comments.length);
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  getAuthorId = async () => {
    var URL = "http://localhost:3000/api/Author/";
    if (sessionStorage.getItem("userUCID") !== "null") {
      URL += sessionStorage.getItem("userUCID") + "/-1";
    } else if (sessionStorage.getItem("userSIN") !== "null") {
      URL += "-1/" + sessionStorage.getItem("userSIN");
    } else {
      return;
    }
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .get(URL, config)
      .then((response) => {
        //******************************************************************* */
        console.log(response.data);
        self.setState({ userAuthorID: response.data[0].Author_id });
        // console.log(self.state.posts[index].comments.length);
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  getInstructors = async () => {
    var URL = `http://localhost:3000/api/Course/instructors/${this.state.cname}/${this.state.cyear}/${this.state.cterm}/${this.state.cdept_id}`;
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .get(URL, config)
      .then((response) => {
        //******************************************************************* */
        console.log(response.data);
        self.setState({
          Ta_ucid: response.data[0].TA_UCID,
          ins_sin: response.data[0].SIN,
        });
        // console.log(self.state.posts[index].comments.length);
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  componentDidMount = async () => {
    await this.getPosts();
    await this.enabilityCheck();
    await this.getAuthorId();
    await this.getInstructors();
    this.state.posts.map((p) => console.log(this.state.comments[p.Post_id]));
  };
  render = () => {
    console.log(this.state);
    return (
      <section style={{ width: "100%" }}>
        <br></br>
        {sessionStorage.getItem("userUCID") !== "null" &&
          parseInt(sessionStorage.getItem("userUCID")) !=
            this.state.Ta_ucid && (
            <button className="btn btn-primary">
              <Link to="/group-messenger" style={{ color: "white" }}>
                Group Messenger
              </Link>
            </button>
          )}
        {((sessionStorage.getItem("userSIN") !== "null" &&
          parseInt(sessionStorage.getItem("userSIN")) == this.state.ins_sin) ||
          (sessionStorage.getItem("userUCID") !== "null" &&
            parseInt(sessionStorage.getItem("userUCID")) ==
              this.state.Ta_ucid)) && (
          <div>
            Current Status:{" "}
            {this.state.groupMessengerStatus == 0 ? (
              <b>Disabled</b>
            ) : (
              <b>Enabled</b>
            )}
            <button
              style={{ marginLeft: "3%" }}
              onClick={(e) => {
                this.toggleGroup();
              }}
              className="btn btn-warning"
            >
              Toggle Group Messenger
            </button>
          </div>
        )}
        <h5 style={{ marginTop: "2%" }}>
          {this.state.cname}-{this.state.cterm}
          {this.state.cyear} Feed
        </h5>

        <ul
          style={{
            paddingRight: "1%",
            width: "85%",
            float: "left",
            listStyle: "none",
            height: "45%",
            marginTop: "3%",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            marginBottom: "3px",
          }}
        >
          {this.state.posts.map((post, index) => {
            console.log(Array.isArray(this.state.comments[post.Post_id]));
            if (this.state.comments[post.Post_id] !== undefined)
              console.log(this.state.comments[post.Post_id].length);

            return (
              <li
                style={{
                  wordWrap: "break-word",
                  border: " 1px solid black",
                  marginTop: "3%",
                  textAlign: "left",
                }}
                // onClick={}
              >
                <div
                  className="PostElement"
                  style={{ fontSize: "25px", marginLeft: "1%" }}
                >
                  {post.Post_type}
                  {this.state.userAuthorID == post.Author_id && (
                    <button
                      style={{
                        fontSize: "13px",
                        right: "70%",
                      }}
                      onClick={(e) => {
                        this.delPost(post.Post_id);
                      }}
                      className="btn btn-danger"
                    >
                      Delete Post
                    </button>
                  )}
                  <p style={{ fontSize: "13px", marginBottom: "-3%" }}>
                    {" "}
                    Author: {post.Fname} {post.Lname}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      marginBottom: "-4%",
                      marginTop: "3%",
                    }}
                  >
                    {" "}
                    Posted: {post.creationTime}
                  </p>
                  <br />
                  <div
                    className="PostText"
                    style={{
                      wordWrap: "break-word",
                      border: "2px solid blue",
                      background: "",
                      marginLeft: "-1%",
                      marginTop: "0.2%",
                      textAlign: "left",
                      fontSize: "17px",
                      paddingLeft: "100px",
                    }}
                  >
                    {post.content}
                  </div>
                </div>
                <button
                  style={{ marginBottom: "0%" }}
                  onClick={() => this.toggleComment(post.Post_id)}
                  className="btn btn-info"
                >
                  Toggle Comments:{" "}
                  {this.state.comments[post.Post_id] !== undefined ? (
                    this.state.comments[post.Post_id].length
                  ) : (
                    <i>0</i>
                  )}
                </button>
                {this.state.showComments[post.Post_id] && (
                  <div>
                    {this.state.comments[post.Post_id] !== undefined ? (
                      <div>
                        <CommentForm pid={post.Post_id} paid={post.Author_id} />
                        <hr />
                        {this.state.comments[post.Post_id].map((comment) => {
                          return (
                            <div
                              style={{
                                fontSize: "13px",
                              }}
                            >
                              {comment.Fname} {comment.Lname}
                              {comment.creationTime.split("T")[0]}{" "}
                              {comment.Author_id == this.state.userAuthorID && (
                                <button
                                  className="btn btn-danger"
                                  onClick={(e) =>
                                    this.delComment(
                                      comment.Comment_id,
                                      post.Post_id
                                    )
                                  }
                                >
                                  Delete
                                </button>
                              )}
                              <h6>{comment.Content}</h6>
                              <hr />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    );
  };
}

export default CoursePosts;
