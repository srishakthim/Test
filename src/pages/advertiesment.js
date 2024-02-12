import React, { useEffect, useRef, useState } from 'react'
import MyDataGrid from '../components/table/DataGrid'
import { Autocomplete, Box, Button, Chip, Container, Dialog, Divider, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Axios from '../config/axiosConfig';
import { toast } from 'react-toastify';
import DeleteAlert from "../components/alert/deleteAlert"

function Advertiesment() {
    const [adURL, setadURL] = useState("")
    const [ads, setads] = useState("")
    const [dialog, setdialog] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
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

        convertImageToBase64(fileUploaded, base64String => {
            setadURL(base64String)
        });
    };

    const SaveAdsImage = (listAllData = null) => {
        Axios.post(`ads/create`, { level: params.level, ads: adURL, created_by: localStorage.getItem("userid") }).then(res => {
            const { status, message } = res.data
            if (status) {
                setdialog(false)
                if (listAllData) {
                    GetAllAdsList()
                } else {
                    toast.success("Ads Added Successfully")
                }
            }
        }).catch(err => {
            const { data } = err.response
            toast.error(data.message)
        })
    }
    const GetAllAdsList = () => {
        Axios.get(`ads/list/${params.level}`).then(res => {
            const { status, message } = res.data
            if (status) {
                if (message.length > 0) {
                    setadURL(message[0]["ads"])
                    setads(message)
                    setdialog(false)
                } else {
                    setadURL("")
                }
            }
        }).catch(err => {
            const { data } = err.response
            toast.error(data.message)
        })
    }

    const DeleteAds = async (id) => {
        const isGrant = await DeleteAlert()
        if (isGrant) {
            Axios.delete(`ads/delete/${id}`).then(re => {
                const { status, message } = re.data
                if (status) {
                    GetAllAdsList()
                } else {
                    toast.error(message)
                }
            })
        }
    }
    useEffect(() => {
        GetAllAdsList()
    }, [location.pathname])
    return (
        <Box >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h4' component="h4" sx={{ fontSize: { xs: "20px", md: "24px" } }}>Level {params.level[5]} Advertiesment</Typography>
                            <Divider variant="middle" sx={{ margin: { xs: "10px 0px", md: "10px 20px" }, backgroundColor: "gray" }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", my: 2, flexWrap: "wrap-reverse" }}>
                                <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 0 }, justifyContent: "end" }}>
                                    <Button variant='contained' sx={{ mr: 2, minWidth: "120px", backgroundColor: "#10309F", borderRadius: "0px", "&:hover": { backgroundColor: "#10309F" } }} onClick={() => setdialog(true)} disableElevation>+  Add New</Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            adURL.length == 0 ? "No Ads Found" : <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} lg={3} sx={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", alignItems: "flex-end" }}>
                                    <>
                                        <i class="bi bi-x" onClick={() => DeleteAds(ads[0]["_id"])} style={{ fontSize: "16px", backgroundColor: "red", color: "#FFF", padding: "0px 5px", cursor: "pointer" }}></i>
                                        <Box sx={{ textAlign: "right", p: 1, py: 0, height: "180px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", width: "280px" }}>
                                            <img height="100%" width="100%" style={{ objectFit: "contain" }} src={adURL} alt='A' />
                                        </Box>
                                    </>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                    <Dialog open={dialog} maxWidth="md" onClose={() => setdialog(false)}>
                        <Box sx={{ padding: 2, width: "400px", height: "200px", fontSize: "12px" }}>
                            <input
                                accept='image/*,video/*'
                                type="file"
                                onChange={handleChange}
                                ref={hiddenFileInput}
                                style={{ display: 'none' }}
                            />
                            <Button onClick={handleClick} sx={{ width: "100%", height: "100%", border: "2px dashed blue", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", textTransform: "none", color: "#10309F", mb: 1 }}> <i class="bi bi-cloud-arrow-up" style={{ fontSize: "50px" }}></i>Select File </Button>
                            recommended size is 1280px 720px
                        </Box>
                        <Box sx={{ textAlign: "end", p: 2 }}>
                            <Button onClick={() => GetAllAdsList()} variant='outlined' sx={{ textTransform: "none", color: "#10309F", borderColor: "#10309F" }} disableElevation>Close</Button>
                            <Button onClick={() => SaveAdsImage()} variant='contained' sx={{ ml: 2, textTransform: "none", backgroundColor: "#10309F", "&:hover": { backgroundColor: "#10309F" } }} disableElevation>Save</Button>
                        </Box>
                    </Dialog>
                </Grid>
            </Grid>
        </Box >
    )
}

export default Advertiesment
