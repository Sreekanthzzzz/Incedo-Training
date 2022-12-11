import React from "react";
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import SignUpIcon from "@mui/icons-material/PersonAddAlt1";
import $ from "jquery";

class NewUser extends React.Component {
  handleSubmit = (values, { resetForm }) => {
    var payload = values;
    delete payload["confirmPassword"];
    payload["status"] = "Requested";

    fetch("http://localhost:8080/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        var color = data === "User exists" ? "#c40202" : "green";
        $("#avatar").hide();
        $("#island").show();
        $("#island").animate({ width: "150px" }, 500, () => {
          $("#island").html(data);
          $("#island").css({ "background-color": color });
        });
      })
      .catch((error) => console.log(error));
    resetForm({ values: "" });
  };

  initialValues = {
    userId: "",
    username: "",
    name: "",
    role: "",
    password: "",
    confirmPassword: "",
  };

  validations = Yup.object().shape({
    userId: Yup.string()
      .required("Employee ID cannot be empty")
      .matches(/^[0-9]{6}$/, "Not a valid ID"),
    username: Yup.string()
      .required("Username cannot be empty")
      .matches(/.*@incedoinc\.com$/, "Not a valid username"),
    name: Yup.string()
      .required("Name cannot be empty")
      .matches(/^[A-Za-z\s]*$/, "Only alphabets and spaces allowed"),
    role: Yup.string().required("Role cannot be empty"),
    password: Yup.string()
      .min(8, "Password should be min 8 characters in length")
      .required("Password cannot be empty")
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*].*$/,
        "Should contain a special character, a number, a lowercase and an upper caser letter"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords dont match")
      .required("Re-enter your password"),
  });

  render() {
    const paperStyling = {
      padding: 20,
      minHeight: "50vh",
      width: "350px",
      margin: "20px auto",
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
                    <PersonIcon style={{ fontSize: 25 }} />
                  </Avatar>
                }
              </div>
              <div id="island" style={islandStyling} hidden></div>
              <h4>Sign Up</h4>
            </Grid>
            <Formik
              initialValues={this.initialValues}
              validationSchema={this.validations}
              onSubmit={this.handleSubmit}
            >
              {(props) => (
                <Form>
                  <Field
                    as={TextField}
                    type="text"
                    name="userId"
                    label="Employee ID"
                    variant="standard"
                    fullWidth
                    helperText={<ErrorMessage name="userId" />}
                    error={
                      props.errors.userId && props.touched.userId ? true : false
                    }
                  />
                  <br />
                  <br />
                  <Field
                    as={TextField}
                    type="email"
                    name="username"
                    label="Username"
                    variant="standard"
                    fullWidth
                    helperText={<ErrorMessage name="username" />}
                    error={
                      props.errors.username && props.touched.username
                        ? true
                        : false
                    }
                  />
                  <br />
                  <br />
                  <Field
                    as={TextField}
                    type="text"
                    name="name"
                    label="Name"
                    variant="standard"
                    fullWidth
                    helperText={<ErrorMessage name="name" />}
                    error={
                      props.errors.name && props.touched.name ? true : false
                    }
                  />
                  <br />
                  <br />
                  <FormControl fullWidth variant="standard" id="role">
                    <InputLabel id="input-label">Role</InputLabel>
                    <Field
                      as={Select}
                      labelId="select-label"
                      id="select-role"
                      label="Role"
                      name="role"
                    >
                      <MenuItem value={""}>None</MenuItem>
                      <MenuItem value={"Lead"}>Lead</MenuItem>
                      <MenuItem value={"Developer"}>Developer</MenuItem>
                      <MenuItem value={"Admin"}>Admin</MenuItem>
                    </Field>
                  </FormControl>
                  <br />
                  <br />
                  <Field
                    as={TextField}
                    type="password"
                    name="password"
                    label="Password"
                    variant="standard"
                    placeholder="********"
                    fullWidth
                    helperText={<ErrorMessage name="password" />}
                    error={
                      props.errors.password && props.touched.password
                        ? true
                        : false
                    }
                  />
                  <br />
                  <br />
                  <Field
                    as={TextField}
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="standard"
                    placeholder="********"
                    fullWidth
                    helperText={<ErrorMessage name="confirmPassword" />}
                    error={
                      props.errors.confirmPassword &&
                      props.touched.confirmPassword
                        ? true
                        : false
                    }
                  />
                  <br />
                  <br />
                  <Grid align="center">
                    <Button
                      variant="contained"
                      type="submit"
                      style={{ backgroundColor: "#000", color: "white" }}
                    >
                      Request access
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
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
export default NewUser;
