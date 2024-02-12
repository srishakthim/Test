import React, { useEffect, useState } from "react";
import { Typography, Grid, Box, Button } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts";
import Axios from "../config/axiosConfig";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Dashboard() {
  const [AllUser, setAllUser] = useState("");
  const [ExpiredUser, setExpiredUser] = useState("");
  const [LevelOneUser, setLevelOneUser] = useState("");
  const [LevelTwoUser, setLevelTwoUser] = useState("");
  const [LevelThreeUser, setLevelThreeUser] = useState("");
  const [LevelFourUser, setLevelFourUser] = useState("");
  const [UnPaidUsers, setUnPaidUsers] = useState("");
  const [SuperAdmin, setSuperAdmin] = useState("");
  const [Employee, setEmployee] = useState("");
  const GetData = () => {
    Axios.get(`dash/dashboard/${localStorage.getItem("userid")}`)
      .then((res) => {
        const { status, message } = res.data;
        if (status) {
          setAllUser(message["AllUser"] ? message["AllUser"] : "");
          setLevelOneUser(message["level1"] ? message["level1"] : "");
          setLevelTwoUser(message["level2"] ? message["level2"] : "");
          setLevelThreeUser(message["level3"] ? message["level3"] : "");
          setLevelFourUser(message["level4"] ? message["level4"] : "");
          setExpiredUser(
            message["setExpiredUser"] ? message["setExpiredUser"] : ""
          );
          setUnPaidUsers(message["unpaid"] ? message["unpaid"] : "");
          setSuperAdmin(message["super_admin"] ? message["super_admin"] : "");
          setEmployee(message["employee"] ? message["employee"] : "");
        } else {
          toast.error(message);
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
  useEffect(() => {
    GetData();
  });
  return (
    <Box>
      <Grid container spacing={2} justify="center" mb={2}>
        <Grid
          item
          xs={12}
          sm={6}
          md={localStorage.getItem("role") == "Employee" ? 6 : 3}
        >
          <Box
            sx={{
              backgroundColor: "#ffff",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: "12px",
              p: "10px 15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "#10309F", fontSize: "18px" }}
              >
                <Link style={{ textDecoration: "none" }} to="/users/allusers">
                  {" "}
                  All User
                </Link>
              </Typography>
              <Typography variant="h4">{AllUser || 0}</Typography>
              <Typography variant="h6">
                Since last week <span style={{ color: "#007156" }}></span>
              </Typography>
            </Box>
          </Box>
        </Grid>

        {localStorage.getItem("role") != "Employee" && (
          <Grid
            sm={6}
            item
            xs={12}
            md={localStorage.getItem("role") == "Employee" ? 6 : 3}
          >
            <Box
              sx={{
                backgroundColor: "#ffff",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                borderRadius: "12px",
                p: "10px 15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{ color: "#10309F", fontSize: "18px" }}
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/users/SuperAdmin"
                  >
                    {" "}
                    Super Admin
                  </Link>
                </Typography>
                <Typography variant="h4">{SuperAdmin || 0}</Typography>
                <Typography variant="h6">
                  Since last week <span style={{ color: "#007156" }}></span>
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
        {localStorage.getItem("role") != "Employee" && (
          <Grid
            item
            sm={6}
            xs={12}
            md={localStorage.getItem("role") == "Employee" ? 6 : 3}
          >
            <Box
              sx={{
                backgroundColor: "#ffff",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                borderRadius: "12px",
                p: "10px 15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{ color: "#10309F", fontSize: "18px" }}
                >
                  <Link style={{ textDecoration: "none" }} to="/users/Employee">
                    {" "}
                    Employee
                  </Link>
                </Typography>
                <Typography variant="h4">{Employee || 0}</Typography>
                <Typography variant="h6">
                  Since last week <span style={{ color: "#007156" }}></span>
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}

        <Grid
          item
          xs={12}
          sm={6}
          md={localStorage.getItem("role") == "Employee" ? 6 : 3}
        >
          <Box
            sx={{
              backgroundColor: "#ffff",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: "12px",
              p: "10px 15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "#10309F", fontSize: "18px" }}
              >
                Expired Users
              </Typography>
              <Typography variant="h4">{UnPaidUsers || 0}</Typography>
              <Typography variant="h6">
                Since last week <span style={{ color: "#007156" }}></span>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} justify="center" mb={2}>
        <Grid item xs={12} md={3} sm={6}>
          <Box
            sx={{
              backgroundColor: "#ffff",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: "12px",
              p: "10px 15px",
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#10309F", fontSize: "18px" }}
            >
              <Link style={{ textDecoration: "none" }} to="/users/Level-1">
                {" "}
                Level 1
              </Link>
            </Typography>
            <Typography variant="h4">{LevelOneUser || 0}</Typography>
            <Typography variant="h6">
              Since last week{" "}
              <span style={{ color: "#007156", fontSize: "14px" }}></span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <Box
            sx={{
              backgroundColor: "#ffff",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: "12px",
              p: "10px 15px",
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#10309F", fontSize: "18px" }}
            >
              <Link style={{ textDecoration: "none" }} to="/users/Level-2">
                {" "}
                Level 2
              </Link>
            </Typography>
            <Typography variant="h4">{LevelTwoUser || 0}</Typography>
            <Typography variant="h6">
              Since last week{" "}
              <span style={{ color: "#007156", fontSize: "14px" }}></span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <Box
            sx={{
              backgroundColor: "#ffff",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: "12px",
              p: "10px 15px",
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#10309F", fontSize: "18px" }}
            >
              <Link style={{ textDecoration: "none" }} to="/users/Level-3">
                {" "}
                Level 3
              </Link>
            </Typography>
            <Typography variant="h4">{LevelThreeUser || 0}</Typography>
            <Typography variant="h6">
              Since last week{" "}
              <span style={{ color: "#007156", fontSize: "14px" }}></span>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <Box
            sx={{
              backgroundColor: "#ffff",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: "12px",
              p: "10px 15px",
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#10309F", fontSize: "18px" }}
            >
              <Link style={{ textDecoration: "none" }} to="/users/Level-4">
                {" "}
                Level 4
              </Link>
            </Typography>
            <Typography variant="h4">{LevelFourUser || 0}</Typography>
            <Typography variant="h6">
              Since last week{" "}
              <span style={{ color: "#007156", fontSize: "14px" }}></span>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BarChart
            sx={{ border: "#10309f 1px solid", borderRadius: "12px" }}
            xAxis={[
              {
                id: "barCategories",
                data: ["Level 1", "Level 2", "Level 3", "Level 4"],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: [
                  LevelOneUser,
                  LevelTwoUser,
                  LevelThreeUser,
                  LevelFourUser,
                ],
                color: "#10309f",
                barWidth: 15,
              },
            ]}
            height={300}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LineChart
            sx={{
              border: "#10309f 1px solid",
              borderRadius: "12px",
              width: "100%",
            }}
            xAxis={[
              {
                data: ["Level 1", "Level 2", "Level 3", "Level 4"],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: [
                  LevelOneUser,
                  LevelTwoUser,
                  LevelThreeUser,
                  LevelFourUser,
                ],
                color: "#10309f",
              },
            ]}
            height={300}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
