import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  InputLabel,
  TextField,
  Button,
  MenuItem,
  Select,
  Autocomplete,
  Divider,
  FormLabel,
} from "@mui/material";
import Axios from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UserForm = () => {
  const navigate = useNavigate();
  const { action, id } = useParams();
  const [userList, setUserList] = useState([]);
  const [empList, setempList] = useState([]);
  const [assinto, setassinto] = useState("");
  const [assintoID, setassintoID] = useState("");
  const [ref_id, setref_id] = useState("");

  const [username, setusername] = useState("");
  const [level, setlevel] = useState("");
  const [payment, setpayment] = useState("");
  const [status, setstatus] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [role, setrole] = useState("");
  const [disabled, setdisabled] = useState(false);
  const [ErrorObj, setErrorObj] = useState({
    username: false,
    email: false,
    password: false,
    phonenumber: false,
    role: false,
    refid: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleUser = async () => {
    let err = {
      username: username === "",
      email:
        email === ""
          ? true
          : !/^\S+@\S+\.\S+$/.test(email)
          ? "True"
          : /[A-Z]/g.test(email)
          ? "caps"
          : false,
      password:
        action == "create"
          ? password === ""
            ? true
            : !/[A-Z]/g.test(password.trim())
            ? "True"
            : password.length < 7
            ? "length"
            : false
          : false,
      phonenumber:
        phonenumber === ""
          ? true
          : !/^\d{10}$/.test(phonenumber)
          ? "True"
          : false,
    };
    setErrorObj(err);
    if (!Object.values(err).some((val) => val === true || val == "True")) {
      try {
        setIsLoading(true);
        if (action == "edit") {
          await Axios.put(`user/${id}`, {
            username,
            email,
            phone: phonenumber,
            payment,
            status,
            role,
            user_level: level,
            assigned_to: assintoID,
            ref_id,
          });
          toast.success("User Updated Successfully");
        } else {
          await Axios.post("user/create", {
            username,
            email,
            password,
            phone: phonenumber,
            role,
            payment: "Paid",
            status: "Active",
            created_date: Date.now(),
            created_by: localStorage.getItem("userid"),
            ref_id:
              role == "Employee" ? Math.floor(1000 + Math.random() * 9000) : "",
          });
          toast.success("User Created Successfully");
        }

        navigate(-1);
      } catch (error) {
        toast.success(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };
  // const GetAllUserList = () => {
  //     Axios.get(`/user/list`).then(res => {
  //         const { status, message } = res.data
  //         if (status) {
  //             setUserList(message)
  //         }
  //     }).catch(err => {
  //         const { data } = err.response
  //         toast.error(data.message)
  //         // navigate(-1)
  //     })
  // }
  const GetEmployeeList = () => {
    Axios.get(`user/list/filter/Employee`)
      .then((res) => {
        const { status, message } = res.data;
        if (status) {
          setempList(message);
          // setdialog(false)
        }
      })
      .catch((err) => {
        const { data } = err.response;
        toast.error(data.message);
      });
  };
  useEffect(() => {
    // GetAllUserList()
    GetEmployeeList();
    if (action == "view" || action == "edit") {
      if (action == "view") {
        setdisabled(true);
      }
      Axios.get(`user/${id}`)
        .then((res) => {
          const { status, message } = res.data;
          if (status) {
            setusername(message["username"] ? message["username"] : "");
            setemail(message["email"] ? message["email"] : "");
            setPhonenumber(message["phone"] ? message["phone"] : "");
            setrole(message["role"] ? message["role"] : "");
            setpayment(message["payment"] ? message["payment"] : "");
            setstatus(message["status"] ? message["status"] : "");
            setlevel(message["user_level"] ? message["user_level"] : "");
            setassintoID(message["assigned_to"] ? message["assigned_to"] : "");
            Axios.get(`user/${message["assigned_to"]}`).then((res) => {
              const { status, user } = res.data;
              if (status) {
                setassinto(message["username"] ? message["username"] : "");
                setref_id(message["ref_id"] ? message["ref_id"] : "");
              }
            });
          }
        })
        .catch((err) => {
          const { data } = err.response;
          toast.error(data.message);
          navigate(-1);
        });
    }
  }, []);

  const addAlert = () => {
    Swal.fire({
      title: "Are You Sure ?",
      text: "Close Alert!",
      confirmButtonText:"ok",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showCancelButton:"cancel"
    }).then((result) => {
     navigate(-1);
    
    });
  };
  
  return (
    <Box>
      <Typography variant="h5">User Details</Typography>
      <Divider
        variant="middle"
        sx={{
          margin: { xs: "10px 0px", md: "10px 20px" },
          backgroundColor: "gray",
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <InputLabel sx={{ color: "black", mb: 1 }}>
            Username{" "}
            <Typography variant="span" color="red" component="span">
              *
            </Typography>
          </InputLabel>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            helperText={ErrorObj.username ? "username is Required" : ""}
            error={ErrorObj.username}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel sx={{ color: "black", mb: 1 }}>
            Email{" "}
            <Typography variant="span" color="red" component="span">
              *
            </Typography>
          </InputLabel>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            helperText={
              ErrorObj.email == "True"
                ? "Invalid Email Format"
                : ErrorObj.email == "caps"
                ? "Email must be lowercase"
                : ErrorObj.email
                ? "Email is Required"
                : ""
            }
            error={ErrorObj.email}
            disabled={action == "create" ? false : true}
          />
        </Grid>
        {action == "create" && (
          <Grid item xs={12} md={6}>
            <InputLabel sx={{ color: "black", mb: 1 }}>
              Password{" "}
              <Typography variant="span" color="red" component="span">
                *
              </Typography>
            </InputLabel>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              placeholder="Create New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={
                ErrorObj.password == "length"
                  ? "Password must be or above 8 characters"
                  : ErrorObj.password == "True"
                  ? "Password must need atleast 1 capitalletter"
                  : ErrorObj.password
                  ? "Password is Requirer"
                  : ""
              }
              error={ErrorObj.password}
              disabled={disabled}
            />
          </Grid>
        )}
        {role == "User" && (
          <Grid item xs={12} md={6}>
            <InputLabel sx={{ color: "black", mb: 1 }}>
              Payment{" "}
              <Typography variant="span" color="red" component="span">
                *
              </Typography>
            </InputLabel>
            <Autocomplete
              disablePortal
              size="small"
              fullWidth
              value={payment}
              onChange={(e, value) => setpayment(value)}
              options={["UnPaid", "Paid"]}
              disableClearable
              readOnly={disabled}
              renderInput={(params) => (
                <TextField
                  {...params}
                  disabled={disabled}
                  placeholder="Payment"
                  helperText={ErrorObj.role ? "Level is Required" : ""}
                  error={ErrorObj.role}
                />
              )}
            />
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <InputLabel sx={{ color: "black", mb: 1 }}>
            Phone Number{" "}
            <Typography variant="span" color="red" component="span">
              *
            </Typography>
          </InputLabel>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            placeholder="Enter Your Phone Number"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            helperText={
              ErrorObj.phonenumber == "True"
                ? "Phone Number must be Number Only"
                : ErrorObj.phonenumber
                ? "Phone Number is Required"
                : ""
            }
            error={ErrorObj.phonenumber}
            disabled={disabled}
          />
        </Grid>

        {(action == "create" || role != "User") && (
          <Grid item xs={12} md={6}>
            <InputLabel sx={{ color: "black", mb: 1 }}>
              Role{" "}
              <Typography variant="span" color="red" component="span">
                *
              </Typography>
            </InputLabel>
            <Autocomplete
              size="small"
              fullWidth
              value={role}
              onChange={(e, value) => setrole(value)}
              options={["SuperAdmin", "Employee"]}
              readOnly={disabled}
              disabled={disabled}
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  disabled={disabled}
                  placeholder="Employee"
                  helperText={ErrorObj.role ? "Level is Required" : ""}
                  error={ErrorObj.role}
                />
              )}
            />
          </Grid>
        )}
        {role == "User" && (
          <Grid item xs={12} md={6}>
            <InputLabel sx={{ color: "black", mb: 1 }}>
              Level{" "}
              <Typography variant="span" color="red" component="span">
                *
              </Typography>
            </InputLabel>
            <Autocomplete
              size="small"
              fullWidth
              value={level}
              onChange={(e, value) => setlevel(value)}
              options={["Level-1", "Level-2", "Level-3", "Level-4"]}
              readOnly={disabled}
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  disabled={disabled}
                  placeholder="Level"
                  helperText={ErrorObj.role ? "Level is Required" : ""}
                  error={ErrorObj.role}
                />
              )}
            />
          </Grid>
        )}
        {localStorage.getItem("role") == "Admin" ||
        localStorage.getItem("role") == "SuperAdmin" ? (
          <Grid item xs={12} md={6}>
            <InputLabel sx={{ color: "black", mb: 1 }}>
              Assign to Employee{" "}
              <Typography variant="span" color="red" component="span">
                *
              </Typography>
            </InputLabel>
            <Autocomplete
              options={empList}
              onChange={(e, value) => {
                if (value != null) {
                  setassinto(value["username"]);
                  setassintoID(value["_id"]);
                  setref_id(value["ref_id"]);
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
                  helperText={ErrorObj["assinto"] ? "Employee is Required" : ""}
                  {...params}
                  placeholder="Select Employee"
                />
              )}
            />
          </Grid>
        ) : (
          ""
        )}
      </Grid>
      <Grid item xs={12} textAlign={"end"}>
        <Button
          onClick={addAlert}
          variant="outlined"
          disableElevation
          sx={{
            border: "1px solid #1136B4",
            color: "#1136B4",
            m: "15px",
          }}
          disabled={isLoading}
        >
          Back
        </Button>
        {action == "create" ? (
          <Button
            onClick={handleUser}
            variant="contained"
            disableElevation
            sx={{
              backgroundColor: "#1136B4",
              my: "15px",
              "&:hover": { backgroundColor: "#1136B4" },
            }}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        ) : action == "edit" ? (
          <Button
            onClick={handleUser}
            variant="contained"
            disableElevation
            sx={{
              backgroundColor: "#1136B4",
              my: "15px",
              "&:hover": { backgroundColor: "#1136B4" },
            }}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        ) : (
          ""
        )}
      </Grid>
    </Box>
  );
};

export default UserForm;
