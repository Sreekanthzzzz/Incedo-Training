import React from "react";
import { Avatar, Grid, Paper, TextField, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import $ from "jquery";
import emailjs from "@emailjs/browser";
import Sidebar from "./sidebar";
import "./AdminSidebar.css";

const Title = () => {
  return <h4>Change Password</h4>;
};

class ChangePassword extends React.Component {
  constructor() {
    super();
    this.state = { otp: "" };
  }

  userRole = JSON.parse(localStorage.getItem("user")).role;
  initialValues = { username: "", password: "", confirmPassword: "", otp: "" };

  validations = Yup.object().shape({
    username: Yup.string()
      .required("Username cannot be empty")
      .matches(/.*@incedoinc\.com$/, "Not a valid username"),
    otp: Yup.string()
      .required("Enter OTP received on your email")
      .matches(/[0-9]{5}$/, "Not a valid OTP"),
    password: Yup.string()
      .required("Password cannot be empty")
      .min(8, "Password should be Min 8 characters in length")
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*].*$/,
        "Should contain a special character, a number, a lowercase and an upper caser letter"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords dont match")
      .required("Re-enter your password"),
  });

  handleSubmit = (values, { resetForm }) => {
    var payload = values;
    console.log(payload);
    if (values.otp === this.state.otp) {
      fetch("http://localhost:8080/user/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: payload["username"],
          password: payload["password"],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          var color =
            data === "Password reset successful" ? "green" : "#c40202";
          $("#avatar").hide();
          $("#island").show();
          $("#island").animate({ width: "150px" }, 500, () => {
            $("#island").html(data);
            $("#island").css({ "background-color": color });
          });
        })
        .catch((error) => console.log(error));
    } else {
      $("#avatar").hide();
      $("#island").show();
      $("#island").animate(
        { width: "250px", "background-color": "red" },
        500,
        () => {
          $("#island").html("OTP authentication failed");
          $("#island").css({ "background-color": "#c40202" });
        }
      );
    }
  };

  sendOtp = () => {
    var toEmail = $("[name = 'username']").val();
    if (/.*@incedoinc\.com$/.test(toEmail)) {
      var generatedOtp = Math.floor(
        Math.random() * (99999 - 10000) + 10000
      ).toString();
      this.setState({ otp: generatedOtp });

      var form = document.createElement("form");

      var mail = document.createElement("input");
      mail.setAttribute("type", "text");
      mail.setAttribute("name", "to_email");
      mail.setAttribute("value", toEmail);
      form.appendChild(mail);

      var otp = document.createElement("input");
      otp.setAttribute("type", "text");
      otp.setAttribute("name", "generated_otp");
      otp.setAttribute("value", generatedOtp);
      form.appendChild(otp);

      emailjs
        .sendForm(
          "capstoneApp_emailService",
          "template_3n9g5ot",
          form,
          "js5kVScKuVCil_oAs"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    } else {
      console.log("Username empty");
    }
  };

  render() {
    const paperStyling = {
      padding: 20,
      minHeight: "70vh",
      width: "350px",
      margin: "10vh auto",
      alignItems: "center",
      justifyContent: "center",
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
      <div
        className="wrapper"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
        }}
      >
        <Sidebar role={this.userRole} />

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
              <Title />
            </Grid>
            <br />
            <Formik
              initialValues={this.initialValues}
              onSubmit={this.handleSubmit}
              validationSchema={this.validations}
            >
              {(props) => (
                <Form>
                  <Field
                    as={TextField}
                    type="email"
                    id="username"
                    name="username"
                    label="Username"
                    variant="standard"
                    placeholder="Enter Username"
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
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Field
                      as={TextField}
                      type="text"
                      name="otp"
                      style={{ width: "60%" }}
                      label="OTP"
                      variant="standard"
                      placeholder="Enter OTP"
                      helperText={<ErrorMessage name="otp" />}
                      error={
                        props.errors.otp && props.touched.otp ? true : false
                      }
                    />
                    &emsp;
                    <Button
                      variant="contained"
                      onClick={this.sendOtp}
                      style={{ backgroundColor: "#000", color: "white" }}
                    >
                      Request OTP
                    </Button>
                  </div>
                  <br />
                  <Field
                    as={TextField}
                    type="password"
                    name="password"
                    label="New Password"
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
                      Confirm
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

export default ChangePassword;
