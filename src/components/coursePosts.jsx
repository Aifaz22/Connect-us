import React, {Component} from "react";

class CoursePosts extends Component{
    state = {
        posts: [
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
    render() {
        return (
          <section>
            <h5 style = {{marginTop: "2%"}}>Example Course Feed</h5>
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
              {this.state.posts.map((post) => {
                return (
                  <li
                    style={{
                      wordWrap: "break-word",
                      border: " 1px solid black",
                      marginTop: "3%",
                      textAlign: "left",
                    }}
                  >
                    <div className="PostElement" style={{ fontSize: "25px", marginLeft: "1%" }}>
                      {post.title} <p style = {{fontSize: "13px", marginBottom: "-3%"}}> Author: {post.author} </p>
                      
                      <p style = {{fontSize: "13px", marginBottom: "-4%", marginTop: "3%"}}> Posted: {post.dateTime}</p>
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
                        {post.text}
                      </div>
                    </div>
                    <p style ={{marginBottom: "0%"}} >Comments: {post.comments} </p>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      }
    }



export default CoursePosts;