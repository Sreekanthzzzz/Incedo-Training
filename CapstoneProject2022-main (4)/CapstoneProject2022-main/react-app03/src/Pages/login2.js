import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Avatar, Grid, Paper, TextField, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/LockOutlined";
import LoginIcon from "@mui/icons-material/Login";
import SignUpIcon from "@mui/icons-material/PersonAddAlt1";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthApi from "../AuthAPI";
import $ from "jquery";

function Login2() {
  var Auth = React.useContext(AuthApi);

  var handleSubmit = (values, { resetForm }) => {
    var payload = values;

    fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((result) => {
        delete result["password"];
        localStorage.setItem("user", JSON.stringify(result));
        Auth.setAuth(true);
      })
      .catch((error) => {
        $("#avatar").hide();
        $("#island").show();
        $("#island").animate({ width: "250px" }, 500, () => {
          $("#island").html("Username or password is incorrect");
          $("#island").css({ "background-color": "#c40202" });
        });
        console.log(error);
      });

    resetForm({ values: "" });
  };

  var initialValues = { username: "", password: "" };

  var validations = Yup.object().shape({
    username: Yup.string()
      .required("Username cannot be empty")
      .matches(/.*@incedoinc\.com$/, "Not a valid username"),
    password: Yup.string().required("Password cannot be empty"),
  });

  const paperStyling = {
    padding: 20,
    minHeight: "55vh",
    width: "350px",
    margin: "15vh auto",
    border: "#A8A9AD 6px solid",
    borderRadius: "20px",
  };

  const avatarStyling = {
    backgroundColor: "#000",
  };

  const islandStyling = {
    width: "40px",
    height: "40px",
    background: "#000",
    borderRadius: "20px",
    textAlign: "center",
    lineHeight: "40px",
    color: "white",
  };

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
      <div className="blurry-bg-blurred"></div>
      <Grid>
        <Paper elevation={10} style={paperStyling}>
          <Grid align="center">
            <div id="avatar">
              {
                <Avatar style={avatarStyling}>
                  <LockIcon style={{ fontSize: 20 }} />
                </Avatar>
              }
            </div>
            <div id="island" style={islandStyling} hidden></div>
            <h4>Sign In</h4>
          </Grid>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validations}
          >
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  type="email"
                  name="username"
                  label="Username"
                  variant="standard"
                  placeholder="Enter Username"
                  error={
                    props.errors.username && props.touched.username
                      ? true
                      : false
                  }
                  helperText={<ErrorMessage name="username" />}
                  fullWidth
                />
                <br />
                <br />
                <Field
                  as={TextField}
                  type="password"
                  name="password"
                  label="Password"
                  variant="standard"
                  placeholder="********"
                  error={
                    props.errors.password && props.touched.password
                      ? true
                      : false
                  }
                  helperText={<ErrorMessage name="password" />}
                  fullWidth
                />
                <br />
                <Link
                  style={{ fontSize: 10, float: "right" }}
                  to={"/forgotPassword"}
                >
                  Forgot password
                </Link>
                <br />
                <Grid align="center">
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ backgroundColor: "#000", color: "white" }}
                  >
                    Sign in
                  </Button>
                  <br />
                  <br />
                  New user ? <Link to={"/signup"}>Request access</Link>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </div>
  );
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
export default Login2;