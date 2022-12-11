import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./style.css";
import LoginIcon from "@mui/icons-material/Login";
import SignUpIcon from "@mui/icons-material/PersonAddAlt1";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div>
          <nav id="nav">
            <img
              style={{ position: "absolute", left: "1cm" }}
              src={require("./logo_incedo.png")}
              width={75}
              height={15}
              alt="incedo-logo"
            />
            <ul>
              <CustomLink to="/login">
                <LoginIcon style={{ fontSize: 18 }} />
                &nbsp;Login
              </CustomLink>
              <CustomLink to="/signup">
                <SignUpIcon style={{ fontSize: 18 }} />
                &nbsp;Sign Up
              </CustomLink>
            </ul>
          </nav>
        </div>
        <div className="blurry-bg"></div>
        <div className="bg-text">
          <h1>WELCOME TO</h1>
          <h1>STAR APP</h1> <br />
          <p>GENERATING SHIFT ALLOWANCES MADE SIMPLE</p>
        </div>

        <footer id="nav2">
          <p id="centered">Company © Incedo Technology All Rights Reserved</p>
        </footer>
      </div>
    );
  }
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <span className={isActive ? "active" : ""}>
      {" "}
      <Link to={to} {...props}>
        {children}
      </Link>
    </span>
  );
}

export default Home;