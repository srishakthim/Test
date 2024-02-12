import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import MyRouter from '../routers/Router';
import MiniDrawer from './sidebar/sidebar';
import Navbar from './menubar/navbar';
import ChatPage from '../pages/ChatPage';
import UserChatPage from '../pages/UserChatPage';
import MyProfile from '../pages/User Pages/MyProfile';
import UserProfile from '../pages/User Pages/UserProfile';
import ChangePassword from '../pages/Auth Pages/ChangePassword';

function Layout() {
    const [open, setOpen] = useState(false)
    const location = useLocation()
    return (
        <Grid container>
            {
                (location.pathname.startsWith("/chat") || location.pathname.startsWith("/setting") || location.pathname.startsWith("/changepassword")) && localStorage.getItem("role") == "User" ?
                    <Routes>
                        <Route path="/chat/:id" element={<UserChatPage />} />
                        <Route path='/setting/myprofile' element={<UserProfile />} />
                        <Route path='/changepassword' index element={<ChangePassword />} />
                        <Route path="*" element={<Navigate to={`/chat/${localStorage.getItem("userid")}`} />} />
                    </Routes> :
                    (!["/auth/signin", "/auth/signup", "/waiting"].includes(location.pathname) && localStorage.getItem("token")) ?
                        <React.Fragment>
                            <Grid item md={2.8} lg={2} sx={{ position: "relative", display: { xs: "none", md: "block" } }}>
                                <MiniDrawer open={open} setOpen={setOpen} />
                            </Grid>
                            <Grid item xs={12} md={9.2} lg={10} >
                                <Grid container>
                                    <Grid item xs={12} sx={{ position: "sticky", top: 0, backgroundColor: "#FFF", zIndex: 99 }}>
                                        <Navbar user={true} open={open} setOpen={setOpen} />
                                    </Grid>
                                    <Grid item xs={12} sx={{ p: location.pathname.startsWith("/chat") ? "0px" : "20px", mt: location.pathname.startsWith("/chat") ? "0px" : "10px" }}>
                                        <MyRouter />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                        :
                        <Grid item xs={12}>
                            <MyRouter />
                        </Grid>

            }

        </Grid>
    )
}

export default Layout