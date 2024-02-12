import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import {
    Grid,
    Checkbox,
    Avatar,
    FormControl,
    TextField,
    InputAdornment,
    StyledFab,
    AddIcon,
    MoreIcon,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { AddReactionSharp } from "@mui/icons-material";
const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function ChatPage(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box
            onClick={handleDrawerToggle}
            sx={{ textAlign: "center", backgroundColor: "white" }}
        >
            <Typography variant="h6" sx={{ my: 2, color: "black" }}>
                Employee(123)
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: "center" }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    const jsonData = [
        {
            checkbox: false,
            message: "Hello my friend",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2alg5KlfGY8ZaiZCni3YyZ1lGkfhSMyfrgA&usqp=CAU",
        },
        {
            checkbox: false,
            message: "Hello",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2alg5KlfGY8ZaiZCni3YyZ1lGkfhSMyfrgA&usqp=CAU",
        },
        {
            checkbox: false,
            message: "friend",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2alg5KlfGY8ZaiZCni3YyZ1lGkfhSMyfrgA&usqp=CAU",
        },
        {
            checkbox: false,
            message: " my friend",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2alg5KlfGY8ZaiZCni3YyZ1lGkfhSMyfrgA&usqp=CAU",
        },
        {
            checkbox: false,
            message: "Hello my ",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2alg5KlfGY8ZaiZCni3YyZ1lGkfhSMyfrgA&usqp=CAU",
        },
        {
            checkbox: false,
            message: "Hii",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2alg5KlfGY8ZaiZCni3YyZ1lGkfhSMyfrgA&usqp=CAU",
        },
        {
            checkbox: false,
            message: "hey",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2alg5KlfGY8ZaiZCni3YyZ1lGkfhSMyfrgA&usqp=CAU",
        },
        {
            checkbox: false,
            message: "Hello my friend",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2alg5KlfGY8ZaiZCni3YyZ1lGkfhSMyfrgA&usqp=CAU",
        },
        {
            checkbox: false,
            message: "Hello my friend",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2alg5KlfGY8ZaiZCni3YyZ1lGkfhSMyfrgA&usqp=CAU",
        },
        {
            checkbox: false,
            message: "Hello",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2alg5KlfGY8ZaiZCni3YyZ1lGkfhSMyfrgA&usqp=CAU",
        },
        {
            checkbox: false,
            message: "friend",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2alg5KlfGY8ZaiZCni3YyZ1lGkfhSMyfrgA&usqp=CAU",
        },
        {
            checkbox: false,
            message: " my friend",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2alg5KlfGY8ZaiZCni3YyZ1lGkfhSMyfrgA&usqp=CAU",
        },
        {
            checkbox: false,
            message: "Hello my ",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2alg5KlfGY8ZaiZCni3YyZ1lGkfhSMyfrgA&usqp=CAU",
        },
        {
            checkbox: false,
            message: "Hii",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2alg5KlfGY8ZaiZCni3YyZ1lGkfhSMyfrgA&usqp=CAU",
        },
        {
            checkbox: false,
            message: "hey",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2alg5KlfGY8ZaiZCni3YyZ1lGkfhSMyfrgA&usqp=CAU",
        },
        {
            checkbox: false,
            message: "Hello my friend",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2alg5KlfGY8ZaiZCni3YyZ1lGkfhSMyfrgA&usqp=CAU",
        },
    ];
    return (
        <Grid container sx={{ display: "flex" }}>
            <Grid item xs={12}>
                <AppBar
                    component="nav"
                    sx={{
                        bgcolor: "#EFEFEF",
                        boxShadow: "none",
                        border: "#10309F 3px solid",
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box>
                            <svg
                                width="35"
                                height="35"
                                viewBox="0 0 35 35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M0.189453 17.3194C0.189453 8.03193 7.81585 0.50293 17.2235 0.50293C26.6311 0.50293 34.2575 8.03193 34.2575 17.3194C34.2575 26.6069 26.6311 34.1359 17.2235 34.1359C7.81585 34.1359 0.189453 26.6069 0.189453 17.3194ZM17.2235 3.86623C9.69737 3.86623 3.59626 9.88943 3.59626 17.3194C3.59626 24.7494 9.69737 30.7726 17.2235 30.7726C24.7496 30.7726 30.8507 24.7494 30.8507 17.3194C30.8507 9.88943 24.7496 3.86623 17.2235 3.86623Z"
                                    fill="#10309F"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M17.2257 10.5918C15.3442 10.5918 13.8189 12.0976 13.8189 13.9551C13.8189 15.8126 15.3442 17.3184 17.2257 17.3184C19.1072 17.3184 20.6325 15.8126 20.6325 13.9551C20.6325 12.0976 19.1072 10.5918 17.2257 10.5918ZM10.4121 13.9551C10.4121 10.2401 13.4627 7.22852 17.2257 7.22852C20.9888 7.22852 24.0393 10.2401 24.0393 13.9551C24.0393 17.6701 20.9888 20.6817 17.2257 20.6817C13.4627 20.6817 10.4121 17.6701 10.4121 13.9551Z"
                                    fill="#10309F"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M17.2241 25.7276C13.663 25.7276 10.4681 27.2666 8.28078 29.7132L5.72656 27.4876C8.53319 24.3483 12.645 22.3643 17.2241 22.3643C21.8032 22.3643 25.915 24.3483 28.7216 27.4876L26.1674 29.7132C23.98 27.2666 20.7852 25.7276 17.2241 25.7276Z"
                                    fill="#10309F"
                                />
                            </svg>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    flexGrow: 1,
                                    color: "black",
                                }}
                            >
                                Employee(123)
                            </Typography>
                        </Box>
                        <Box>
                            <TextField
                                required
                                id="password"
                                placeholder="Search"
                                InputLabelProps={{
                                    style: { color: "#EFEFEF" },
                                }}
                                type="text"
                                size="small"
                                sx={{
                                    backgroundColor: "#10309F",
                                    width: "150px",
                                    height: "40px",
                                    m: "3px",
                                    color: "white",
                                    borderRadius: "5px",
                                    input: {
                                        "&::placeholder": {
                                            color: "white",
                                        },
                                    },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon sx={{ color: "white" }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                sx={{
                                    backgroundColor: "#10309F",
                                    width: "80px",
                                    height: "40px",
                                    m: "3px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#ffff",
                                        display: "flex",
                                        fontSize: { xs: "10px", md: "12px" },
                                    }}
                                >
                                    Export
                                </Typography>
                            </Button>
                        </Box>
                    </Box>

                </AppBar>
            </Grid>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 3, backgroundColor: "#EFEFEF" }}>
                <Toolbar />

                <Grid item xs={12} md={12}>
                    {jsonData.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                overflow: "hidden",
                                m: "2px",
                            }}
                        >
                            <Checkbox size="small" />
                            <Avatar
                                src={item.src}
                                sx={{ width: "25px", height: "25px", ml: "3px", mr: "3px" }}
                            />
                            <Typography
                                sx={{
                                    backgroundColor: "white",
                                    p: "7px",
                                    ml: "5px",
                                    mr: "3px",
                                    borderColor: "white",
                                    borderRadius: "10px",
                                }}
                            >
                                {item.message}
                            </Typography>
                        </Box>
                    ))}
                </Grid>
            </Box>
            <AppBar
                position="fixed"
                color="primary"
                sx={{
                    top: "auto",
                    bottom: 0,
                    bgcolor: "#EFEFEF",
                    boxShadow: "none",
                    border: "#10309F 3px solid",
                }}
            >
                <Toolbar>
                    <AddReactionSharp sx={{ color: "black" }} />
                    <AttachFileIcon sx={{ color: "black" }} />
                    <FormControl fullWidth sx={{ m: 1, backgroundColor: "#EFEFEF" }}>
                        <TextField
                            placeholder="Type a message....."
                            id="fullWidth"
                            sx={{ m: "5px" }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end">
                                            <svg
                                                width="26"
                                                height="25"
                                                viewBox="0 0 26 25"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M25.2138 11.2421L1.95224 0.132162C1.71801 0.0202996 1.45731 -0.0218311 1.20043 0.0106625C0.943547 0.0431561 0.701015 0.148941 0.500999 0.315732C0.300983 0.482524 0.151689 0.703479 0.0704526 0.95294C-0.0107834 1.2024 -0.0206283 1.47013 0.0420615 1.72504L1.70047 8.45903L12.3159 12.4989L1.70047 16.5387L0.0420615 23.2727C-0.0218079 23.5278 -0.0127846 23.7961 0.0680757 24.0462C0.148936 24.2963 0.29829 24.5178 0.498667 24.6849C0.699044 24.852 0.942159 24.9577 1.19957 24.9897C1.45699 25.0217 1.71806 24.9787 1.95224 24.8656L25.2138 13.7557C25.4488 13.6435 25.6476 13.4658 25.7868 13.2432C25.9261 13.0207 26 12.7625 26 12.4989C26 12.2353 25.9261 11.9771 25.7868 11.7545C25.6476 11.532 25.4488 11.3542 25.2138 11.2421Z"
                                                    fill="#8A9497"
                                                />
                                            </svg>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                </Toolbar>
            </AppBar>
        </Grid>
    );
}

ChatPage.propTypes = {
    window: PropTypes.func,
};

export default ChatPage;
