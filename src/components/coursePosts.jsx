import React, {Component} from "react";

class CoursePosts extends Component{
    state = {
        posts: [
            {
               title: "Test title",
               text: "Sunt anim velit non ipsum excepteur tempor esse. Nulla sint qui anim dolor tempor culpa consectetur dolore fugiat. Consectetur ex aliquip eu labore elit irure culpa deserunt ad est aliquip. Enim eu ipsum laboris cupidatat culpa laboris ullamco minim ea. Ad fugiat reprehenderit sint aute et aute nostrud id nulla. Nisi sunt irure aliqua elit.", 
            },
            {
                title: "Checkmate",
                text: "Esse eiusmod consequat laboris dolore officia do. Commodo ad officia culpa nostrud sit quis occaecat magna sint dolore aliquip dolor id culpa. Occaecat adipisicing anim minim sint aute ex nisi excepteur pariatur anim minim nisi enim ut.",
            },
            {
                title: "Test title",
                text: "Sunt anim velit non ipsum excepteur tempor esse. Nulla sint qui anim dolor tempor culpa consectetur dolore fugiat. Consectetur ex aliquip eu labore elit irure culpa deserunt ad est aliquip. Enim eu ipsum laboris cupidatat culpa laboris ullamco minim ea. Ad fugiat reprehenderit sint aute et aute nostrud id nulla. Nisi sunt irure aliqua elit.", 
             },
             {
                 title: "Checkmate",
                 text: "Esse eiusmod consequat laboris dolore officia do. Commodo ad officia culpa nostrud sit quis occaecat magna sint dolore aliquip dolor id culpa. Occaecat adipisicing anim minim sint aute ex nisi excepteur pariatur anim minim nisi enim ut.",
             },
             {
                title: "Test title",
                text: "Sunt anim velit non ipsum excepteur tempor esse. Nulla sint qui anim dolor tempor culpa consectetur dolore fugiat. Consectetur ex aliquip eu labore elit irure culpa deserunt ad est aliquip. Enim eu ipsum laboris cupidatat culpa laboris ullamco minim ea. Ad fugiat reprehenderit sint aute et aute nostrud id nulla. Nisi sunt irure aliqua elit.", 
             },
             {
                 title: "Checkmate",
                 text: "Esse eiusmod consequat laboris dolore officia do. Commodo ad officia culpa nostrud sit quis occaecat magna sint dolore aliquip dolor id culpa. Occaecat adipisicing anim minim sint aute ex nisi excepteur pariatur anim minim nisi enim ut.",
             },
             {
                title: "Test title",
                text: "Sunt anim velit non ipsum excepteur tempor esse. Nulla sint qui anim dolor tempor culpa consectetur dolore fugiat. Consectetur ex aliquip eu labore elit irure culpa deserunt ad est aliquip. Enim eu ipsum laboris cupidatat culpa laboris ullamco minim ea. Ad fugiat reprehenderit sint aute et aute nostrud id nulla. Nisi sunt irure aliqua elit.", 
             },
             {
                 title: "Checkmate",
                 text: "Esse eiusmod consequat laboris dolore officia do. Commodo ad officia culpa nostrud sit quis occaecat magna sint dolore aliquip dolor id culpa. Occaecat adipisicing anim minim sint aute ex nisi excepteur pariatur anim minim nisi enim ut.",
             },

        ],
    };
    render() {
        return (
          <section>
            <h5>Feed</h5>
            <ul
              style={{
                paddingRight: "1%",
                width: "50%",
                float: "left",
                listStyle: "none",
                height: window.innerHeight * 0.6,
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse",
                bottom: "20",
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
                      {post.title} <br />
                      <div
                        className="PostText"
                        style={{
                          wordWrap: "break-word",
                          border: "2px solid blue",
                          background: "rgba(189, 227, 230,0.5)",
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
                  </li>
                );
              })}
            </ul>
          </section>
        );
      }
    }



export default CoursePosts;