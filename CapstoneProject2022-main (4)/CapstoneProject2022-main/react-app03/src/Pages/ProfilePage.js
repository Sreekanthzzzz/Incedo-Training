import React from "react";
import "./Profile.css";
import AuthApi from "../AuthAPI";
import { Link } from "react-router-dom";
import FileUploadPage from "./DeveloperDashboard";

class ProfilePage extends React.Component {
  componentDidMount() {
    document.getElementById("home-tab").click();
  }

  user = JSON.parse(localStorage.getItem("user"));

  render() {
    return (
      <div
        className="wrapper"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        <div className="container emp-profile">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img
                  src={require("./profileAvatar.png")}
                  style={{ height: 150, width: 175 }}
                  alt="robot-profile"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="profile-head">
                <h5> {this.user.name} </h5>
                <h6> {this.user.role} </h6>
                <br />
                <p className="proile-rating">
                  <b>Status</b> :&ensp;<span>{this.user.status}</span>
                </p>
                <br />
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <Logout />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p>Services</p>
                <label>
                  <Actions role={this.user.role} />
                </label>
              </div>
              <div style={{ width: "100%", textAlign: "center" }}>
                <Link
                  to="/changePassword"
                  state={{ username: this.user.username }}
                >
                  <button className="profile-logout-btn" name="btnAddMore">
                    Change Password
                  </button>
                </Link>
              </div>
            </div>

            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Employee Id</label>
                    </div>

                    <div className="col-md-6">
                      <p>{this.user.userId}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>

                    <div className="col-md-6">
                      <p>{this.user.username}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Actions = (props) => {
  if (props.role === "Admin")
    return (
      <ul>
        <li>
          <Link to={"/adminadduser"} state={{}}>
            Add User
          </Link>
        </li>
        <li>
          <Link to={"/admindashboard"} state={{}}>
            User management
          </Link>
        </li>
        <li>
          <Link to={"/adminallowancedashboard"} state={{}}>
            Allowance Dashboard
          </Link>
        </li>
      </ul>
    );
  else if (props.role === "Lead")
    return (
      <ul>
        <li>
          <Link to={"/leaddashboard"} state={{}}>
            Allowance Dashboard
          </Link>
        </li>
      </ul>
    );
  else
    return (
      <div>
        Upload Timesheet data
        <FileUploadPage />
      </div>
    );
};

var Logout = () => {
  var Auth = React.useContext(AuthApi);
  var HandleLogout = () => {
    localStorage.removeItem("user");
    Auth.setAuth(false);
  };

  return (
    <div>
      <button
        className="profile-logout-btn"
        name="btnLogoutUser"
        onClick={HandleLogout}
      >
        Logout
      </button>
    </div>
  );
};
export default ProfilePage;
