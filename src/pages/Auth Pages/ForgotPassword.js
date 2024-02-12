// import React, { useState } from "react";
// import {
//     Box,
//     Grid,
//     Typography,
//     FormLabel,
//     TextField,
//     Button,
//     Container,
// } from "@mui/material";
// import Axios from "../../config/axiosConfig";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// function ForgotPassword() {
//     const navigate = useNavigate();
//     const [Email, setEmail] = useState("");
//     const [Password, setPassword] = useState("");
//     const [ErrorObj, setErrorObj] = useState({
//         Email: false,
//         Password: false
//     });

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex

//     const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Password regex (Minimum 8 characters, at least one letter and one number)

//     const ChangePassword = () => {
//         let err = {
//             Email: Email === "" || !emailRegex.test(Email),
//             Password: Password === "" || !passwordRegex.test(Password)
//         };

//         if (Object.values(err).some(val => val === true)) {
//             setErrorObj(err);
//         } else {
//             setErrorObj(err);
//             let Data = {
//                 email: Email,
//                 password: Password
//             };

//             Axios.post("/auth/forgotpassword", Data).then(res => {
//                 const { status, message, token } = res.data;
//                 if (status) {
//                     toast.success("Password change Successfully");
//                     navigate("/auth/signin");
//                 } else {
//                     toast.error(message);
//                 }
//             }).catch(err => {
//                 const { data } = err?.response;
//                 toast.error(data.message);
//             });
//         }
//     };

//     return (
//         <Box sx={{ overflow: "hidden" }}>
//             <Grid
//                 container
//                 spacing={"2px"}
//                 sx={{ margin: "auto", alignItems: "center", height: "100vh", px: 1 }}
//             >
//                 <Container
//                     maxWidth="sm"
//                     sx={{
//                         border: "1px solid #10309F",
//                         pb: 3,
//                         borderRadius: "15px",
//                         px: "0px !important",
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             backgroundColor: "#10309F",
//                             height: "60px",
//                             borderTopRightRadius: "15px",
//                             borderTopLeftRadius: "15px",
//                             color: "white",
//                             textAlign: "center",
//                             fontWeight: "900",
//                             fontSize: "25px",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                         }}
//                     >
//                         <Typography variant="h5" component="h5">Forgot Password</Typography>
//                     </Box>
//                     <Box sx={{ px: 2, display: "flex", flexDirection: "column", justifyContent: "center" }}>
//                         <Grid item xs={12} sx={{ mb: 2, mt: 3 }}>
//                             <FormLabel sx={{ color: "black" }}>
//                                 Email
//                             </FormLabel>
//                             <TextField
//                                 size="small"
//                                 fullWidth
//                                 variant="outlined"
//                                 required
//                                 placeholder="Email"
//                                 value={Email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 helperText={ErrorObj.Email ? "Enter a valid email address" : ""}
//                                 error={ErrorObj.Email}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sx={{ mb: 2, }}>
//                             <FormLabel sx={{ color: "black" }}>
//                                 New Password
//                             </FormLabel>
//                             <TextField
//                                 size="small"
//                                 fullWidth
//                                 variant="outlined"
//                                 required
//                                 placeholder="New Password"
//                                 value={Password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 helperText={ErrorObj.Password ? "Password must be at least 8 characters and contain at least one captial letter and one number" : ""}
//                                 error={ErrorObj.Password}
//                             />
//                         </Grid>
//                         <Grid>
//                             <Button
//                                 onClick={ChangePassword}
//                                 sx={{
//                                     color: "white",
//                                     fontWeight: "600",
//                                     fontSize: "15px",
//                                     backgroundColor: "#10309F",
//                                     textTransform: "none",
//                                     width: "100%",
//                                     borderRadius: "6px",
//                                     "&:hover": {
//                                         backgroundColor: "#10309F",
//                                         color: "#fff",
//                                     },
//                                 }}
//                             >
//                                 Change Password
//                             </Button>
//                             <Typography
//                                 sx={{
//                                     textAlign: "center",
//                                     mt: "15px",
//                                 }}
//                             >
//                                 Don't have an account ? <Link to="/auth/signup">SignUp </Link>
//                             </Typography>
//                         </Grid>
//                     </Box>
//                 </Container>
//             </Grid>
//         </Box>
//     );
// };

// export default ForgotPassword;

// import React, { useState } from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   FormLabel,
//   TextField,
//   Button,
//   Container,
// } from "@mui/material";
// import Axios from "../../config/axiosConfig";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// function ForgotPassword() {
//   const navigate = useNavigate();
//   const [Email, setEmail] = useState("");
//   const [Password, setPassword] = useState("");
//   const [ErrorObj, setErrorObj] = useState({
//     Email: false,
//     Password: false,
//   });

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex

//   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Password regex (Minimum 8 characters, at least one letter and one number)

//   const handleInputChange = (field, value) => {
//     // Reset the corresponding error when the input changes
//     setErrorObj((prevErrors) => ({ ...prevErrors, [field]: false }));

//     // Update the input value
//     switch (field) {
//       case "Email":
//         setEmail(value);
//         break;
//       case "Password":
//         setPassword(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const ChangePassword = () => {
//     let err = {
//       Email: Email === "" || !emailRegex.test(Email),
//       Password: Password === "" || !passwordRegex.test(Password),
//     };

//     if (Object.values(err).some((val) => val === true)) {
//       setErrorObj(err);
//     } else {
//       setErrorObj(err);
//       let Data = {
//         email: Email,
//         password: Password,
//       };

//       Axios.post("/auth/forgotpassword", Data)
//         .then((res) => {
//           const { status, message, token } = res.data;
//           if (status) {
//             toast.success("Password change Successfully");
//             navigate("/auth/signin");
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
//     <Box sx={{ overflow: "hidden" }}>
//       <Grid
//         container
//         spacing={"2px"}
//         sx={{
//           margin: "auto",
//           alignItems: "center",
//           height: "100vh",
//           px: 1,
//         }}
//       >
//         <Container
//           maxWidth="sm"
//           sx={{
//             border: "1px solid #10309F",
//             pb: 3,
//             borderRadius: "15px",
//             px: "0px !important",
//           }}
//         >
//           <Box
//             sx={{
//               backgroundColor: "#10309F",
//               height: "60px",
//               borderTopRightRadius: "15px",
//               borderTopLeftRadius: "15px",
//               color: "white",
//               textAlign: "center",
//               fontWeight: "900",
//               fontSize: "25px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Typography variant="h5" component="h5">
//               Forgot Password
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               px: 2,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//             }}
//           >
//             <Grid item xs={12} sx={{ mb: 2, mt: 3 }}>
//               <FormLabel sx={{ color: "black" }}>Username</FormLabel>
//               <TextField
//                 size="small"
//                 fullWidth
//                 variant="outlined"
//                 required
//                 placeholder="Username"
//                 value={Email}
//                 onChange={(e) => handleInputChange("Email", e.target.value)}
//                 helperText={ErrorObj.Email ? "Enter a valid email address" : ""}
//                 error={ErrorObj.Email}
//               />
//             </Grid>
//             <Grid item xs={12} sx={{ mb: 2 }}>
//               <FormLabel sx={{ color: "black" }}>Phone Number</FormLabel>
//               <TextField
//                 size="small"
//                 fullWidth
//                 variant="outlined"
//                 required
//                 placeholder="9988770011"
//                 value={Email}
//                 onChange={(e) => handleInputChange("Email", e.target.value)}
//                 helperText={ErrorObj.Email ? "Enter a valid email address" : ""}
//                 error={ErrorObj.Email}
//               />
//             </Grid>
//             <Grid item xs={12} sx={{ mb: 2 }}>
//               <FormLabel sx={{ color: "black" }}>Ref ID</FormLabel>
//               <TextField
//                 size="small"
//                 fullWidth
//                 variant="outlined"
//                 required
//                 placeholder="1111"
//                 value={Email}
//                 onChange={(e) => handleInputChange("Email", e.target.value)}
//                 helperText={ErrorObj.Email ? "Enter a valid email address" : ""}
//                 error={ErrorObj.Email}
//               />
//             </Grid>
//             <Grid item xs={12} sx={{ mb: 2 }}>
//               <FormLabel sx={{ color: "black" }}>Email</FormLabel>
//               <TextField
//                 size="small"
//                 fullWidth
//                 variant="outlined"
//                 required
//                 placeholder="Email"
//                 value={Email}
//                 onChange={(e) => handleInputChange("Email", e.target.value)}
//                 helperText={ErrorObj.Email ? "Enter a valid email address" : ""}
//                 error={ErrorObj.Email}
//               />
//             </Grid>
//             <Grid item xs={12} sx={{ mb: 2 }}>
//               <FormLabel sx={{ color: "black" }}>New Password</FormLabel>
//               <TextField
//                 size="small"
//                 fullWidth
//                 variant="outlined"
//                 required
//                 placeholder="New Password"
//                 value={Password}
//                 onChange={(e) => handleInputChange("Password", e.target.value)}
//                 helperText={
//                   ErrorObj.Password
//                     ? "Password must be at least 8 characters and contain at least one capital letter and one number"
//                     : ""
//                 }
//                 error={ErrorObj.Password}
//               />
//             </Grid>
//             <Grid>
//               <Button
//                 onClick={ChangePassword}
//                 sx={{
//                   color: "white",
//                   fontWeight: "600",
//                   fontSize: "15px",
//                   backgroundColor: "#10309F",
//                   textTransform: "none",
//                   width: "100%",
//                   borderRadius: "6px",
//                   "&:hover": {
//                     backgroundColor: "#10309F",
//                     color: "#fff",
//                   },
//                 }}
//               >
//                 Change Password
//               </Button>
//               <Typography
//                 sx={{
//                   textAlign: "center",
//                   mt: "15px",
//                 }}
//               >
//                 Don't have an account ? <Link to="/auth/signup">SignUp </Link>
//               </Typography>
//             </Grid>
//           </Box>
//         </Container>
//       </Grid>
//     </Box>
//   );
// }

// export default ForgotPassword;

import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  FormLabel,
  TextField,
  Button,
  Container,
} from "@mui/material";
import Axios from "../../config/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    Username: "",
    PhoneNumber: "",
    RefID: "",
  });
  const [ErrorObj, setErrorObj] = useState({
    Email: false,
    Password: false,
    Username: false,
    PhoneNumber: false,
    RefID: false,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Password regex (Minimum 8 characters, at least one letter and one number)

  const handleInputChange = (field, value) => {
    // Reset the corresponding error when the input changes
    setErrorObj((prevErrors) => ({ ...prevErrors, [field]: false }));

    // Update the input value
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value.trimStart(), // Trim starting whitespaces for the username
    }));
  };

  const ChangePassword = () => {
    let err = {
      Email: formData.Email === "" || !emailRegex.test(formData.Email),
      Password:
        formData.Password === "" || !passwordRegex.test(formData.Password),
      Username: formData.Username.trim() === "" || /\s/.test(formData.Username), // Check for whitespaces in the username
      PhoneNumber:
        formData.PhoneNumber.trim() === "" ||
        formData.PhoneNumber.trim().length !== 10 || // Check if the length is exactly 10 digits
        isNaN(formData.PhoneNumber.trim()), // Check if it's a valid number
      RefID: formData.RefID === "",
    };

    if (Object.values(err).some((val) => val === true)) {
      setErrorObj(err);
    } else {
      setErrorObj(err);
      let Data = {
        email: formData.Email,
        password: formData.Password,
        username: formData.Username,
        phone: formData.PhoneNumber,
        refID: formData.RefID,
      };

      Axios.post("/auth/forgotpassword", Data)
        .then((res) => {
          const { status, message, token } = res.data;
          if (status) {
            toast.success("Password change Successfully");
            navigate("/auth/signin");
          } else {
            toast.error(message);
          }
        })
        .catch((err) => {
          const { data } = err?.response;
          toast.error(data.message);
        });
    }
  };

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Grid
        container
        spacing={"2px"}
        sx={{
          margin: "auto",
          alignItems: "center",
          height: "100vh",
          px: 1,
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            border: "1px solid #10309F",
            pb: 3,
            borderRadius: "15px",
            px: "0px !important",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#10309F",
              height: "60px",
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
              Forgot Password
            </Typography>
          </Box>
          <Box
            sx={{
              px: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Grid item xs={12} sx={{ mb: 2, mt: 3 }}>
              <FormLabel sx={{ color: "black" }}>Username</FormLabel>
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                required
                placeholder="Username"
                value={formData.Username}
                onChange={(e) => handleInputChange("Username", e.target.value)}
                helperText={
                  ErrorObj.Username
                    ? "Username should not start with whitespace"
                    : ""
                }
                error={ErrorObj.Username}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <FormLabel sx={{ color: "black" }}>Phone Number</FormLabel>
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                required
                placeholder="9988770011"
                value={formData.PhoneNumber}
                onChange={(e) =>
                  handleInputChange("PhoneNumber", e.target.value)
                }
                helperText={
                  ErrorObj.PhoneNumber
                    ? "Phone number should be exactly 10 digits"
                    : ""
                }
                error={ErrorObj.PhoneNumber}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <FormLabel sx={{ color: "black" }}>Ref ID</FormLabel>
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                required
                placeholder="1111"
                value={formData.RefID}
                onChange={(e) => handleInputChange("RefID", e.target.value)}
                helperText={ErrorObj.RefID ? "Ref ID is required" : ""}
                error={ErrorObj.RefID}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <FormLabel sx={{ color: "black" }}>Email</FormLabel>
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                required
                placeholder="user@example.com"
                value={formData.Email}
                onChange={(e) => handleInputChange("Email", e.target.value)}
                helperText={ErrorObj.Email ? "Enter a valid email address" : ""}
                error={ErrorObj.Email}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <FormLabel sx={{ color: "black" }}>New Password</FormLabel>
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                required
                placeholder="New Password"
                value={formData.Password}
                onChange={(e) => handleInputChange("Password", e.target.value)}
                helperText={
                  ErrorObj.Password
                    ? "Password must be at least 8 characters and contain at least one capital letter and one number"
                    : ""
                }
                error={ErrorObj.Password}
              />
            </Grid>
            <Grid>
              <Button
                onClick={ChangePassword}
                sx={{
                  color: "white",
                  fontWeight: "600",
                  fontSize: "15px",
                  backgroundColor: "#10309F",
                  textTransform: "none",
                  width: "100%",
                  borderRadius: "6px",
                  "&:hover": {
                    backgroundColor: "#10309F",
                    color: "#fff",
                  },
                }}
              >
                Change Password
              </Button>
              <Typography
                sx={{
                  textAlign: "center",
                  mt: "15px",
                }}
              >
                Don't have an account ? <Link to="/auth/signup">SignUp </Link>
              </Typography>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </Box>
  );
}

export default ForgotPassword;
