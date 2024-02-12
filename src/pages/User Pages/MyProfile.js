// import React, { useEffect, useRef, useState } from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   FormLabel,
//   TextField,
//   Button,
//   Avatar,
//   Toolbar,
//   IconButton,
// } from "@mui/material";
// import Axios from "../../config/axiosConfig";
// import { toast } from "react-toastify";
// import { LoadingButton } from "@mui/lab";
// import { useNavigate } from "react-router-dom";

// function MyProfile() {
//   const navigate = useNavigate();
//   const [username, setusername] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [email, setemail] = useState("");
//   const [phone, setphone] = useState("");
//   const [profile, setprofile] = useState("");
//   const [refcode, setrefcode] = useState(localStorage.getItem("ref_id" || ""));
//   const hiddenFileInput = useRef(null);
//   const [ErrorObj, setErrorObj] = useState({
//     username: false,
//     phone: false,
//   });
//   const handleClick = (event) => {
//     hiddenFileInput.current.click();
//   };

//   const convertImageToBase64 = (file, callback) => {
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       const base64String = reader.result;
//       callback(base64String);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleChange = (event) => {
//     const fileUploaded = event.target.files[0];

//     convertImageToBase64(fileUploaded, (base64String) => {
//       setprofile(base64String);
//     });
//   };

//   const GetCode = () => Math.floor(1000 + Math.random() * 9000);

//   const getDetails = () => {
//     Axios.get(`user/${localStorage.getItem("userid")}`)
//       .then((res) => {
//         const { status, message } = res.data;

//         if (status) {
//           setusername(message["username"] ? message["username"] : "");
//           setemail(message["email"] ? message["email"] : "");
//           setphone(message["phone"] ? message["phone"] : "");
//           setprofile(message["profile"] ? message["profile"] : "");
//           setrefcode(message["ref_id"] ? message["ref_id"] : "");
//         } else {
//           toast.error(message);
//         }
//       })
//       .catch((err) => {
//         const { data } = err.response;
//         toast.error(data.message);
//       });
//   };
//   const SaveUserDetails = () => {
//     setLoading(true);
//     const phoneRegex = /^\d{10}$/;

//     const err = {
//       username: username == "",
//       phone: !phoneRegex.test(phone),
//     };
//     if (Object.values(err).some((val) => val == true)) {
//       setErrorObj(err);
//     } else {
//       setErrorObj(err);
//       Axios.put(`user/${localStorage.getItem("userid")}`, {
//         username,
//         phone,
//         updated_date: new Date(),
//         profile,
//         ref_id: refcode,
//         role: localStorage.getItem("role"),
//       })
//         .then((res) => {
//           const { status, message } = res.data;
//           if (status) {
//             getDetails();
//             window.location.reload();
//           } else {
//             toast.error(message);
//           }
//           setLoading(false);
//         })
//         .catch((err) => {
//           if (err?.response) {
//             const { data } = err?.response;
//             toast.error(data.message);
//           } else {
//             toast.error("Internal Server Error");
//           }
//         });
//     }
//   };

//   useEffect(() => {
//     getDetails();
//   }, []);
//   return (
//     <Grid container>
//       <Grid item xs={12} sx={{ px: 2 }}>
//         <Grid
//           container
//           sx={{ display: "flex", justifyContent: "center" }}
//           spacing={2}
//         >
//           <Grid item xs={12} sm={6}>
//             <Grid>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "flex-end",
//                   justifyContent: "center",
//                 }}
//               >
//                 <input
//                   type="file"
//                   accept=".jpg,.png,.jpeg"
//                   onChange={handleChange}
//                   ref={hiddenFileInput}
//                   style={{ display: "none" }}
//                 />
//                 <IconButton onClick={handleClick}>
//                   <Avatar
//                     src={profile}
//                     sx={{ width: "80px", height: "80px" }}
//                   />
//                 </IconButton>
//                 <Box
//                   sx={{ p: 0, m: 0, position: "relative", cursor: "pointer" }}
//                 >
//                   <svg
//                     onClick={handleClick}
//                     style={{ position: "absolute", bottom: 0, right: -10 }}
//                     width="34"
//                     height="30"
//                     viewBox="0 0 27 29"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M23.8302 6.40851H20.061L17.8851 4.03046H10.7509L8.57499 6.40851H4.80578C3.49786 6.40851 2.42773 7.47863 2.42773 8.78655V23.0548C2.42773 24.3628 3.49786 25.4329 4.80578 25.4329H23.8302C25.1381 25.4329 26.2082 24.3628 26.2082 23.0548V8.78655C26.2082 7.47863 25.1381 6.40851 23.8302 6.40851ZM23.8302 23.0548H4.80578V8.78655H9.62133L11.7972 6.40851H16.8387L19.0146 8.78655H23.8302V23.0548ZM14.318 9.97558C11.0363 9.97558 8.37286 12.639 8.37286 15.9207C8.37286 19.2024 11.0363 21.8658 14.318 21.8658C17.5997 21.8658 20.2631 19.2024 20.2631 15.9207C20.2631 12.639 17.5997 9.97558 14.318 9.97558ZM14.318 19.4878C12.3561 19.4878 10.7509 17.8826 10.7509 15.9207C10.7509 13.9588 12.3561 12.3536 14.318 12.3536C16.2799 12.3536 17.8851 13.9588 17.8851 15.9207C17.8851 17.8826 16.2799 19.4878 14.318 19.4878Z"
//                       fill="#000"
//                     />
//                   </svg>
//                 </Box>
//               </Box>
//             </Grid>
//             <Grid xs={12}>
//               <FormLabel>User Name</FormLabel>
//               <TextField
//                 size="small"
//                 sx={{ my: 1 }}
//                 fullWidth
//                 value={username}
//                 onChange={(e) => setusername(e.target.value)}
//                 variant="outlined"
//                 error={ErrorObj["username"]}
//                 helperText={ErrorObj["username"] ? "User name is Required" : ""}
//                 placeholder="Enter Your User Name"
//               />
//             </Grid>
//             <Grid xs={12}>
//               <FormLabel>Email</FormLabel>
//               <TextField
//                 size="small"
//                 fullWidth
//                 sx={{ my: 1 }}
//                 value={email}
//                 onChange={(e) => setemail(e.target.value)}
//                 variant="outlined"
//                 disabled={true}
//                 placeholder="Enter Your Email"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormLabel>Phone Number</FormLabel>
//               <TextField
//                 size="small"
//                 fullWidth
//                 sx={{ my: 1 }}
//                 value={phone}
//                 onChange={(e) => setphone(e.target.value)}
//                 variant="outlined"
//                 error={ErrorObj["phone"]}
//                 helperText={
//                   phone.length > 10
//                     ? "Phone number must be 10 digits"
//                     : ErrorObj["phone"]
//                     ? "Phone is Required"
//                     : ""
//                 }
//                 placeholder="Enter Your Phonen  Number"
//               />
//             </Grid>
//             {localStorage.getItem("role") == "Employee" && (
//               <Grid item xs={12}>
//                 <Grid container>
//                   <Grid item xs={10}>
//                     <FormLabel>Ref Code</FormLabel>
//                     <TextField
//                       size="small"
//                       disabled
//                       fullWidth
//                       sx={{ my: 1 }}
//                       value={refcode}
//                       onChange={(e) => setrefcode(e.target.value)}
//                       variant="outlined"
//                     />
//                   </Grid>
//                   <Grid item xs={2}>
//                     <Button
//                       sx={{
//                         mt: 4,
//                         ml: 1,
//                         backgroundColor: "#1136B4",
//                         textDecoration: "none",
//                         color: "white",
//                         "&:hover": {
//                           backgroundColor: "#1136B4",
//                         },
//                       }}
//                       onClick={() => setrefcode(GetCode())}
//                     >
//                       Generate
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             )}
//             <Grid
//               item
//               xs={12}
//               sx={{ justifyContent: "flex-end", display: "flex" }}
//             >
//               <LoadingButton
//                 loading={loading}
//                 sx={{
//                   backgroundColor: "#1136B4",
//                   my: "15px",
//                   textDecoration: "none",
//                   color: "white",
//                   "&:hover": {
//                     backgroundColor: "#1136B4",
//                   },
//                 }}
//                 onClick={SaveUserDetails}
//               >
//                 Update
//               </LoadingButton>
//               <Button
//                 onClick={() => navigate("/dashboard")}
//                 variant="outlined"
//                 disableElevation
//                 sx={{
//                   border: "1px solid #1136B4",
//                   color: "#1136B4",
//                   m: "15px",
//                 }}
//               >
//                 Back
//               </Button>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// }
// export default MyProfile;

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  FormLabel,
  TextField,
  Button,
  Avatar,
  Toolbar,
  IconButton,
} from "@mui/material";
import Axios from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [profile, setprofile] = useState("");
  const [refcode, setrefcode] = useState(localStorage.getItem("ref_id" || ""));
  const hiddenFileInput = useRef(null);
  const [ErrorObj, setErrorObj] = useState({
    username: false,
    phone: false,
  });
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const convertImageToBase64 = (file, callback) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      callback(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];

    convertImageToBase64(fileUploaded, (base64String) => {
      setprofile(base64String);
    });
  };

  const GetCode = () => Math.floor(1000 + Math.random() * 9000);

  const getDetails = () => {
    Axios.get(`user/${localStorage.getItem("userid")}`)
      .then((res) => {
        const { status, message } = res.data;

        if (status) {
          setusername(message["username"] ? message["username"] : "");
          setemail(message["email"] ? message["email"] : "");
          setphone(message["phone"] ? message["phone"] : "");
          setprofile(message["profile"] ? message["profile"] : "");
          setrefcode(message["ref_id"] ? message["ref_id"] : "");
        } else {
          toast.error(message);
        }
      })
      .catch((err) => {
        const { data } = err.response;
        toast.error(data.message);
      });
  };
  const SaveUserDetails = () => {
    setLoading(true);
    const phoneRegex = /^\d{10}$/;

    const err = {
      username: username == "",
      phone: !phoneRegex.test(phone),
    };
    if (Object.values(err).some((val) => val == true)) {
      setErrorObj(err);
    } else {
      setErrorObj(err);
      Axios.put(`user/${localStorage.getItem("userid")}`, {
        username,
        phone,
        updated_date: new Date(),
        profile,
        ref_id: refcode,
        role: localStorage.getItem("role"),
      })
        .then((res) => {
          const { status, message } = res.data;
          if (status) {
            getDetails();
            window.location.reload();
            localStorage.setItem("username", username);
          } else {
            toast.error(message);
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
        });
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  // Function to handle phone number input change
  const handlePhoneChange = (event) => {
    const phoneNumber = event.target.value;
    setphone(phoneNumber);

    // Validate phone number and update error state
    const phoneRegex = /^\d{10}$/;
    setErrorObj((prevErrors) => ({
      ...prevErrors,
      phone: !phoneRegex.test(phoneNumber),
    }));
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ px: 2 }}>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "center" }}
          spacing={2}
        >
          <Grid item xs={12} sm={6}>
            <Grid>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <input
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  onChange={handleChange}
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                />
                <IconButton onClick={handleClick}>
                  <Avatar
                    src={profile}
                    sx={{ width: "80px", height: "80px" }}
                  />
                </IconButton>
                <Box
                  sx={{ p: 0, m: 0, position: "relative", cursor: "pointer" }}
                >
                  <svg
                    onClick={handleClick}
                    style={{ position: "absolute", bottom: 0, right: -10 }}
                    width="34"
                    height="30"
                    viewBox="0 0 27 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.8302 6.40851H20.061L17.8851 4.03046H10.7509L8.57499 6.40851H4.80578C3.49786 6.40851 2.42773 7.47863 2.42773 8.78655V23.0548C2.42773 24.3628 3.49786 25.4329 4.80578 25.4329H23.8302C25.1381 25.4329 26.2082 24.3628 26.2082 23.0548V8.78655C26.2082 7.47863 25.1381 6.40851 23.8302 6.40851ZM23.8302 23.0548H4.80578V8.78655H9.62133L11.7972 6.40851H16.8387L19.0146 8.78655H23.8302V23.0548ZM14.318 9.97558C11.0363 9.97558 8.37286 12.639 8.37286 15.9207C8.37286 19.2024 11.0363 21.8658 14.318 21.8658C17.5997 21.8658 20.2631 19.2024 20.2631 15.9207C20.2631 12.639 17.5997 9.97558 14.318 9.97558ZM14.318 19.4878C12.3561 19.4878 10.7509 17.8826 10.7509 15.9207C10.7509 13.9588 12.3561 12.3536 14.318 12.3536C16.2799 12.3536 17.8851 13.9588 17.8851 15.9207C17.8851 17.8826 16.2799 19.4878 14.318 19.4878Z"
                      fill="#000"
                    />
                  </svg>
                </Box>
              </Box>
            </Grid>
            <Grid xs={12}>
              <FormLabel>User Name</FormLabel>
              <TextField
                size="small"
                sx={{ my: 1 }}
                fullWidth
                value={username}
                onChange={(e) => setusername(e.target.value)}
                variant="outlined"
                error={ErrorObj["username"]}
                helperText={ErrorObj["username"] ? "User name is Required" : ""}
                placeholder="Enter Your User Name"
              />
            </Grid>
            <Grid xs={12}>
              <FormLabel>Email</FormLabel>
              <TextField
                size="small"
                fullWidth
                sx={{ my: 1 }}
                value={email}
                onChange={(e) => setemail(e.target.value)}
                variant="outlined"
                disabled={true}
                placeholder="Enter Your Email"
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Phone Number</FormLabel>
              <TextField
                size="small"
                fullWidth
                sx={{ my: 1 }}
                value={phone}
                onChange={handlePhoneChange} // Updated to use handlePhoneChange function
                variant="outlined"
                error={ErrorObj["phone"]}
                helperText={
                  ErrorObj["phone"]
                    ? "Phone is Required"
                    : phone.length > 10
                    ? "Phone number must be 10 digits"
                    : ""
                }
                placeholder="Enter Your Phone Number"
              />
            </Grid>
            {localStorage.getItem("role") == "Employee" && (
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={10}>
                    <FormLabel>Ref Code</FormLabel>
                    <TextField
                      size="small"
                      disabled
                      fullWidth
                      sx={{ my: 1 }}
                      value={refcode}
                      onChange={(e) => setrefcode(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      sx={{
                        mt: 4,
                        ml: 1,
                        backgroundColor: "#1136B4",
                        textDecoration: "none",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#1136B4",
                        },
                      }}
                      onClick={() => setrefcode(GetCode())}
                    >
                      Generate
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid
              item
              xs={12}
              sx={{ justifyContent: "flex-end", display: "flex" }}
            >
              <LoadingButton
                loading={loading}
                sx={{
                  backgroundColor: "#1136B4",
                  my: "15px",
                  textDecoration: "none",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1136B4",
                  },
                }}
                onClick={SaveUserDetails}
              >
                Update
              </LoadingButton>
              <Button
                onClick={() => navigate("/dashboard")}
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
    </Grid>
  );
}
export default MyProfile;
