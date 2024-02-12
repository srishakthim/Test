// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   TextField,
//   InputLabel,
//   Button,
//   Typography,
//   Container,
//   Grid,
//   Divider,
//   CircularProgress,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// import Axios from "../../config/axiosConfig";
// import { toast } from "react-toastify";
// import { LoadingButton } from "@mui/lab";
// import PrimaryButton from "../../components/utils/PrimaryButton";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// function Signup() {
//   const navigate = useNavigate();
//   const [username, setusername] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showCPassword, setShowCPassword] = useState(false);
//   const [ref_id, setref_id] = useState("");
//   const [loading, setloading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm_password, setConfirm_password] = useState("");
//   const [errors, setErrors] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirm_password: "",
//     referralID: "",
//   });

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePhone = (phone) => {
//     const phoneRegex = /^\d{10}$/;
//     return phoneRegex.test(phone);
//   };

//   const handleSignup = () => {
//     let formErrors = {};

//     if (!username.trim()) {
//       formErrors.username = "Username is required";
//     }

//     if (!email.trim()) {
//       formErrors.email = "Email is required";
//     } else if (!validateEmail(email)) {
//       formErrors.email = "Enter a valid email";
//     } else if (/[A-Z]/g.test(email)) {
//       formErrors.email = "Email must be lowercase";
//     }

//     if (!phone.trim()) {
//       formErrors.phone = "Phone number is required";
//     } else if (!validatePhone(phone)) {
//       formErrors.phone = "Enter a valid phone number";
//     }

//     if (!password.trim()) {
//       formErrors.password = "Password is required";
//     } else if (password.trim().length < 7) {
//       formErrors.password = "Password must be above 8 characters";
//     } else if (!/[A-Z]/.test(password.trim())) {
//       formErrors.password = "Password must be have 1 capitalletter";
//     }

//     if (!confirm_password.trim()) {
//       formErrors.confirm_password = "Confirm password is required";
//     } else if (confirm_password.trim().length < 7) {
//       formErrors.confirm_password =
//         "Confirm Password must be above 8 characters";
//     } else if (confirm_password !== password) {
//       formErrors.confirm_password = "Passwords do not match";
//     }
//     setErrors(formErrors);

//     if (Object.keys(formErrors).length === 0) {
//       setloading(true);
//       let SignUpdata = {
//         username,
//         email,
//         phone,
//         password,
//         role: "User",
//         ref_id: ref_id,
//         status: "InActive",
//         payment: "UnPaid",
//         created_date: Date.now(),
//       };
//       Axios.post("auth/signup", SignUpdata)
//         .then((res) => {
//           const { status, message, token } = res.data;
//           if (status) {
//             localStorage.setItem("token", token);
//             localStorage.setItem("username", message["username"]);
//             localStorage.setItem("userid", message["_id"]);
//             localStorage.setItem("role", message["role"]);
//             localStorage.setItem("role", message["role"]);
//             localStorage.setItem("user_level", "");
//             if (message["status"] === "Active" && message["role"] === "User") {
//               navigate("/dashboard");
//             } else {
//               if (message["role"] === "User") {
//                 navigate("/waiting");
//               } else {
//                 alert("else");
//                 navigate("/dashboard");
//               }
//             }
//           } else {
//             toast.error(message);
//           }
//         })
//         .catch((err) => {
//           const { data } = err?.response;
//           toast.error(data.message);
//         });
//     }
//   };

//   return (
//     <Box sx={{ p: 1 }}>
//       <Grid
//         container
//         spacing={"2px"}
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "98vh",
//         }}
//       >
//         <Container
//           maxWidth="sm"
//           sx={{
//             border: "1px solid #10309F",
//             minHeight: "700px",
//             borderRadius: "15px",
//             px: "0px !important",
//           }}
//         >
//           <Box
//             sx={{
//               backgroundColor: "#10309F",
//               height: "70px",
//               borderTopRightRadius: "15px",
//               borderTopLeftRadius: "15px",
//               color: "white",
//               textAlign: "center",
//               fontWeight: "900",
//               fontSize: "25px",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             SIGN UP
//           </Box>
//           <Box sx={{ px: 2, py: 1 }}>
//             <Grid container spacing={1}>
//               <Grid item xs={12}>
//                 <Grid container spacing={1} item xs={12}>
//                   <Grid item xs={12}>
//                     <InputLabel sx={{ color: "black" }}>
//                       Username{" "}
//                       <Typography variant="span" color="red" component="span">
//                         *
//                       </Typography>
//                     </InputLabel>

//                     <TextField
//                       sx={{
//                         //backgroundColor: "#D9D9D9",
//                         borderRadius: "50px",
//                         my: "8px",
//                       }}
//                       size="small"
//                       fullWidth
//                       variant="outlined"
//                       required
//                       placeholder="Username"
//                       value={username}
//                       onChange={(e) => setusername(e.target.value)}
//                       error={Boolean(errors.username)}
//                       helperText={errors.username}
//                     />
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={12}>
//                 <InputLabel sx={{ color: "black" }}>
//                   Email{" "}
//                   <Typography variant="span" color="red" component="span">
//                     *
//                   </Typography>
//                 </InputLabel>

//                 <TextField
//                   sx={{
//                     //backgroundColor: "#D9D9D9",
//                     borderRadius: "50px",
//                     my: "8px",
//                   }}
//                   size="small"
//                   fullWidth
//                   placeholder="user@example.com"
//                   variant="outlined"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   error={Boolean(errors.email)}
//                   helperText={errors.email}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <InputLabel sx={{ color: "black" }}>
//                   Phone Number{" "}
//                   <Typography variant="span" color="red" component="span">
//                     *
//                   </Typography>
//                 </InputLabel>
//                 <TextField
//                   sx={{ borderRadius: "30px", my: "8px" }}
//                   size="small"
//                   fullWidth
//                   variant="outlined"
//                   required
//                   placeholder="9974638563"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   error={Boolean(errors.phone)}
//                   helperText={errors.phone}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <InputLabel sx={{ color: "black" }}>
//                   Create Password{" "}
//                   <Typography variant="span" color="red" component="span">
//                     *
//                   </Typography>
//                 </InputLabel>
//                 <TextField
//                   sx={{ borderRadius: "30px", my: "8px" }}
//                   size="small"
//                   fullWidth
//                   variant="outlined"
//                   required
//                   placeholder="Create new Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   error={Boolean(errors.password)}
//                   helperText={errors.password}
//                   type={showPassword ? "text" : "password"}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={() => setShowPassword(!showPassword)}
//                           edge="end"
//                         >
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <InputLabel sx={{ color: "black" }}>
//                   Confirm Password{" "}
//                   <Typography variant="span" color="red" component="span">
//                     *
//                   </Typography>
//                 </InputLabel>
//                 <TextField
//                   sx={{ borderRadius: "30px", my: "8px" }}
//                   size="small"
//                   fullWidth
//                   variant="outlined"
//                   required
//                   placeholder="Confirm Your Password"
//                   value={confirm_password}
//                   type={showCPassword ? "text" : "password"}
//                   onChange={(e) => setConfirm_password(e.target.value)}
//                   error={Boolean(errors.confirm_password)}
//                   helperText={errors.confirm_password}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={() => setShowCPassword(!showCPassword)}
//                           edge="end"
//                         >
//                           {showCPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <InputLabel sx={{ color: "black" }}>Referal ID</InputLabel>
//                 <TextField
//                   sx={{ borderRadius: "30px", my: "8px" }}
//                   size="small"
//                   fullWidth
//                   variant="outlined"
//                   required
//                   placeholder="referal id"
//                   value={ref_id}
//                   onChange={(e) => setref_id(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <PrimaryButton loading={loading} func={handleSignup}>
//                   Sign Up
//                 </PrimaryButton>
//                 <Typography
//                   sx={{
//                     textAlign: "center",
//                     marginTop: "15px",

//                     color: "#8A9497",
//                   }}
//                 >
//                   Already have an account ?{" "}
//                   <Link to="/auth/signin">Login </Link>
//                 </Typography>
//                 {/* <Divider
//                                     sx={{
//                                         textAlign: "center",
//                                         color: "#8A9497",
//                                         my: "10px"

//                                     }}
//                                 >
//                                     OR
//                                 </Divider> */}

//                 {/* <Box sx={{ mt: "10px", display: "flex", justifyContent: "center" }}>
//                                     <GoogleOAuthProvider clientId="<your_client_id>">
//                                         <GoogleLogin
//                                             onSuccess={credentialResponse => {
//                                                 console.log(credentialResponse);
//                                             }}
//                                             onError={() => {
//                                                 console.log('Login Failed');
//                                             }}
//                                         />
//                                     </GoogleOAuthProvider>
//                                 </Box> */}
//               </Grid>
//             </Grid>
//           </Box>
//         </Container>
//       </Grid>
//     </Box>
//   );
// }

// export default Signup;

import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputLabel,
  Button,
  Typography,
  Container,
  Grid,
  Divider,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Axios from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import PrimaryButton from "../../components/utils/PrimaryButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [ref_id, setRef_id] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    referralID: "",
  });

  useEffect(() => {
    // Validation for Email
    if (email.trim() && !validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Enter a valid email",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }

    // Validation for Phone
    if (phone.trim() && !validatePhone(phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Enter a valid phone number",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
    }

    // Validation for Password
    if (password.trim() && password.trim().length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be above 8 characters",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }

    // Validation for Confirm Password
    if (confirm_password.trim() && confirm_password !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirm_password: "Passwords do not match",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirm_password: "" }));
    }
  }, [email, phone, password, confirm_password]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSignup = () => {
    let formErrors = {};

    if (!username.trim()) {
      formErrors.username = "Username is required";
    }

    if (!email.trim()) {
      formErrors.email = "Email is required";
    }

    if (!phone.trim()) {
      formErrors.phone = "Phone number is required";
    }

    if (!password.trim()) {
      formErrors.password = "Password is required";
    }

    if (!confirm_password.trim()) {
      formErrors.confirm_password = "Confirm password is required";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      let SignUpdata = {
        username,
        email,
        phone,
        password,
        role: "User",
        ref_id: ref_id,
        status: "InActive",
        payment: "UnPaid",
        created_date: Date.now(),
      };
      Axios.post("auth/signup", SignUpdata)
        .then((res) => {
          const { status, message, token } = res.data;
          if (status) {
            localStorage.setItem("token", token);
            localStorage.setItem("username", message["username"]);
            localStorage.setItem("userid", message["_id"]);
            localStorage.setItem("role", message["role"]);
            localStorage.setItem("role", message["role"]);
            localStorage.setItem("user_level", "");
            if (message["status"] === "Active" && message["role"] === "User") {
              navigate("/dashboard");
            } else {
              if (message["role"] === "User") {
                navigate("/waiting");
              } else {
                alert("else");
                navigate("/dashboard");
              }
            }
          } else {
            toast.error(message);
          }
        })
        .catch((err) => {
          const { data } = err?.response;
          toast.error(data.message);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Grid
        container
        spacing={"2px"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "98vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            border: "1px solid #10309F",
            minHeight: "700px",
            borderRadius: "15px",
            px: "0px !important",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#10309F",
              height: "70px",
              borderTopRightRadius: "15px",
              borderTopLeftRadius: "15px",
              color: "white",
              textAlign: "center",
              fontWeight: "900",
              fontSize: "25px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            SIGN UP
          </Box>
          <Box sx={{ px: 2, py: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Grid container spacing={1} item xs={12}>
                  <Grid item xs={12}>
                    <InputLabel sx={{ color: "black" }}>
                      Username{" "}
                      <Typography variant="span" color="red" component="span">
                        *
                      </Typography>
                    </InputLabel>

                    <TextField
                      sx={{
                        //backgroundColor: "#D9D9D9",
                        borderRadius: "50px",
                        my: "8px",
                      }}
                      size="small"
                      fullWidth
                      variant="outlined"
                      required
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      error={Boolean(errors.username)}
                      helperText={errors.username}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ color: "black" }}>
                  Email{" "}
                  <Typography variant="span" color="red" component="span">
                    *
                  </Typography>
                </InputLabel>

                <TextField
                  sx={{
                    //backgroundColor: "#D9D9D9",
                    borderRadius: "50px",
                    my: "8px",
                  }}
                  size="small"
                  fullWidth
                  placeholder="user@example.com"
                  variant="outlined"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ color: "black" }}>
                  Phone Number{" "}
                  <Typography variant="span" color="red" component="span">
                    *
                  </Typography>
                </InputLabel>
                <TextField
                  sx={{ borderRadius: "30px", my: "8px" }}
                  size="small"
                  fullWidth
                  variant="outlined"
                  required
                  placeholder="9974638563"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ color: "black" }}>
                  Create Password{" "}
                  <Typography variant="span" color="red" component="span">
                    *
                  </Typography>
                </InputLabel>
                <TextField
                  sx={{ borderRadius: "30px", my: "8px" }}
                  size="small"
                  fullWidth
                  variant="outlined"
                  required
                  placeholder="Create new Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  type={showPassword ? "text" : "password"}
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
              <Grid item xs={12}>
                <InputLabel sx={{ color: "black" }}>
                  Confirm Password{" "}
                  <Typography variant="span" color="red" component="span">
                    *
                  </Typography>
                </InputLabel>
                <TextField
                  sx={{ borderRadius: "30px", my: "8px" }}
                  size="small"
                  fullWidth
                  variant="outlined"
                  required
                  placeholder="Confirm Your Password"
                  value={confirm_password}
                  type={showCPassword ? "text" : "password"}
                  onChange={(e) => setConfirm_password(e.target.value)}
                  error={Boolean(errors.confirm_password)}
                  helperText={errors.confirm_password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowCPassword(!showCPassword)}
                          edge="end"
                        >
                          {showCPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ color: "black" }}>Referal ID</InputLabel>
                <TextField
                  sx={{ borderRadius: "30px", my: "8px" }}
                  size="small"
                  fullWidth
                  variant="outlined"
                  required
                  placeholder="referal id"
                  value={ref_id}
                  onChange={(e) => setRef_id(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <PrimaryButton loading={loading} func={handleSignup}>
                  Sign Up
                </PrimaryButton>
                <Typography
                  sx={{
                    textAlign: "center",
                    marginTop: "15px",

                    color: "#8A9497",
                  }}
                >
                  Already have an account ?{" "}
                  <Link to="/auth/signin">Login </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </Box>
  );
}

export default Signup;
