import React, { Component } from "react";

class MessageList extends React.Component {
  state = {
    messages: [
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
        <ul style={{ float: "bottom" }}>
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
