import React from "react";
import { Box, Typography, Button, Grid, TextField, FormLabel, Divider, } from "@mui/material";

const FooterForm = () => {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4" sx={{ fontSize: { xs: "20px", md: "28px" } }}>Footer</Typography>
                    <Divider variant="middle" sx={{ margin: { xs: "10px 0px", md: "10px 20px" }, backgroundColor: "gray" }} />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h4" sx={{ fontSize: { xs: "15px", md: "18px" }, fontWeight: "600" }} >
                        About Us
                    </Typography>
                </Grid>

                <Grid item xs={12} >
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
                            favicon.ico
                        </Typography>
                        <Button variant="contained" disableElevation component="label" sx={{
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
                            <input type="file" hidden />
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ width: "158px", height: "42px", border: "dotted 1px #10309f" }}></Box>
                </Grid>

            </Grid>

            <Typography variant="h3" component="h3" sx={{ fontWeight: "600", mt: 2, paddingBottom: "10px", fontSize: { xs: "15px", md: "18px" } }}
            >
                Contact Us
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormLabel sx={{ color: "black", fontSize: { md: "18px" } }}>Address</FormLabel>
                    <TextField
                        size="small"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 1 }}
                        placeholder="Enter Your First Name"
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormLabel sx={{ color: "black", fontSize: { md: "18px" } }}>Email ID </FormLabel>
                    <TextField
                        size="small"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 1 }}
                        placeholder="Enter Your Email ID"
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormLabel sx={{ color: "black", fontSize: { md: "18px" } }}>Phone Number</FormLabel>
                    <TextField
                        size="small"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 1 }}
                        placeholder="Enter Your Phone Number"
                    />
                </Grid>
            </Grid>


            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{ fontSize: { xs: "15px", md: "18px" }, mt: 2, fontWeight: "600" }}
                    >
                        Copy Right
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <FormLabel sx={{ color: "black" }}>Copy Right </FormLabel>
                    <TextField
                        size="small"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 1 }}
                        placeholder="Enter Your Last Name"
                    />
                </Grid>
            </Grid>

            {/* Save Button */}
            <Grid container justifyContent="flex-end">
                <Grid>
                    <Button
                        sx={{
                            color: "white",
                            backgroundColor: "#10309f",
                            mt: "30px",
                            "&:hover": { backgroundColor: "#10309f" }
                        }}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FooterForm;
