import React, { Component } from "react";
import axios from "axios";
class EditSinProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "",
      userID: "",
      research: [],
      researchToAdd: "",
    };
  }
  getResearchAreas = async () => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .get("http://localhost:3000/api/Research/" + self.state.userID, config)
      .then(function (response) {
        //******************************************************************* */
        console.log(response.data);
        self.setState({
          research: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  delResearch = async (s) => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios
      .delete("http://localhost:3000/api/Research/" + s, config)
      .then(function (response) {
        //******************************************************************* */
        console.log(response.data);
        // self.setState({ research: [] });
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  addResearch = async () => {
    var self = this;
    var errorFound = false;
    var token = sessionStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var body = {
      Research_area: this.state.researchToAdd,
    };
    const response = await axios
      .post("http://localhost:3000/api/Research/", body, config)
      .then(function (response) {
        console.log(response.data);
        self.setState({ research: [] });
      })
      .catch(function (error) {
        console.log(error);
        // console.log("XXXXXXXXXXXXXXXXXXXXX");
        errorFound = true;
      });
  };
  componentDidMount = async () => {
    var errorFound = false;
    var user = "";
    var URL = "http://localhost:3000/api/";
    if (sessionStorage.getItem("userUCID") !== "null") {
      URL += "Students/" + sessionStorage.getItem("userUCID");
      this.setState({
        userType: "UCID",
        userID: parseInt(sessionStorage.getItem("userUCID")),
      });
    } else if (sessionStorage.getItem("userSIN") !== "null") {
      URL += "Instructor/" + sessionStorage.getItem("userSIN");
      this.setState({
        userType: "SIN",
        userID: parseInt(sessionStorage.getItem("userSIN")),
      });
    } else if (sessionStorage.getItem("userAlumni") !== "null") {
      URL += "Alumni/" + sessionStorage.getItem("userAlumni");
      this.setState({
        userType: "Alumni_ID",
        userID: parseInt(sessionStorage.getItem("userAlumni")),
      });
    } else if (sessionStorage.getItem("userAdmin") !== "null") {
      URL += "Admin/" + sessionStorage.getItem("userAdmin");
      this.setState({
        userType: "Admin_ID",
        userID: parseInt(sessionStorage.getItem("userAdmin")),
      });
    } else {
      errorFound = true;
      return;
    }
    this.getResearchAreas();
  };
  render = () => {
    console.log(this.state.research);
    return (
      <div>
        <h2>Research Area</h2>
        <hr />

        {this.state.research.map((elem) => {
          return (
            <div>
              <span style={{ paddingRight: "1%" }}>{elem.Research_area}</span>

              <button
                style={{ marginLeft: "2%" }}
                onClick={async (event) => {
                  await this.delResearch(elem.Research_area);
                  var temp = [];
                  for (const x of this.state.research) {
                    if (x.Research_area != elem.Research_area) {
                      temp.push(x);
                    }
                  }
                  this.setState({ research: temp });
                  //   event.preventDefault();
                }}
              >
                delete
              </button>
            </div>
          );
        })}

        <hr />
        <form
          onSubmit={async (event) => {
            await this.addResearch();
            event.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Research Area"
            onChange={(e) => {
              this.setState({ researchToAdd: e.target.value });
              e.preventDefault();
            }}
          />

          <button type="submit">Add</button>
        </form>
      </div>
    );
  };
}

export default EditSinProfile;
