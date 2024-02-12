// import React, { useState } from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   FormLabel,
//   TextField,
//   Button,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import Axios from "../../config/axiosConfig";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/menubar/navbar";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

// const ChangePassword = () => {
//   const navigate = useNavigate();
//   const [showPassword, setshowPassword] = useState(false);
//   const [showNPassword, setshowNPassword] = useState(false);
//   const [showCPassword, setshowCPassword] = useState(false);
//   const [currentpassword, setcurrentpassword] = useState("");
//   const [newpassword, setnewpassword] = useState("");
//   const [confirmpassword, setconfirmpassword] = useState("");
//   const [ErrorObj, setErrorObj] = useState({
//     currentpassword: false,
//     newpassword: false,
//     confirmpassword: false,
//   });

//   const handleLogin = async () => {
//     const formErrors = {};

//     if (!currentpassword.trim()) {
//       formErrors.currentpassword = "Current Password is required";
//     }

//     if (!newpassword.trim()) {
//       formErrors.newpassword = "New Password is required";
//     } else if (newpassword.trim().length < 8) {
//       formErrors.newpassword = "New Password must be above 8 characters";
//     } else if (!/[A-Z]/.test(newpassword.trim())) {
//       formErrors.newpassword =
//         "New Password must have at least 1 capital letter";
//     }

//     if (!confirmpassword.trim()) {
//       formErrors.confirmpassword = "Confirm Password is required";
//     } else if (confirmpassword.trim().length < 8) {
//       formErrors.confirmpassword =
//         "Confirm Password must be above 8 characters";
//     } else if (confirmpassword !== newpassword) {
//       formErrors.confirmpassword = "Passwords do not match";
//     }

//     setErrorObj(formErrors);

//     if (Object.keys(formErrors).length === 0) {
//       await Axios.post("auth/changepassword", {
//         old_pass: currentpassword,
//         new_pass: newpassword,
//         userid: localStorage.getItem("userid"),
//       })
//         .then((res) => {
//           const { status, message } = res.data;
//           if (status) {
//             toast.success("Password Change Successfully");
//             navigate("/dashboard");
//           } else {
//             toast.error(message);
//           }
//         })
//         .catch((err) => {
//           const { data } = err.response;
//           toast.error(data.message);
//         });
//     }
//   };

//   return (
//     <Grid container sx={{ justifyContent: "center", alignItems: "center" }}>
//       {localStorage.getItem("role") == "User" && (
//         <Grid item xs={12} sx={{ position: "sticky", top: 0, zIndex: 9999 }}>
//           <Navbar open={false} setOpen={() => {}} user={false} />
//         </Grid>
//       )}
//       <Grid item xs={12} sx={{ textAlign: "center", mb: 3, mt: 2 }}>
//         <Typography variant="h5">Change Password</Typography>
//       </Grid>

//       <Grid item xs={12} md={6}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <FormLabel sx={{ color: "black" }}>Current Password</FormLabel>
//             <TextField
//               size="small"
//               fullWidth
//               sx={{ mt: 1 }}
//               variant="outlined"
//               placeholder="Enter Your Current Password"
//               required
//               value={currentpassword}
//               type={showPassword ? "text" : "password"}
//               onChange={(e) => setcurrentpassword(e.target.value)}
//               helperText={
//                 ErrorObj.currentpassword ? "Current Password is Required" : ""
//               }
//               error={ErrorObj.currentpassword}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={() => setshowPassword(!showPassword)}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <FormLabel sx={{ color: "black" }}>New Password</FormLabel>
//             <TextField
//               size="small"
//               fullWidth
//               sx={{ mt: 1 }}
//               variant="outlined"
//               placeholder="Enter Your New Password"
//               required
//               value={newpassword}
//               type={showNPassword ? "text" : "password"}
//               onChange={(e) => setnewpassword(e.target.value)}
//               helperText={
//                 ErrorObj.newpassword
//                   ? "Password must be at least 8 characters and contain at least one captial letter and one number"
//                   : ""
//               }
//               error={ErrorObj.newpassword}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={() => setshowNPassword(!showNPassword)}
//                       edge="end"
//                     >
//                       {showNPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <FormLabel sx={{ color: "black" }}>Conifrm Password</FormLabel>
//             <TextField
//               size="small"
//               fullWidth
//               sx={{ mt: 1 }}
//               variant="outlined"
//               placeholder="Re-enter Your Password"
//               required
//               value={confirmpassword}
//               type={showCPassword ? "text" : "password"}
//               onChange={(e) => setconfirmpassword(e.target.value)}
//               helperText={
//                 ErrorObj.confirmpassword
//                   ? "Confirm Password should match the New Password"
//                   : ""
//               }
//               error={ErrorObj.confirmpassword}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={() => setshowCPassword(!showCPassword)}
//                       edge="end"
//                     >
//                       {showCPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end",
//               alignItems: "center",
//             }}
//           >
//             <Button
//               onClick={handleLogin}
//               variant="contained"
//               disableElevation
//               sx={{
//                 backgroundColor: "#1136B4",
//                 textTransform: "none",
//                 "&:hover": {
//                   backgroundColor: "#1136B4",
//                 },
//               }}
//             >
//               Save
//             </Button>
//             <Button
//               onClick={() => navigate(-1)}
//               variant="outlined"
//               disableElevation
//               sx={{
//                 border: "1px solid #1136B4",
//                 color: "#1136B4",
//                 m: "15px",
//               }}
//             >
//               Back
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default ChangePassword;

import React, { useState } from "react";
import {
  Grid,
  Typography,
  FormLabel,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Axios from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorObj, setErrorObj] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleInputChange = (field, value) => {
    // Reset the corresponding error when the input changes
    setErrorObj((prevErrors) => ({ ...prevErrors, [field]: false }));

    // Update the input value
    switch (field) {
      case "currentPassword":
        setCurrentPassword(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleLogin = async () => {
    const formErrors = {};

    if (!currentPassword.trim()) {
      formErrors.currentPassword = "Current Password is required";
    }

    if (!newPassword.trim()) {
      formErrors.newPassword = "New Password is required";
    } else if (newPassword.trim().length < 8) {
      formErrors.newPassword = "New Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(newPassword.trim())) {
      formErrors.newPassword =
        "New Password must have at least 1 capital letter";
    }

    if (!confirmPassword.trim()) {
      formErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== newPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    setErrorObj(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const res = await Axios.post("auth/changepassword", {
          old_pass: currentPassword,
          new_pass: newPassword,
          userid: localStorage.getItem("userid"),
        });
        const { status, message } = res.data;
        if (status) {
          toast.success("Password Change Successfully");
          navigate("/dashboard");
        } else {
          toast.error(message);
        }
      } catch (err) {
        const { data } = err.response;
        toast.error(data.message);
      }
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sx={{ textAlign: "center", mb: 3, mt: 2 }}>
        <Typography variant="h5">Change Password</Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormLabel sx={{ color: "black" }}>Current Password</FormLabel>
            <TextField
              size="small"
              fullWidth
              sx={{ mt: 1 }}
              variant="outlined"
              placeholder="Enter Your Current Password"
              required
              value={currentPassword}
              type={showPassword ? "text" : "password"}
              onChange={(e) =>
                handleInputChange("currentPassword", e.target.value)
              }
              helperText={
                errorObj.currentPassword ? "Current Password is Required" : ""
              }
              error={errorObj.currentPassword}
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
            <FormLabel sx={{ color: "black" }}>New Password</FormLabel>
            <TextField
              size="small"
              fullWidth
              sx={{ mt: 1 }}
              variant="outlined"
              placeholder="Enter Your New Password"
              required
              value={newPassword}
              type={showNewPassword ? "text" : "password"}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              helperText={
                errorObj.newPassword
                  ? "Password must be at least 8 characters and contain at least one capital letter"
                  : ""
              }
              error={errorObj.newPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel sx={{ color: "black" }}>Confirm Password</FormLabel>
            <TextField
              size="small"
              fullWidth
              sx={{ mt: 1 }}
              variant="outlined"
              placeholder="Re-enter Your Password"
              required
              value={confirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              helperText={
                errorObj.confirmPassword
                  ? "Confirm Password should match the New Password"
                  : ""
              }
              error={errorObj.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              onClick={handleLogin}
              variant="contained"
              disableElevation
              sx={{
                backgroundColor: "#1136B4",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#1136B4",
                },
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="outlined"
              disableElevation
              sx={{
                border: "1px solid #1136B4",
                color: "#1136B4",
                m: "15px",
              }}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
