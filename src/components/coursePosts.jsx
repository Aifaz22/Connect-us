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
    /*
    Author_id: 14
    Course_name: "cpsc471"
    Course_term: "Fall"
    Course_year: 2021
    Dept_id: 1
    Fname: "Sergio"
    Lname: "Ramos"
    Post_id: 4
    Post_type: "Note"
    content: "This is test post 2"
    creationTime: "2021-11-25T08:13:14.000Z"
    */
    posts: [],
    comments: {},
    showComments: {},
    commentPost: "",
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

  toggleComment = (pid) => {
    this.setState({
      showComments: {
        ...this.state.showComments,
        [pid]: !this.state.showComments[pid],
      },
    });
    console.log(this.state.showComments[pid]);
  };
  componentDidMount = async () => {
    await this.getPosts();
    this.state.posts.map((p) => console.log(this.state.comments[p.Post_id]));
  };
  render = () => {
    console.log(this.state);
    return (
      <section style={{ width: "100%" }}>
        <br></br>
        <button>
          <Link to="/group-messenger">Group Messenger</Link>
        </button>
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
                  {post.Post_type}{" "}
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
                <div
                  style={{ marginBottom: "0%" }}
                  onClick={() => this.toggleComment(post.Post_id)}
                >
                  Toggle Comments:{" "}
                  {this.state.comments[post.Post_id] !== undefined ? (
                    this.state.comments[post.Post_id].length
                  ) : (
                    <i>0</i>
                  )}
                </div>
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
