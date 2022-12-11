import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./AdminSidebar.css";
import { Link, useNavigate } from "react-router-dom";
import AuthApi from "../AuthAPI";

const Sidebar = (props) => {
  if (props.role === "Admin")
    return (
      <Menu>
        <Link className="menu-item" to={"/"}>
          Profile
        </Link>
        <Link className="menu-item" to={"/admindashboard"} state={{}}>
          User Management
        </Link>
        <Link className="menu-item" to={"/adminallowancedashboard"} state={{}}>
          Allowance Dashboard
        </Link>
        <Link className="menu-item" to={"/adminadduser"} state={{}}>
          Add New User
        </Link>
        <Logout />
      </Menu>
    );
  else
    return (
      <Menu>
        <Link className="menu-item" to={"/"}>
          Profile
        </Link>
        <Link className="menu-item" to={"/leaddashboard"} state={{}}>
          Allowance Dashboard
        </Link>
        <Logout />
      </Menu>
    );
};

var Logout = () => {
  let navigate = useNavigate();

  let btnStyling = {
    padding: "5px 10px 5px 10px",
    color: "#d1d1d1",
    backgroundColor: "#373a47",
    border: "2px solid #d1d1d1",
    borderRadius: "10px",
  };

  let Auth = React.useContext(AuthApi);
  let HandleLogout = () => {
    localStorage.removeItem("user");
    Auth.setAuth(false);
    navigate("/");
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <button name="btnLogoutUser" style={btnStyling} onClick={HandleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;