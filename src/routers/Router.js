import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Users from '../pages/User Pages/AllUsers';
import SocialPage from '../pages/SocialPage';
import UserForm from '../components/forms/userForm.js';
import HeaderForm from '../components/forms/hederForm.js';
import LogoForm from '../components/forms/logoForm.js';
import Dashboard from '../pages/Dashboard.js';
import FooterForm from '../components/forms/footerForm.js';
import NewUsers from '../pages/User Pages/NewUsers.js';
import Advertiesment from '../pages/advertiesment.js';
import MyProfile from '../pages/User Pages/MyProfile.js';
import Signup from '../pages/Auth Pages/Signup.js';
import LoadingPage from '../pages/Auth Pages/LoadingPage.js';
import { Box } from '@mui/material';
import Login from '../pages/Auth Pages/Login.js';
import ChatPage from '../pages/ChatPage.js';
import UserChatPage from '../pages/UserChatPage.js';
import UserProfile from '../pages/User Pages/UserProfile.js';
import ChangePassword from '../pages/Auth Pages/ChangePassword.js';
import ForgotPassword from '../pages/Auth Pages/ForgotPassword.js';
import ThemePage from '../pages/ThemePage.js';

function MyRouter() {

    return (
        <Box>
            {
                localStorage.getItem("role") == "User" && localStorage.getItem("user_level") !== "" ? <Routes>
                    <Route path="/chat/:id" element={<UserChatPage />} />
                    <Route path='/setting/myprofile' element={<UserProfile />} />
                    <Route path='/changepassword' index element={<ChangePassword />} />
                    <Route path="/*" element={<Navigate to={`/chat/${localStorage.getItem("userid")}`} />} />
                </Routes> : localStorage.getItem("role") == "User" && localStorage.getItem("user_level") == "" ?
                    <Routes>
                        <Route path='/waiting' element={<LoadingPage />} />
                        <Route path="/*" element={<Navigate to="/waiting" />} />
                    </Routes>
                    : localStorage.getItem("token") && localStorage.getItem("role") != "User" ? (<Routes>
                        <Route path='/dashboard' index element={<Dashboard />} />
                        <Route path='/changepassword' index element={<ChangePassword />} />
                        <Route path='/newusers' element={<NewUsers />} />
                        <Route path='/chat/:id' element={<ChatPage />} />
                        <Route path='/users/:usertype' element={<Users />} />
                        <Route path='/users/:action/:id' element={<UserForm />} />
                        <Route path='/menu/header' element={<HeaderForm />} />
                        <Route path='/setting/logo' element={<LogoForm />} />
                        <Route path='/menu/footer' element={<FooterForm />} />
                        <Route path='/social' element={<SocialPage />} />
                        <Route path='/advertisement/:level' element={<Advertiesment />} />
                        <Route path='/setting/myprofile' element={<MyProfile />} />
                        <Route path='/theme/:id' element={<ThemePage />} />
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>) : (<Routes>
                        <Route path='/auth/signin' element={<Login />} />
                        <Route path='/auth/signup' element={<Signup />} />
                        <Route path='/auth/forget' element={<ForgotPassword />} />
                        <Route path="*" element={<Navigate to="/auth/signin" />} />
                    </Routes>)
            }

        </Box>
    )
}

export default MyRouter;
