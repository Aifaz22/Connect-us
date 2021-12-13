import React, { Component } from "react";
import axios from "axios";

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
    posts1: [
      {
        title: "Test title",
        text: "Sunt anim velit non ipsum excepteur tempor esse. Nulla sint qui anim dolor tempor culpa consectetur dolore fugiat. Consectetur ex aliquip eu labore elit irure culpa deserunt ad est aliquip. Enim eu ipsum laboris cupidatat culpa laboris ullamco minim ea. Ad fugiat reprehenderit sint aute et aute nostrud id nulla. Nisi sunt irure aliqua elit.",
        author: "Jim",
        dateTime: "09/22/2021 13:04",
        comments: "1",
      },
      {
        title: "Checkmate",
        text: "Esse eiusmod consequat laboris dolore officia do. Commodo ad officia culpa nostrud sit quis occaecat magna sint dolore aliquip dolor id culpa. Occaecat adipisicing anim minim sint aute ex nisi excepteur pariatur anim minim nisi enim ut.",
        author: "Joe",
        dateTime: "10/11/2021 07:31",
        comments: "5",
      },
      {
        title: "Test title",
        text: "Sunt anim velit non ipsum excepteur tempor esse. Nulla sint qui anim dolor tempor culpa consectetur dolore fugiat. Consectetur ex aliquip eu labore elit irure culpa deserunt ad est aliquip. Enim eu ipsum laboris cupidatat culpa laboris ullamco minim ea. Ad fugiat reprehenderit sint aute et aute nostrud id nulla. Nisi sunt irure aliqua elit.",
        author: "Eliza",
        dateTime: "01/05/2019 16:21",
        comments: "0",
      },
    ],
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
      .then(function (response) {
        //******************************************************************* */
        console.log(response.data);
        self.setState({
          posts: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  getComments = (pid, paid) => {};
  componentDidMount = async () => {
    await this.getPosts();
    await this.state.posts.map(async (post) => {
      this.getComments(post.Post_id, post.Author_id);
    });
  };
  render() {
    return (
      <section style={{ width: "100%" }}>
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
            height: "70%",
            marginTop: "3%",
            overflow: "auto",
            display: "flex",
            flexDirection: "column-reverse",
            marginBottom: "3px",
          }}
        >
          {this.state.posts.reverse().map((post) => {
            return (
              <li
                style={{
                  wordWrap: "break-word",
                  border: " 1px solid black",
                  marginTop: "3%",
                  textAlign: "left",
                }}
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
                <p style={{ marginBottom: "0%" }}>
                  Comments: 0
                  {
                    //post.comments
                  }{" "}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default CoursePosts;
