import { Box, Grid, Typography, FormControl, TextField, Button, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Axios from '../../config/axiosConfig';
import { toast } from 'react-toastify';

function HeaderForm() {
    const [address, setAddress] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [headerDataID, setheaderDataID] = useState("");
    const [ErrorObj, setErrorObj] = useState({
        phone_number: false,
        address: false
    })
    const handleHeder = () => {
        let err = {
            phone_number: phone_number == "",
            address: address == ""
        }
        if (Object.values(err).some(val => val == true)) {
            setErrorObj(err)
        } else {
            setErrorObj(err)
            let HeaderData = {
                phone_number,
                address
            }
            Axios.post("/assets/header/create", HeaderData).then((res) => {
                const { status, message } = res.data
                if (status) {
                    toast.success("Header data saved Successfully")
                } else {
                    toast.error("Error")
                }
            }).catch((err) => {
                toast.success(err)
            })
        }
    }
    const handleHederUpdate = () => {
        let err = {
            phone_number: phone_number == "",
            address: address == ""
        }
        if (Object.values(err).some(val => val == true)) {
            setErrorObj(err)
        } else {
            setErrorObj(err)
            let HeaderData = {
                phone_number,
                address
            }
            Axios.put(`/assets/header/${headerDataID}`, HeaderData).then((res) => {
                const { status, message } = res.data
                if (status) {
                    toast.success("Header data updated Successfully")
                } else {
                    toast.error("Error")
                }
            }).catch((err) => {
                toast.success(err)
            })
        }
    }
    const getHeaderData = () => {
        Axios.get("/assets/header/list").then((res) => {
            const { status, message } = res.data
            if (status) {
                const [header] = message
                setheaderDataID(header._id)
                setAddress(header.address)
                setPhone_number(header.phone_number)
            } else {
                toast.error("Error")
            }
        }).catch((err) => {
            toast.error(err)
        })
    }
    useEffect(() => {
        getHeaderData()
    }, [headerDataID])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h4' sx={{ fontSize: { xs: "20px", md: "28px" } }}>
                    Header
                </Typography>
                <Divider variant="middle" sx={{ margin: { xs: "10px 0px", md: "10px 20px" }, backgroundColor: "gray" }} />
            </Grid>
            <Grid item xs={12}>
                <Typography sx={{ fontSize: "15px" }}>
                    Address
                </Typography>
                <TextField size='small' fullWidth placeholder='Your Address' error={ErrorObj.address} value={address} helperText={ErrorObj.address ? "Address is Required" : ""} onChange={(e) => setAddress(e.target.value)} />
            </Grid>
            <Grid item xs={12} >
                <Typography sx={{ fontSize: "15px" }}>
                    Phone Number
                </Typography>
                <TextField placeholder="Your Phone Number" size='small' error={ErrorObj.phone_number} helperText={ErrorObj.phone_number ? "Phone Number is Required" : ""} value={phone_number} fullWidth onChange={(e) => setPhone_number(e.target.value)} />
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
                {
                    headerDataID ? <Button variant="contained" sx={{ backgroundColor: "#1136B4", my: "15px" }} disableElevation onClick={handleHederUpdate}>
                        Update
                    </Button> : <Button variant="contained" sx={{ backgroundColor: "#1136B4", my: "15px" }} disableElevation onClick={handleHeder}>
                        Save
                    </Button>
                }
            </Grid>
        </Grid>
    )
}

export default HeaderForm