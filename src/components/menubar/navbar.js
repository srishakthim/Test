import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../config/axiosConfig";
import { toast } from "react-toastify";

function Navbar({ open, setOpen, user }) {
  const navigate = useNavigate();
  const [profile, setprofile] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const Open = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    setAnchorEl(null);
    localStorage.clear();
    navigate("/auth/signin");
  };
  const getDetails = () => {
    Axios.get(`user/${localStorage.getItem("userid")}`)
      .then((res) => {
        const { status, message } = res.data;
        if (status) {
          setprofile(message["profile"] ? message["profile"] : "");
        } else {
          toast.error(message);
        }
      })
      .catch((err) => {
        if (err?.response) {
          const { data } = err?.response;
          toast.error(data.message);
        } else {
          toast.error("Internal Server Error");
        }
      });
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <AppBar
      position="sticky"
      open={open}
      elevation={1}
      sx={{ color: "black", backgroundColor: "white", top: 0 }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box style={{ display: "flex", alignItems: "center" }}>
          {user ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            ""
          )}
          <Typography
            variant="h6"
            noWrap
            component="h6"
            sx={{ fontSize: { xs: "16px", md: "18px" } }}
          >
            <Link
              to="/"
              style={{
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Hii, {localStorage.getItem("username")} !
            </Link>
          </Typography>
        </Box>
        <div style={{ display: "flex", alignItems: "center" }}>
          {localStorage.getItem("ref_id") && (
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: "12px", md: "16px" }, mr: 2 }}
            >
              Ref ID : {localStorage.getItem("ref_id")}
            </Typography>
          )}

          <Avatar
            src={profile}
            className="rounded-circle"
            onClick={handleClick}
            style={{ width: "35px", cursor: "pointer", height: "35px" }}
            alt="Avatar"
          />
        </div>
      </Toolbar>
      <Menu
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={Open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {localStorage.getItem("role") == "User" ? (
          <Link
            to={`/chat/${localStorage.getItem("userid")}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <MenuItem onClick={handleClose}>Back to Conversation</MenuItem>
          </Link>
        ) : (
          ""
        )}
        <Link
          to="/setting/myprofile"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Link>
        <Link
          to="/changepassword"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <MenuItem onClick={handleClose}>Change Password</MenuItem>
        </Link>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Navbar;
