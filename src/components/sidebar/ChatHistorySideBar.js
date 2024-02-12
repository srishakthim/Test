import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Button, CardContent, CardMedia, Drawer, Grid, TextField, Toolbar, Typography } from '@mui/material';
import DeleteAlert from '../alert/deleteAlert';
import Axios from '../../config/axiosConfig';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


export default function ChatHistorySideBar({ open, setOpen, history, getHitory, id, setdia, share, setchatDia }) {
    const [ads, setads] = useState("")
    const [TextBox, setTextBox] = useState(false);
    const [historyName, sethistoryName] = useState("");

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const DeleteHistory = async (id) => {
        setOpen(false)
        const isGrant = await DeleteAlert();
        if (isGrant) {
            Axios.delete(`/message/deletehistory/${id}`).then(res => {
                const { status } = res.data
                if (status) {
                    toast.success("History Was Deleted")
                    getHitory()
                }
            })
        }
    }
    const getAds = () => {
        Axios.get(`ads/list/${localStorage.getItem("user_level")}`).then((res) => {
            const { status, message } = res.data
            if (status) {
                setads(message[0]?.ads)
            }
        })
    }
    const ChangeHistoryName = (id) => {
        Axios.post("message/updatehistory", { id, history_name: historyName }).then(res => {
            const { status, message } = res.data
            if (message) {
                sethistoryName(message["history_name"])
                setTextBox(false)
                toast.success("History Name Changed Succssfully")
            }
        })
    }
    useEffect(() => {
        getAds()
    }, [])
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer sx={{
                width: "300px",
                flexShrink: 0,
                zIndex: 99999,
                '& .MuiDrawer-paper': {
                    width: "300px",
                    boxSizing: 'border-box',
                },

            }}
                variant="presentation"
                anchor="right"
                onClose={() => setOpen(false)}
                open={open}>
                <DrawerHeader>
                    {localStorage.getItem("role") == "User" ? "" : <Toolbar>
                        <Link to={`/theme/${id}`}>
                            <Button disableElevation variant='contained' sx={{
                                color: "white",
                                fontSize: "15px",
                                backgroundColor: "#10309F",
                                width: "100%",
                                textTransform: "none",
                                p: "5px 15px",
                                borderRadius: "6px",
                                "&:hover": {
                                    backgroundColor: "#10309F",
                                    color: "#fff",
                                },
                            }}>Change Chat Bg Color</Button>
                        </Link>
                    </Toolbar>}
                    <IconButton sx={{ backgroundColor: "#10309F", p: "3px 5px", color: "#FFF", "&:hover": { backgroundColor: "#10309F" } }} onClick={handleDrawerClose}>
                        <i class="bi bi-x"></i>
                    </IconButton>
                </DrawerHeader>
                <Divider sx={{ "backgroundColor": "#000" }} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {history.map((item, index) => (
                            <Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    {
                                        TextBox == item["_id"] ? <TextField size='small' sx={{ maxWidth: "150px", fontSize: "14px", mt: 1 }} value={historyName || item.history_name} onChange={(e) => {
                                            sethistoryName(e.target.value)
                                            item["history_name"] = e.target.value
                                        }} /> : <Typography variant="h6" sx={{ color: "#000", pl: 2, mt: 1 }}>
                                            {item.history_name}
                                        </Typography>
                                    }
                                    <Box sx={{ mt: 1 }}>
                                        <IconButton disableFocusRipple disableRipple disableTouchRipple>
                                            <i class="bi bi-eye-fill" onClick={() => {
                                                setOpen(false)
                                                setchatDia(item["_id"])
                                            }} style={{ fontSize: "16px", color: "#10309F", paddingRight: "10px" }}></i>
                                            {
                                                TextBox == item["_id"] ? <div style={{ display: "flex" }}><i class="bi bi-check2" onClick={() => ChangeHistoryName(item["_id"])} style={{ fontSize: "16px", color: "#10309F", paddingRight: "10px" }}></i><i class="bi bi-x" onClick={() => setTextBox(false)} style={{ fontSize: "16px", color: "#10309F" }}></i></div> : <i class="bi bi-pencil-square" style={{ fontSize: "16px", color: "#10309F" }} onClick={() => {
                                                    setTextBox(item["_id"])
                                                }}></i>
                                            }

                                        </IconButton>
                                        {
                                            !share && <IconButton onClick={() => {
                                                setOpen(false)
                                                setdia(item["_id"])
                                            }}>
                                                <i class="bi bi-share" style={{ fontSize: "16px", color: "#10309F" }}></i>
                                            </IconButton>
                                        }
                                        <IconButton onClick={() => DeleteHistory(item._id)}>
                                            <i class="bi bi-trash3" style={{ fontSize: "16px", color: "red" }}></i>
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Grid item xs={12}>
                                    <Divider
                                        sx={{
                                            backgroundColor: "#000",
                                            my: 1
                                        }}
                                    />
                                </Grid>
                            </Box>

                        ))}
                    </Grid>
                    {
                        localStorage.getItem("role") == "User" && <Grid item xs={12} >
                            <Box sx={{ px: 2 }}>
                                <Typography sx={{ fontSize: "25px", color: "#FFF", textAlign: "center" }}>ADS</Typography>
                                <CardContent
                                    sx={{
                                        backgroundColor: "#FFFFFF",
                                        border: "2px solid black",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={ads}
                                        alt="ads"
                                    />
                                </CardContent>
                            </Box>
                        </Grid>
                    }
                </Grid>
            </Drawer>
            <DrawerHeader />
        </Box >
    );
}