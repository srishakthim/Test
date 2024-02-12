import React, { useEffect, useRef, useState } from "react";
// import "./App.css"
import { AppBar, Toolbar, Button, Typography, Box, Divider, Grid, } from "@mui/material";
import Axios from "../../config/axiosConfig";
import { toast } from "react-toastify";

const LogoForm = () => {
    const [fileName, setFileName] = useState("Click Browse to Select Img");
    const [loading, setLoading] = useState(false);
    const [base64imgurl, setbase64imgurl] = useState("");
    const [id, setid] = useState("");
    const hiddenFileInput = useRef(null);
    const handleClick = event => {
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


    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setFileName(fileUploaded.name)
        convertImageToBase64(fileUploaded, base64String => {
            setbase64imgurl(base64String)
        });
    };
    const SaveLogo = () => {
        setLoading(true)
        Axios.post("assets/logo/create", { logo: base64imgurl, file_name: fileName, created_by: localStorage.getItem("userid"), _id: id }).then(res => {
            const { status, message } = res.data
            if (status) {
                toast.success("Logo Saved Successfully")
            } else {
                toast.error(message)
            }
            setLoading(false)
        }).catch(err => {
            const { data } = err.response
            toast.error(data.message)
            setLoading(false)
        })
    }

    const getData = () => {
        Axios.post("assets/logo/list", { id: localStorage.getItem("userid") }).then(res => {
            const { status, message } = res.data
            if (status) {
                if (message.length > 0) {
                    setFileName(message[0]["file_name"] ? message[0]["file_name"] : "")
                    setbase64imgurl(message[0]["logo"] ? message[0]["logo"] : "")
                    setid(message[0]["_id"] ? message[0]["_id"] : "")
                }
            } else {
                toast.error(message)
            }
        }).catch(err => {
            const { data } = err.response
            toast.error(data.message)
        })
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Typography variant="h4" component="h4" sx={{ fontSize: { xs: "20px", md: "28px" } }}>Logo</Typography>

                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h1" sx={{ fontSize: { xs: "12px", md: "18px" }, mb: 1 }}>
                        Shop Logo
                    </Typography>
                    <Box sx={{
                        backgroundColor: "#D9D9D9",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingLeft: "10px",
                    }}>
                        <Typography
                            variant="h1"
                            component="h1"
                            sx={{
                                fontSize: { xs: "12px", md: "18px" },
                            }}
                        >
                            {fileName}
                        </Typography>
                        <Button variant="contained" onClick={handleClick} disableElevation component="label" sx={{
                            color: "white",
                            backgroundColor: "#10309f",
                            fontWeight: "600",
                            borderRadius: "0px",
                            "&:hover": {
                                backgroundColor: "#10309f",
                            }
                        }}>
                            <svg
                                style={{ marginRight: "10px" }}
                                width="20"
                                height="16"
                                viewBox="0 0 20 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2 4V14H18V4H2ZM3 3C3.26522 3 3.51957 2.89464 3.70711 2.70711C3.89464 2.51957 4 2.26522 4 2C4 1.73478 3.89464 1.48043 3.70711 1.29289C3.51957 1.10536 3.26522 1 3 1C2.73478 1 2.48043 1.10536 2.29289 1.29289C2.10536 1.48043 2 1.73478 2 2C2 2.26522 2.10536 2.51957 2.29289 2.70711C2.48043 2.89464 2.73478 3 3 3ZM6 3C6.26522 3 6.51957 2.89464 6.70711 2.70711C6.89464 2.51957 7 2.26522 7 2C7 1.73478 6.89464 1.48043 6.70711 1.29289C6.51957 1.10536 6.26522 1 6 1C5.73478 1 5.48043 1.10536 5.29289 1.29289C5.10536 1.48043 5 1.73478 5 2C5 2.26522 5.10536 2.51957 5.29289 2.70711C5.48043 2.89464 5.73478 3 6 3ZM2 0H18C18.5304 0 19.0391 0.210714 19.4142 0.585786C19.7893 0.960859 20 1.46957 20 2V14C20 14.5304 19.7893 15.0391 19.4142 15.4142C19.0391 15.7893 18.5304 16 18 16H2C1.46957 16 0.960859 15.7893 0.585786 15.4142C0.210714 15.0391 0 14.5304 0 14V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0V0Z"
                                    fill="white"
                                />
                            </svg>
                            Browse
                        </Button>
                        <input type="file" style={{ display: 'none' }} onChange={handleChange}
                            ref={hiddenFileInput} />
                    </Box>
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{ fontSize: { xs: "8px", md: "14px" }, mt: 1 }}
                    >
                        Recommended front logo size width:150px and height: 150px. The logo
                        must be a file of type png
                    </Typography>
                    <Box sx={{ width: "150px", height: "150px", border: "dotted 1px #10309f", mt: 2 }}><img width="100%" src={base64imgurl} /></Box>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
                <Button variant="contained" sx={{ backgroundColor: "#1136B4", my: "15px" }} onClick={() => SaveLogo()} disableElevation>
                    Save
                </Button>
            </Grid>

        </>
    );
};

export default LogoForm;