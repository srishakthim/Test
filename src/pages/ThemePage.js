import React, { useEffect, useState } from "react";
import { Typography, Grid, Button } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { MuiColorInput } from "mui-color-input";
import Axios from "../config/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ThemePage() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [value, setValue] = useState('1');
  const [themeColor, setthemeColor] = useState('#FFF')

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const RecommendedColor = [
    { width: "40px", height: "40px", backgroundColor: "#000000", margin: "1px", cursor: "pointer", },
    { width: "40px", height: "40px", backgroundColor: "#953597", margin: "1px", cursor: "pointer", },
    { width: "40px", height: "40px", backgroundColor: "#824646", margin: "1px", cursor: "pointer", },
    { width: "40px", height: "40px", backgroundColor: "#A4652C", margin: "1px", cursor: "pointer", },
    { width: "40px", height: "40px", backgroundColor: "#10309F", margin: "1px", cursor: "pointer", },

  ]
  const SelectColor = (color) => {
    setthemeColor(color)
    console.log(color)
  }
  const changeTheme = () => {
    Axios.post("theme/setemployeetheme", { userId: id, employeeId: localStorage.getItem("userid"), color: themeColor }).then(res => {
      const { status, message } = res.data
      if (status) {
        toast.success("BG Color Change Successfully");
        navigate(-1)
      } else {
        toast.success(message)
      }
    }).catch(err => {
      const { data } = err?.response
      toast.error(data.message)
    })
  }
  const GetTheme = () => {
    Axios.post("theme/getemployeetheme", { userId: id, employeeId: localStorage.getItem("userid") }).then(res => {
      const { status, message } = res.data
      if (status) {
        setthemeColor(message["color"] ? message["color"] : "")
      } else {
        toast.success(message)
      }
    }).catch(err => {
      const { data } = err?.response
      toast.error(data.message)
    })
  }

  useEffect(() => {
    GetTheme()
  }, [])
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Change Chat Color</Typography>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', fontWeight: "bold" }}>
              <TabList onChange={handleChangeTab} centered aria-label="lab API tabs example">
                <Tab label="Recommended" value="1" />
                <Tab label="Custom Color" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Grid container spacing={2} sx={{ display: "flex", justifyContent: "space-evenly", mt: 2, }}>
                {
                  RecommendedColor.map((val, ind) => <Box onClick={() => SelectColor(val.backgroundColor)} sx={{ ...val, border: themeColor == val.backgroundColor ? "3px solid red" : "" }}></Box>)
                }
              </Grid>
              <Button
                onClick={changeTheme}
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: "#1136B4",
                  textTransform: "none",
                  mt: 2,
                  "&:hover": {
                    backgroundColor: "#1136B4",
                  }
                }}
              >
                Save
              </Button>
            </TabPanel>
            <TabPanel value="2" sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
              <MuiColorInput value={themeColor} onChange={SelectColor} />
              <Button
                onClick={changeTheme}
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: "#1136B4",
                  textTransform: "none",
                  mt: 2,
                  "&:hover": {
                    backgroundColor: "#1136B4",
                  }
                }}
              >
                Save
              </Button>
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ThemePage;
