import React, { createContext, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './components/theme/theme';
import "../src/assets/css/style.css"
import Layout from './components/layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationContext } from './context/notificationContext';

function App() {
  const [notification, setNotification] = useState([])
  return (
    <ThemeProvider theme={customTheme}>
      <ToastContainer style={{ zIndex: 999999 }} />
      <NotificationContext.Provider value={[notification, setNotification]}>
        <Layout />
      </NotificationContext.Provider>
    </ThemeProvider>
  );
}
export default App;



