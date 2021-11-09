import React, { Component } from "react";

class MessageList extends Component {
  state = {
    messages: [
      {
        senderId: "Aifaz",
        text: "Hi",
      },
      {
        senderId: "janedoe",
        text: "Hello",
      },
      {
        senderId: "perborgen",
        text: "Hi",
      },
      {
        senderId: "janedoe",
        text: "Hello",
      },
      {
        senderId: "perborgen",
        text: "Hi",
      },
      {
        senderId: "janedoe",
        text: "Hello",
      },
      {
        senderId: "perborgen",
        text: "Hi",
      },
      {
        senderId: "janedoe",
        text: "Hello",
      },
      {
        senderId: "perborgen",
        text: "Hi",
      },
      {
        senderId: "janedoe",
        text: "Hello",
      },
      {
        senderId: "perborgen",
        text: "Hi",
      },
      {
        senderId: "janedoe",
        text: "Hello",
      },
      {
        senderId: "perborgen",
        text: "Hi",
      },
      {
        senderId: "janedoe",
        text: "Hello",
      },
    ],
  };
  render() {
    return (
      <section>
        <h5>Title</h5>
        <ul
          style={{
            paddingRight: "1%",
            width: "80%",
            float: "right",
            listStyle: "none",
            height: window.innerHeight * 0.6,
            overflow: "auto",
            display: "flex",
            flexDirection: "column-reverse",
            bottom: "20",
          }}
        >
          {this.state.messages.map((message) => {
            return (
              <li
                style={{
                  wordWrap: "break-word",
                  border: " 1px solid black",
                  marginTop: "0.2%",
                  textAlign: "left",
                }}
              >
                <div className="MessageElement" style={{ fontSize: "12px" }}>
                  {message.senderId} <br />
                  <div
                    className="MessageText"
                    style={{
                      wordWrap: "break-word",
                      background: "rgba(189, 227, 230,0.5)",
                      marginTop: "0.2%",
                      textAlign: "left",
                      fontSize: "17px",
                      paddingLeft: "100px",
                    }}
                  >
                    {message.text}
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

export default MessageList;
