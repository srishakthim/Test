import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Divider, Grid, CircularProgress } from '@mui/material';
import LevelCard from "../components/card/Card";
import { Link } from 'react-router-dom';
import Axios from '../config/axiosConfig';
import { toast } from 'react-toastify';
const LevelCardPage = () => {
    const [CardData, setCardData] = useState(null)
    const [isLoading, setisLoading] = useState(true)
    const sampleData = [
        {
            level: 'Level 1',
            priceMonthly: '45',
            priceYearly: '600',
            paymentOptions: [
                {
                    label: 'Pay Monthly',
                    description: 'Commit monthly',
                },
                {
                    label: 'Pay Upfront',
                    description: 'Commit annually',
                    discount: 'SAVE 10%',
                },
            ],
            buttonText: 'Subscribe',
            features: [
                'Standard Performance',
                'Weekly Backups',
                '100 GB SSD Storage',
                '99.9% Uptime Guarantee',
            ],
        },
        {
            level: 'Level 1',
            priceMonthly: '45',
            priceYearly: '600',
            paymentOptions: [
                {
                    label: 'Pay Monthly',
                    description: 'Commit monthly',
                },
                {
                    label: 'Pay Upfront',
                    description: 'Commit annually',
                    discount: 'SAVE 10%',
                },
            ],
            buttonText: 'Subscribe',
            features: [
                'Standard Performance',
                'Weekly Backups',
                '100 GB SSD Storage',
                '99.9% Uptime Guarantee',
            ],
        },
        {
            level: 'Level 1',
            priceMonthly: '45',
            priceYearly: '600',
            paymentOptions: [
                {
                    label: 'Pay Monthly',
                    description: 'Commit monthly',
                },
                {
                    label: 'Pay Upfront',
                    description: 'Commit annually',
                    discount: 'SAVE 10%',
                },
            ],
            buttonText: 'Subscribe',
            features: [
                'Standard Performance',
                'Weekly Backups',
                '100 GB SSD Storage',
                '99.9% Uptime Guarantee',
            ],
        },
        {
            level: 'Level 1',
            priceMonthly: '45',
            priceYearly: '600',
            paymentOptions: [
                {
                    label: 'Pay Monthly',
                    description: 'Commit monthly',
                },
                {
                    label: 'Pay Upfront',
                    description: 'Commit annually',
                    discount: 'SAVE 10%',
                },
            ],
            buttonText: 'Subscribe',
            features: [
                'Standard Performance',
                'Weekly Backups',
                '100 GB SSD Storage',
                '99.9% Uptime Guarantee',
            ],
        }
    ];

    function GetLevelData() {
        Axios.get("/card/list").then(function (res) {
            const { status, message } = res.data
            if (status) {
                setisLoading(false)
                setCardData(message)
            }
            else {

            }
        }).catch(function (err) {
            console.log(err)
        })
    }

    useEffect(() => {
        GetLevelData()
        toast.success("Click Subscribe to Create Account")
    }, [])
    return (
        <Box>

            {
                isLoading ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></div> : <div>
                    <AppBar elevation={0} position="static" sx={{ alignItems: "center", backgroundColor: "#10309f" }} >
                        <Typography variant="h3" component="h3" sx={{ marginTop: "20px", textAlign: "center", letterSpacing: "1px", fontSize: { xs: "16px", sm: "26px" } }}>
                            Grow better with the right plan.
                        </Typography>
                        <Typography variant="h6" component="h6" sx={{ fontSize: { xs: "10px", sm: "18px" }, mt: "10px" }}>
                            Pay for what you need (when you need it).
                        </Typography>
                        <Toolbar>
                            <Button sx={{ color: "black", backgroundColor: "#FFF", marginTop: { xs: "20px", md: "40px" }, padding: { xs: "10px", md: "25px" }, fontWeight: "600", borderRadius: "0px", '&:hover': { backgroundColor: "#FFF" }, color: "#484747" }}>
                                Course & Plans
                            </Button>
                        </Toolbar>
                    </AppBar>
                    {/* 2nd line */}
                    <Box sx={{ alignItems: "center", backgroundColor: "white", display: "flex", justifyContent: "center", my: "5px", padding: "15px", }}>
                        <Typography variant="h5" component="h5" sx={{ color: "black", marginRight: "10px", fontSize: "20px", fontWeight: "520" }}>
                            After Register
                        </Typography>
                        <Button
                            sx={{
                                backgroundColor: "#10309f",
                                color: "white",
                                px: "20px",
                                borderRadius: 20,
                                fontWeight: 600,
                                fontSize: { xs: "12px", md: "15px" },
                                '&:hover': { backgroundColor: "#10309f" },
                            }}
                        >
                            <Link to="/auth/signin" style={{ color: "inherit", textDecoration: 'none' }}>
                                Login
                            </Link>
                        </Button>

                    </Box>

                    <Divider />
                    {/* 3rd line */}
                    <Grid container sx={{ marginTop: "5px", boxShadow: "1px solid #8A9497", textAlign: "center", padding: { xs: "10px", md: "20px" } }}>
                        <Grid item xs={12}>
                            <Typography variant="h3" component="h3" sx={{ color: "black", fontWeight: "bold", fontSize: { xs: "24px", md: "45px" } }}>
                                Marketing Hub
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="p" component="div" sx={{ color: "#8A9497", py: "10px", fontSize: { xs: "14px", md: "18px" } }}>
                                Everything you need to capture leads and turn them into customers.
                                <span style={{ color: "#10309f" }}> Calculate your price </span>
                                <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.46967 14.5303C5.76256 14.8232 6.23744 14.8232 6.53033 14.5303L11.3033 9.75736C11.5962 9.46447 11.5962 8.98959 11.3033 8.6967C11.0104 8.40381 10.5355 8.40381 10.2426 8.6967L6 12.9393L1.75736 8.6967C1.46447 8.40381 0.989593 8.40381 0.696699 8.6967C0.403806 8.98959 0.403806 9.46447 0.696699 9.75736L5.46967 14.5303ZM5.25 0L5.25 14H6.75L6.75 0L5.25 0Z" fill="#10309F" />
                                </svg>
                            </Typography>
                        </Grid>
                    </Grid>
                    <LevelCard data={CardData} />
                </div>
            }
        </Box>
    );
};

export default LevelCardPage;

// Tdy  task login


