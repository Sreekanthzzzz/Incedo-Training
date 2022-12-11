import React, { useEffect, useRef } from "react";
import {
  Grid,
  TableContainer,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TextField,
  TableRow,
  Button,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import $ from "jquery";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";
import { CSVLink } from "react-csv";
import Sidebar from "./sidebar";
import "./AdminSidebar.css";

function LeadDashBoard3() {
  const [data, setData] = useState([]);
  const [dataStore, setDataStore] = useState([]);
  const [period, setPeriod] = useState("");
  const [valueToOrderBy, setValueToOrderBy] = useState("");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [page, setPage] = useState(0);
  const dashBtnStyling = {
    color: "#000",
    backgroundColor: "#E8AA42",
    borderColor: "#E8AA42",
    "&:hover": {
      backgroundColor: "#c9943a",
      borderColor: "#c9943a",
      boxShadow: "none",
    },
  };

  const csvLink = useRef();
  const headers = [
    { label: "Timesheet Number", key: "timesheetNumber" },
    { label: "Employee Name", key: "resourceName" },
    { label: "Employee Id", key: "resourceId" },
    { label: "Manager Id", key: "managerId" },
    { label: "Project Hours", key: "projectHours" },
    { label: "Holiday Hours", key: "hlHours" },
    { label: "Afternoon Shift Days", key: "afShiftDays" },
    { label: "Night Shift Days", key: "ngShiftDays" },
    // { label: "Days eligible for Travel Allowance", key: "dsta" },
    // { label: "Travel Allowance", key: "ta" },
    // { label: "Total Allowance", key: "total" },
    { label: "Approval Status", key: "approvalStatus" },
  ];

  const location = useLocation();
  const pmId = JSON.parse(localStorage.getItem("user")).userId;
  const userRole = JSON.parse(localStorage.getItem("user")).role;

  const optionFiller = (path, selectObj) => {
    fetch(`http://localhost:8080/api/csv/${path}/${pmId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        var dropdown = document.getElementById(selectObj);
        for (let i = 0; i < result.length; ++i) {
          dropdown[dropdown.length] = new Option(result[i], result[i]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    optionFiller("getproj", "project");
    optionFiller("getCategory", "category");
  }, []);

  const handleSubmit = (e) => {
    var pname = $("#project").val();
    var ps = String(
      new Date(period[0])
        .toLocaleDateString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-")
    );
    var pe = String(
      new Date(period[1])
        .toLocaleDateString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-")
    );

    if (pname === "") {
      alert("Project name is a required field");
    } else {
      if (!(ps === "Invalid Date" && pe === "Invalid Date"))
        fetch(
          `http://localhost:8080/api/csv/getrecord/${pname}/${ps}/${pe}/${pmId}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            data.sort((a, b) =>
              a.periodStart < b.periodStart
                ? 1
                : a.periodStart > b.periodStart
                ? -1
                : 0
            );
            console.log(data);
            setDataStore(data);
            setData(data);
            setPage(0);
          });
      else
        fetch(`http://localhost:8080/api/csv/getrecord/${pname}/${pmId}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            data.sort((a, b) =>
              a.periodStart < b.periodStart
                ? 1
                : a.periodStart > b.periodStart
                ? -1
                : 0
            );
            console.log(data);
            setDataStore(data);
            setData(data);
            setPage(0);
          });
    }
  };

  const getCsv = () => {
    if (dataStore.length > 0) csvLink.current.link.click();
    else alert("No records to download");
  };

  const handleChange = (e, index) => {
    var af = $("#" + index + " #af").val();
    var ns = $("#" + index + " #ns").val();
    var dta = 0;

    if (af !== "" && ns !== "") {
      dta = parseInt(af) + parseInt(ns);
    }

    $("#" + index + " #dta").val(dta);
    $("#" + index + " #ta").html(dta * 200);
    $("#" + index + " #totalAllowance").html(dta * 200 + dta * 55);
  };

  const pushChanges = (index, status) => {
    let af = parseInt($("#" + index + " #af").val());
    let ng = parseInt($("#" + index + " #ns").val());
    let offDays = parseInt($("#" + index + " #hlhours").html());
    let summation = af + ng - offDays;
    console.log(af, ng);
    if (
      af < 8 &&
      ng < 8 &&
      offDays < 8 &&
      summation > 0 &&
      af + offDays < 8 &&
      ng + offDays < 8
    ) {
      let tempObj = [...data];
      tempObj[index].approvalStatus = status;
      tempObj[index].afShiftDays = $("#" + index + " #af").val();
      tempObj[index].ngShiftDays = $("#" + index + " #ns").val();

      fetch(
        `http://localhost:8080/api/csv/update/${tempObj[index].timesheetNumber}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tempObj[index]),
        }
      )
        .then((response) => response.text())
        .then((result) => {
          alert(result);
        })
        .catch((error) => alert(error));

      setData(tempObj);
    } else
      alert(
        "Error in the number of shift days at row number " +
          (index + page * 4 + 1)
      );
  };

  const createSortHandler = (property) => (event) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;

    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const sortedData = (arr, comparator) => {
    const stabilizedArray = arr.map((el, index) => [el, index]);
    stabilizedArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedArray.map((el) => el[0]);
  };

  const filterRecords = (value) => {
    console.log(dataStore.length);
    if (value !== "All" && dataStore.length > 0) {
      var dummy = dataStore.filter((obj) => {
        return obj.approvalStatus === value;
      });
      console.log(dummy);
      setData([...dummy]);
    } else {
      setData([...dataStore]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const BtnRenderer = (props) => {
    let status = data[props.index].approvalStatus;
    if (!(status === "Approved" || status === "Rejected"))
      return (
        <div style={{ display: "flex" }}>
          <Button
            id="approveBtn"
            variant="contained"
            sx={{ backgroundColor: "green", minWidth: 10, height: 35 }}
            onClick={() => pushChanges(props.index, "Approved", props.item)}
          >
            <DoneIcon />
          </Button>{" "}
          &ensp;
          <Button
            id="rejectBtn"
            variant="contained"
            sx={{ backgroundColor: "#A30000", minWidth: 10, height: 35 }}
            onClick={() => pushChanges(props.index, "Rejected", props.item)}
          >
            <CloseIcon />
          </Button>
        </div>
      );
    else
      return (
        <div style={{ display: "flex" }}>
          <p style={{ margin: "auto" }}>{status}</p> &ensp;{" "}
          <Button
            id="editBtn"
            variant="contained"
            sx={{ backgroundColor: "blue", minWidth: 10, height: 35 }}
            onClick={() => {
              let oldData = [...dataStore];
              oldData[props.index].approvalStatus = "Awaiting Approval";
              setDataStore(oldData);
            }}
          >
            <EditIcon />
          </Button>
        </div>
      );
  };

  if (location.state) {
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
        <Sidebar role={userRole} />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography
              variant="h2"
              align="center"
              style={{
                backgroundColor: "#FFF",
                padding: 10,
                fontWeight: "bold",
              }}
            >
              Allowance Dashboard
              <img
                style={{ position: "absolute", right: "1cm", top: "0.7cm" }}
                src={require("./logo_incedo.png")}
                width={75}
                height={15}
                alt="incedo-logo"
              />
            </Typography>
          </Grid>

          <Grid
            item
            xs={4}
            sx={{ textAlign: "center", color: "#FBFCF8" }}
            my={2}
          >
            Category :&ensp;
            <select
              className="dropdown-styled"
              id="category"
              defaultValue={""}
              onChange={(e) => {
                var selectTag = document.getElementById("project");
                for (let i = selectTag.length; i > 0; i--) selectTag.remove(i);
                if (e.target.value === " ") optionFiller(`getproj`, "project");
                else optionFiller(`getproj/${e.target.value}`, "project");
              }}
            >
              <option value={" "}>Select category</option>
            </select>
          </Grid>

          <Grid
            item
            xs={4}
            textAlign={"center"}
            alignContent={"center"}
            sx={{ color: "#FBFCF8" }}
          >
            Project :&ensp;
            <select className="dropdown-styled" id="project" defaultValue={""}>
              <option value={""}>Choose Project</option>
            </select>
          </Grid>

          <Grid item xs={4} textAlign={"center"} sx={{ color: "#FBFCF8" }}>
            Period :&ensp;
            <DateRangePicker
              oneTap
              showOneCalendar
              hoverRange="week"
              format="dd-MM-yyyy"
              ranges={[]}
              isoWeek
              onChange={(value) => setPeriod(value)}
              size="sm"
              placeholder="Select Period"
            />
          </Grid>
        </Grid>
        <div className="whiteboard">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={8}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                size="large"
                sx={dashBtnStyling}
              >
                Get Records
              </Button>
              &emsp;
              <Button
                variant="contained"
                size="large"
                onClick={getCsv}
                sx={dashBtnStyling}
              >
                Download data
              </Button>
              <CSVLink
                data={data}
                filename="records.csv"
                className="hidden"
                ref={csvLink}
                headers={headers}
                target="_blank"
              />
            </Grid>

            <Grid item xs={3} textAlign={"right"}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  float: "right",
                  margin: "auto",
                  height: 40,
                  color: "#FBFCF8",
                }}
              >
                Filter records :&ensp;
                <select
                  className="dropdown-styled"
                  id="filter"
                  name="filter"
                  onChange={(e) => filterRecords(e.target.value)}
                >
                  <option value="" disabled>
                    Filter by status
                  </option>
                  <option value="All">All</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Awaiting Approval">Awaiting Approval</option>
                </select>
              </div>
            </Grid>

            <Grid item xs={11} my={2}>
              <Paper>
                <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                  <Table sx={{ height: "max-content" }}>
                    <TableHead
                      sx={{ textAlign: "center", backgroundColor: "#6495ED" }}
                    >
                      <TableRow
                        sx={{
                          "& th": {
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            textAlign: "center",
                          },
                        }}
                      >
                        <TableCell key="resourceName">
                          <TableSortLabel
                            active={valueToOrderBy === "resourceName"}
                            direction={
                              valueToOrderBy === "resourceName"
                                ? orderDirection
                                : "asc"
                            }
                            onClick={createSortHandler("resourceName")}
                          >
                            Name
                          </TableSortLabel>
                        </TableCell>
                        <TableCell key="resourceId">
                          <TableSortLabel
                            active={valueToOrderBy === "resourceId"}
                            direction={
                              valueToOrderBy === "resourceId"
                                ? orderDirection
                                : "asc"
                            }
                            onClick={createSortHandler("resourceId")}
                          >
                            SAP ID
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>Project Hours</TableCell>
                        <TableCell>Holiday Hours</TableCell>
                        <TableCell>Afternoon Shift Days</TableCell>
                        <TableCell>Night Shift Days</TableCell>
                        <TableCell>Days eligible for TA</TableCell>
                        <TableCell>Travel Allowance</TableCell>
                        <TableCell>Total Allowance</TableCell>
                        <TableCell key="periodStart">
                          <TableSortLabel
                            active={valueToOrderBy === "periodStart"}
                            direction={
                              valueToOrderBy === "periodStart"
                                ? orderDirection
                                : "asc"
                            }
                            onClick={createSortHandler("periodStart")}
                          >
                            Period
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>Approve/Reject</TableCell>
                      </TableRow>
                    </TableHead>
                    <>
                      <TableBody>
                        {sortedData(
                          data,
                          getComparator(orderDirection, valueToOrderBy)
                        )
                          .slice(page * 4, page * 4 + 4)
                          .map((item, i) => (
                            <TableRow
                              id={page * 4 + i}
                              key={i}
                              sx={{
                                "& td": {
                                  fontSize: "1.10rem",
                                  textAlign: "center",
                                },
                              }}
                            >
                              <TableCell>{item.resourceName}</TableCell>
                              <TableCell>{item.resourceId}</TableCell>
                              <TableCell>{item.projectHours}</TableCell>
                              <TableCell id="hlhours">{item.hlHours}</TableCell>
                              <TableCell>
                                <TextField
                                  defaultValue={item.afShiftDays}
                                  sx={{ width: 40, height: 35 }}
                                  id="af"
                                  onChange={(e) => handleChange(e, i)}
                                ></TextField>
                              </TableCell>
                              <TableCell>
                                <TextField
                                  defaultValue={item.ngShiftDays}
                                  sx={{ width: 40, height: 35 }}
                                  id="ns"
                                  onChange={(e) => handleChange(e, i)}
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  defaultValue={
                                    parseInt(item.afShiftDays) +
                                    parseInt(item.ngShiftDays)
                                  }
                                  sx={{ width: 40, height: 35 }}
                                  id="dta"
                                />
                              </TableCell>
                              <TableCell id="ta">
                                {" "}
                                {(parseInt(item.afShiftDays) +
                                  parseInt(item.ngShiftDays)) *
                                  200}{" "}
                              </TableCell>
                              <TableCell id="totalAllowance">
                                {" "}
                                {(parseInt(item.afShiftDays) +
                                  parseInt(item.ngShiftDays)) *
                                  200 +
                                  (parseInt(item.afShiftDays) +
                                    parseInt(item.ngShiftDays)) *
                                    55}{" "}
                              </TableCell>
                              <TableCell>
                                {item.periodStart + " to " + item.periodEnd}
                              </TableCell>
                              <TableCell
                                id="buttons"
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                {<BtnRenderer index={page * 4 + i} />}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPage={4}
                  rowsPerPageOptions={[4]}
                  component="div"
                  page={page}
                  count={data.length}
                  onPageChange={handleChangePage}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  } else return <Navigate to={"/profile"} replace={true} />;
}

export default LeadDashBoard3;
