import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Axios from "../../config/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoopIcon from "@mui/icons-material/Loop";
function LoadingPage() {
  const navigate = useNavigate();
  let intervel = null;
  const [access, setAccess] = useState(true);
  const location = useLocation();

  if (localStorage.getItem("userid") && access) {
    intervel = setInterval(() => {
      Axios.get(`user/${localStorage.getItem("userid")}`)
        .then((res) => {
          const { status, message } = res.data;
          if (status) {
            if (message["user_level"] == "") {
            } else {
              localStorage.setItem("user_level", message["user_level"]);
              localStorage.setItem("managed_by", message["assigned_to"]);
              setAccess(false);
              navigate("/dashboard");
              clearInterval(intervel);
            }
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
    }, 5000);
  }
  const LogoutFunction = () => {
    clearInterval(intervel);

    localStorage.clear();
    navigate("/auth/signin");
  };
  useEffect(() => {
    if (localStorage.getItem("user_level")) {
      setAccess(false);
    }
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Container maxWidth="sm">
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              border: "#10309F 1px solid",
              borderRadius: "20px",
              maxHeight: "500px",
              minHeight: "450px",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#10309f",
                color: "#ffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderTopRightRadius: "20px",
                borderTopLeftRadius: "20px",
                height: "80px",
              }}
            >
              {/* <Typography sx={{ fontWeight: 700, fontSize: "28px" }}>
                USER
              </Typography> */}
              <Typography sx={{ fontWeight: 700, fontSize: "28px" }}>
                Hi {localStorage.getItem("username")}
              </Typography>

              {/* <Typography sx={{ fontWeight: 700, fontSize: "28px" }}>
              {  USER}
              </Typography> */}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mt: 5,
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: "18px", md: "22px" } }}
              >
                You are Registered
              </Typography>

              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  py: 3,
                  rotate: { Infinity },
                }}
              >
                <LoopIcon
                  sx={{
                    height: "80px",
                    width: "80px",
                    color: "#10309f",
                    animation: "spin 2s linear infinite",
                    "@keyframes spin": {
                      "0%": {
                        transform: "rotate(360deg)",
                      },
                      "100%": {
                        transform: "rotate(0deg)",
                      },
                    },
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: "18px", md: "26px" }, mt: 2 }}
              >
                Waiting For Apporval
              </Typography>
              <Button
                variant="contained"
                disableElevation
                sx={{
                  color: "white",
                  fontSize: "12px",
                  backgroundColor: "#10309F",
                  mt: 1,
                  "&:hover": {
                    backgroundColor: "#10309F",
                    color: "#fff",
                  },
                }}
                onClick={LogoutFunction}
              >
                Logout
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default LoadingPage;
