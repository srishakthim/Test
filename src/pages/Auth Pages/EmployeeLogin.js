import React, { useState } from "react";
import {
  Box,
  TextField,
  InputLabel,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Grid,
  Container,
  FormLabel,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Axios from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import PrimaryButton from "../../components/utils/PrimaryButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleLogin = () => {
    setLoading(true);
    let emailError = "";
    let passwordError = "";

    if (!email) {
      emailError = "Email is required";
    } else if (!emailRegex.test(email)) {
      emailError = "Enter a valid email";
    } else if (/[A-Z]/g.test(email)) {
      emailError = "Email must be lowercase";
    }

    if (!password) {
      passwordError = "Password is required";
    } else if (password.length < 8) {
      passwordError = "Password must be at least 8 characters";
    }

    setError({
      email: emailError,
      password: passwordError,
    });

    if (!emailError && !passwordError) {
      let LoginData = {
        email,
        password,
      };
      Axios.post("/auth/employee/login", LoginData, { withCredentials: true })
        .then((res) => {
          const { status, message, token } = res.data;
          if (status) {
            localStorage.setItem("token", token);
            localStorage.setItem("username", message["username"]);
            localStorage.setItem("userid", message["_id"]);
            localStorage.setItem("role", message["role"]);
            localStorage.setItem("ref_id", message["ref_id"]);
            let y =
              message["role"] === "User"
                ? localStorage.setItem("user_level", message["user_level"])
                : "";
            let x =
              message["role"] === "User"
                ? localStorage.setItem("managed_by", message["assigned_to"])
                : "";
            if (message["role"] === "User" && message["status"] === "Active") {
              navigate("/dashboard");
            } else {
              if (message["role"] === "User") {
                navigate("/waiting");
              } else {
                navigate("/dashboard");
              }
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          if (err?.response) {
            const { data } = err?.response;
            toast.error(data.message);
          } else {
            toast.error("Internal Server Error");
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError((prevError) => ({
      ...prevError,
      email: "",
    }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError((prevError) => ({
      ...prevError,
      password: "",
    }));
  };

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Grid
        container
        spacing={"2px"}
        sx={{ margin: "auto", alignItems: "center", height: "100vh", px: 1 }}
      >
        <Container
          maxWidth="sm"
          sx={{
            border: "1px solid #10309F",
            borderRadius: "15px",
            px: "0px !important",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#10309F",
              height: "100px",
              borderTopRightRadius: "15px",
              borderTopLeftRadius: "15px",
              color: "white",
              textAlign: "center",
              fontWeight: "900",
              fontSize: "25px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" component="h5">
              EMPLOYEE LOGIN
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <FormLabel sx={{ color: "black" }}>Email</FormLabel>

              <TextField
                size="small"
                onKeyDown={handleKeyPress}
                fullWidth
                variant="outlined"
                required
                placeholder="user@example.com"
                value={email}
                onChange={handleEmailChange}
                helperText={error.email}
                error={Boolean(error.email)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel sx={{ color: "black" }}>Password</FormLabel>
              <TextField
                size="small"
                fullWidth
                onKeyDown={handleKeyPress}
                variant="outlined"
                required
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handlePasswordChange}
                helperText={error.password}
                error={Boolean(error.password)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                my: 2,
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox size="small" sx={{ pr: "5px" }} defaultChecked />
                  }
                  label={
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{
                        fontSize: { xs: "12px", md: "16px" },
                        display: "block",
                        fontWeight: "400",
                      }}
                    >
                      Remember Me
                    </Typography>
                  }
                />
              </FormGroup>
              <Link to="/auth/forget">Forget Password</Link>
            </Grid>
            <Grid>
              <PrimaryButton loading={loading} func={handleLogin}>
                Login
              </PrimaryButton>
              <Typography
                sx={{
                  textAlign: "center",
                  my: "15px",
                }}
              >
                Don't have an account ? <Link to="/auth/signup">SignUp </Link>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
             <Button> <Link style={{ textDecoration: "none" }} to="/auth/admin/login">Admin Login </Link></Button>
              <Button> <Link style={{ textDecoration: "none" }} to="/auth/user/login">User Login </Link></Button>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </Box>
  );
};

export default Login;
