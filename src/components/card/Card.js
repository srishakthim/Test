import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, CardActions, Chip, List, ListItem, Button, ListItemText, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';



const LevelCard = ({ data }) => {

    const [changeStyle, setChangeStyle] = useState("left");
    const LeftData = {
        backgroundColor: "#ffff",
        padding: { xs: "10px", md: "15px" },
        textAlign: "center",
        flex: 1,
        border: "hsla(227, 82%, 34%, 1) solid 1px",
        borderRadius: 50,
        color: "black",
        fontWeight: "500",
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: "#ffff"
        },
    };

    const RightData = {
        backgroundColor: "#ffff",
        padding: { xs: "10px", md: "15px" },
        textAlign: "center",
        flex: 1,
        border: "hsla(227, 82%, 34%, 1) solid 1px",
        borderRadius: 50,
        fontWeight: "500",
        color: "black",
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: "#ffff"
        },
    };

    return (
        <div>
            <Grid container>
                {data && data.map((jsonData) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} >
                            <Card sx={{ alignContent: "center", textAlign: "center", padding: "30px", boxShadow: "none", border: "#D9D9D9 2px solid" }}>
                                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                                    <Chip
                                        avatar={<Avatar alt={jsonData.level} src={""} />}
                                        label={`Level ${jsonData.level}`}
                                        size="small"
                                        sx={{ backgroundColor: "hsla(227, 82%, 34%, 1)", color: "white", fontSize: "15px", p: "15px 5px" }}
                                    />
                                </CardActions>
                                <CardContent sx={{ alignContent: "center", textAlign: "center" }}>
                                    <Typography variant="h6" component="h6" sx={{ color: "#8A9497", fontSize: "12px", fontWeight: "600" }}>
                                        Starts at
                                    </Typography>
                                    <Typography variant="h4" component="h4" sx={{ fontSize: "25px", fontWeight: "600" }}>
                                        ₹ {jsonData.payment_type[0]["amount"]} /mo
                                    </Typography>
                                    <Typography variant="h6" component="h6" sx={{ fontWeight: "500", fontSize: "14px" }}>
                                        <span style={{ color: "#8A9497" }}> billed at <strike> ₹ {jsonData.payment_type[1]["amount"]}</strike></span> ₹ {jsonData.payment_type[1]["amount"]} /yr
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {/* Additional content */}
                                    </Typography>
                                </CardContent>

                                <Box sx={{
                                    display: 'flex',
                                    // flexDirection: 'row',
                                    backgroundColor: "hsla(0, 0%, 85%, 1)",
                                    borderRadius: 50,
                                    border: "#D9D9D9 2px solid",
                                    fontWeight: "500",
                                    justifyContent: 'space-between',
                                    alignItems: "center",
                                    paddingBottom: "0"
                                }}>
                                    <Box
                                        onClick={() => setChangeStyle("right")}
                                        sx={changeStyle === "right" ? { ...RightData } : { cursor: 'pointer', flex: 1, }}
                                    >
                                        <Typography variant="h6" component="h6" sx={{ fontSize: { xs: "10px", md: "11px" }, color: "black", fontWeight: "500" }}>
                                            Pay Monthly
                                        </Typography>
                                        <Typography variant="h6" component="h6" sx={{ fontSize: { xs: "10px", md: "11px" }, color: "gray", fontWeight: "500" }}>
                                            Commit monthly
                                        </Typography>
                                    </Box>

                                    <Box
                                        onClick={() => setChangeStyle("left")}
                                        sx={changeStyle === "left" ? { ...LeftData } : { cursor: 'pointer', flex: 1, }}
                                    >

                                        <Typography variant="h6" component="h6" sx={{ fontSize: { xs: "8px", md: "10px" } }}>
                                            Pay Upfront
                                            {/* <span style={{ color: "#10309F" }}>{jsonData.paymentOptions[1].discount}</span> */}
                                        </Typography>
                                        <Typography variant="h6" component="h6" sx={{ fontSize: { xs: "8px", md: "10px" } }}>
                                            Commit annually
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* <CardActions > */}
                                <Button
                                    size="large"
                                    sx={{
                                        backgroundColor: "hsla(227, 82%, 34%, 1)",
                                        borderRadius: 50,
                                        margin: "auto",
                                        fontSize: "14px",
                                        padding: "10px 20px 10px 20px ",
                                        color: "white",
                                        my: "20px",
                                        '&:hover': {
                                            backgroundColor: "hsla(227, 82%, 34%, 1)",
                                        },
                                    }}
                                >
                                    <Link to={`/auth/signup/Level${jsonData.level}`} style={{ color: "inherit", textDecoration: "none" }}>
                                        Subscribe
                                    </Link>
                                </Button>
                                {/* </CardActions> */}
                                <List sx={{ listStyleType: "disc", fontWeight: "500", marginTop: "10px", padding: "0" }} dense>
                                    {jsonData.features.map((feature, index) => (
                                        <ListItem key={index} sx={{ display: 'list-item', fontWeight: '700', p: "5px 5px", ml: "15px" }}>
                                            <ListItemText primary={feature} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div >
    );
};

export default LevelCard;