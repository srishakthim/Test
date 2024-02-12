import React, { useEffect, useState } from "react";
import MyDataGrid from "../../components/table/DataGrid";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  Divider,
  FormLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Axios from "../../config/axiosConfig";
import { toast } from "react-toastify";
import DeleteAlert from "../../components/alert/deleteAlert";

function NewUsers() {
  const [userList, setUserList] = useState([]);
  const [empList, setempList] = useState([]);
  const [dialog, setdialog] = useState(false);
  const [assinto, setassinto] = useState("");
  const [assintoID, setassintoID] = useState("");
  const [duriation, setduriation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(startDate));
  const [level, setlevel] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [ErrorObj, setErrorObj] = useState({
    userlevel: false,
    duriation: false,
    assinto: false,
  });
  const columns = [
    {
      field: "username",
      headerName: "Username",
      minWidth: 150,
      flex: 1,
      sortable: false,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 1,
      sortable: false,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 1,
      sortable: false,
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 150,
      flex: 1,
      sortable: false,
    },
    {
      field: "action",
      headerAlign: "center",
      headerName: "User Status",
      sortable: false,
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            disableElevation
            sx={{
              mr: 1,
              fontSize: "12px",
              px: 1,
              color: "#FFF",
              backgroundColor: "#10309F",
            }}
            onClick={() => setdialog(params.id)}
          >
            Approval
          </Button>
          <Button
            variant="outlined"
            disableElevation
            sx={{
              fontSize: "12px",
              px: 1,
              borderColor: "#10309F",
              color: "#10309F",
            }}
            onClick={() => DeleteUser(params.id)}
          >
            Deny
          </Button>
        </Box>
      ),
    },
  ];

  const UpdateUser = async () => {
    const err = {
      userlevel: level == "",
      duriation:
        duriation === "" ? true : !/^\d{1,2}$/.test(duriation) ? "true" : false,
      assinto:
        localStorage.getItem("role") == "Employee" ? false : assintoID == "",
    };
    if (Object.values(err).some((val) => val == true)) {
      setErrorObj(err);
    } else {
      setErrorObj(err);
      endDate.setMonth(startDate.getMonth() + Number(duriation));
      setStartDate(startDate);
      setEndDate(new Date(endDate));
      Axios.post(`/user/approve/${dialog}`, {
        status: "Active",
        payment: "Paid",
        updated_date: Date.now(),
        join_date: startDate,
        expire_date: endDate,
        user_level: level,
        updated_by: localStorage.getItem("userid"),
        assigned_to:
          localStorage.getItem("role") == "Admin" ||
          localStorage.getItem("role") == "SuperAdmin"
            ? assintoID
            : localStorage.getItem("userid"),
        assigned_by: localStorage.getItem("userid"),
      })
        .then((res) => {
          const { status, message } = res.data;
          if (status) {
            toast.success("User Approved");
            GetAllUserList();
          } else {
            toast.success(message);
          }
        })
        .catch((err) => {
          if (err?.response) {
            const { data } = err?.response;
            toast.error(data.message);
          } else {
            toast.error("Internal Server Error");
          }
        });
    }
  };
  const GetAllUserList = () => {
    Axios.get(`user/newuserlist`)
      .then((res) => {
        const { status, message } = res.data;
        if (status) {
          setUserList(message);
          setdialog(false);
        } else {
          toast.success(message);
        }
      })
      .catch((err) => {
        if (err?.response) {
          const { data } = err?.response;
          toast.error(data.message);
        } else {
          toast.error("Internal Server Error");
        }
      });
  };
  const GetEmployeeList = () => {
    Axios.get(`user/list/filter/Employee`)
      .then((res) => {
        const { status, message } = res.data;
        if (status) {
          setempList(message);
          setdialog(false);
        } else {
          toast.success(message);
        }
      })
      .catch((err) => {
        if (err?.response) {
          const { data } = err?.response;
          toast.error(data.message);
        } else {
          toast.error("Internal Server Error");
        }
      });
  };
  const DeleteUser = async (id) => {
    const isConfirm = await DeleteAlert();
    if (isConfirm) {
      Axios.delete(`/user/${id}`)
        .then((res) => {
          const { status, message } = res.data;
          if (status) {
            GetAllUserList();
          } else {
            toast.success(message);
          }
        })
        .catch((err) => {
          if (err?.response) {
            const { data } = err?.response;
            toast.error(data.message);
          } else {
            toast.error("Internal Server Error");
          }
        });
    }
  };
  useEffect(() => {
    GetAllUserList();
    GetEmployeeList();
  }, [location.pathname]);
  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Dialog
            fullWidth
            open={dialog}
            maxWidth="sm"
            onClose={() => setdialog(false)}
          >
            <Box sx={{ p: 2, width: "100%" }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {" "}
                Select User Level
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: "28px" }}>
                Hi {localStorage.getItem("username")}
              </Typography>
              <FormLabel>User Level</FormLabel>
              <Autocomplete
                options={["Level-1", "Level-2", "Level-3", "Level-4"]}
                onChange={(e, value) => setlevel(value)}
                value={level}
                sx={{ mb: 2 }}
                size="small"
                fullWidth
                renderInput={(params) => (
                  <TextField
                    error={ErrorObj["userlevel"]}
                    helperText={
                      ErrorObj["userlevel"] ? "User Level is Required" : ""
                    }
                    {...params}
                    placeholder="Level"
                  />
                )}
              />
              {localStorage.getItem("role") == "Admin" ||
              localStorage.getItem("role") == "SuperAdmin" ? (
                <>
                  <FormLabel>Assign to Employee</FormLabel>
                  <Autocomplete
                    options={empList}
                    onChange={(e, value) => {
                      if (value != null) {
                        setassinto(value["username"]);
                        setassintoID(value["_id"]);
                      } else {
                        setassinto("");
                        setassintoID("");
                      }
                    }}
                    value={{ username: assinto }}
                    getOptionLabel={(option) => option["username"]}
                    sx={{ mb: 2 }}
                    size="small"
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        error={ErrorObj["assinto"]}
                        helperText={
                          ErrorObj["assinto"] ? "Employee is Required" : ""
                        }
                        {...params}
                        placeholder="Select Employee"
                      />
                    )}
                  />
                </>
              ) : (
                ""
              )}
              <FormLabel>Duration</FormLabel>
              <TextField
                size="small"
                type="text"
                error={ErrorObj["duriation"]}
                helperText={
                  ErrorObj["duriation"] === "true"
                    ? "Duration accept Number only. Maximum digit 2. Ex., 1 for 1 month, 12 for 1 year"
                    : ErrorObj["duriation"] === true
                    ? "Duration is Required"
                    : ""
                }
                fullWidth
                placeholder="Enter the number in month"
                onChange={(e) => setduriation(e.target.value)}
              />
              <Box sx={{ textAlign: "right", mt: 1 }}>
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    mr: 1,
                    fontSize: "12px",
                    px: 1,
                    color: "#FFF",
                    backgroundColor: "#10309F",
                  }}
                  onClick={() => UpdateUser()}
                >
                  Approval
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setdialog(false)}
                  disableElevation
                  sx={{
                    fontSize: "12px",
                    px: 1,
                    borderColor: "#10309F",
                    color: "#10309F",
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Dialog>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="h4"
                sx={{ fontSize: { xs: "20px", md: "24px" } }}
              >
                New User Details
              </Typography>
              <Divider
                variant="middle"
                sx={{
                  margin: { xs: "10px 0px", md: "10px 20px" },
                  backgroundColor: "gray",
                }}
              />
            </Grid>
          </Grid>

          <MyDataGrid rows={userList} columns={columns} id="_id" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default NewUsers;
