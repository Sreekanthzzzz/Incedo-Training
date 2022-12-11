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
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import $ from "jquery";
import emailjs from "@emailjs/browser";
import Sidebar from "./sidebar";
import "./AdminSidebar.css";

class AdminNewUser extends React.Component {
  constructor() {
    super();
    this.state = { response: "" };
  }

  userRole = JSON.parse(localStorage.getItem("user")).role;

  handleSubmit = (values, { resetForm }) => {
    var toEmail = $("[name = 'username']").val();
    var payload = values;

    payload["status"] = "Active";
    payload["password"] = "Welcome@2022";

    fetch("http://localhost:8080/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data === "Request sent") {
          var defaultPassword = "Welcome@2022";
          var form = document.createElement("form");

          var mail = document.createElement("input");
          mail.setAttribute("type", "text");
          mail.setAttribute("name", "to_email");
          mail.setAttribute("value", toEmail);
          form.appendChild(mail);

          var password = document.createElement("input");
          password.setAttribute("type", "text");
          password.setAttribute("name", "password");
          password.setAttribute("value", defaultPassword);
          form.appendChild(password);

          emailjs
            .sendForm(
              "capstoneApp_emailService",
              "template_h9ayxj7",
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
        }

        var color = data === "Request sent" ? "green" : "#c40202";
        $("#avatar").hide();
        $("#island").show();
        $("#island").animate({ width: "150px" }, 500, () => {
          $("#island").html(data);
          $("#island").css({ "background-color": color });
        });
      })
      .catch((error) => console.log(error));
  };

  initialValues = {
    userId: "",
    username: "",
    name: "",
    role: "",
    password: "",
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
  });

  render() {
    const paperStyling = {
      padding: 20,
      minHeight: "70vh",
      width: "350px",
      margin: "30px auto",
      border: "#A8A9AD 6px solid",
      borderRadius: "20px",
    };

    const avatarStyling = {
      backgroundColor: "#000",
    };

    const islandStyling = {
      width: "40px",
      height: "40px",
      background: "#0066b2",
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
        <Grid item xs={12}>
          <Typography
            variant="h2"
            align="center"
            style={{ backgroundColor: "#FFF", padding: 10, fontWeight: "bold" }}
          >
            Add New User
            <img
              style={{ position: "absolute", right: "1cm", top: "0.7cm" }}
              src={require("./logo_incedo.png")}
              width={75}
              height={15}
              alt="incedo-logo"
            />
          </Typography>
          <Sidebar role={this.userRole} sx={{ color: "white" }} />
        </Grid>

        <Grid container sx={{ position: "relative", top: "1vh" }}>
          <Paper elevation={10} style={paperStyling}>
            <Grid item align="center">
              <div id="avatar">
                {
                  <Avatar style={avatarStyling}>
                    <PersonIcon style={{ fontSize: 25 }} />
                  </Avatar>
                }
              </div>
              <div id="island" style={islandStyling} hidden></div>
              <br />
              <h4>Add User</h4>
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
                    label="Email"
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

                  <Grid align="center">
                    <Button
                      variant="contained"
                      type="submit"
                      style={{ backgroundColor: "#000", color: "white" }}
                    >
                      Give access
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

export default AdminNewUser;
