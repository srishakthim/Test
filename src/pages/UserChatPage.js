import {
  AppBar,
  Avatar,
  Backdrop,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router-dom";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Axios from "../config/axiosConfig";
import Navbar from "../components/menubar/navbar";
import io from "socket.io-client";
import ChatHistorySideBar from "../components/sidebar/ChatHistorySideBar";
import { toast } from "react-toastify";
import { NotificationContext } from "../context/notificationContext";

function UserChatPage() {
  const { id } = useParams();
  const containerRef = useRef(null);
  const [DownloadLoad, setDownloadLoad] = useState("True");
  const [notification, setNotification] = useContext(NotificationContext);
  const [historyData, sethistoryData] = useState([]);
  const [historyList, sethistoryList] = useState([]);
  const [chatBG, setchatBG] = useState("");
  const [select, setSelect] = useState(false);
  const [UploadProgress, setUploadProgress] = useState(0);
  const [open, setopen] = useState(false);
  const [dia, setdia] = useState(false);
  const [username, setusername] = useState("");
  const [profile, setprofile] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [searchText, setsearchText] = useState("");
  const [fileUploadLoading, setfileUploadLoading] = useState(true);
  const hiddenFileInput = useRef(null);

  const socket = io(`http://${process.env.REACT_APP_HOST_URL}:3030`);

  const GetAllChatMessage = async () => {
    await Axios.post("message/getmessage", {
      from: localStorage.getItem("userid"),
      to: localStorage.getItem("managed_by"),
    }).then((res) => {
      const { status, message } = res.data;
      if (status) {
        setMessages(message);
        setfileUploadLoading(false);
        setDownloadLoad(false);
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }
    });
  };

  const GetUserDetails = async () => {
    await Axios.get(`user/${localStorage.getItem("managed_by")}`)
      .then((res) => {
        const { status, message } = res.data;
        if (status) {
          setusername(message["username"] ? message["username"] : "");
          setprofile(message["profile"] ? message["profile"] : "");
        } else {
          if (message == "User not found") {
            localStorage.clear();
            window.location.href = "/auth/signin";
          }
        }
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.message == "User not found") {
          localStorage.clear();
          window.location.href = "/auth/signin";
        }
      });
  };

  const CreateMessage = async (data) => {
    await Axios.post("/message/addmessage", data)
      .then(async (res) => {
        const { status, message } = res.data;
        if (status) {
          await GetAllChatMessage();
          setfileUploadLoading(false);
        } else {
          toast.error(message);
          setfileUploadLoading(false);
        }
      })
      .catch((err) => {
        toast.error("Error");
        setfileUploadLoading(false);
      });
  };

  const AutoReply = async (text) => {
    await Axios.post("/message/autoreply", { message: text }).then((res) => {
      const { status, message } = res.data;
      if (status) {
        const msg = {
          message: message,
          users: [
            localStorage.getItem("managed_by"),
            localStorage.getItem("userid"),
          ],
          sender: localStorage.getItem("managed_by"),
          timestamps: Date.now(),
        };
        setMessages((prevMessages) => [...prevMessages, msg]);
        CreateMessage(msg);
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("send-private-msg", {
        sender: localStorage.getItem("userid"),
        recipient: localStorage.getItem("managed_by"),
        message: messageInput,
        fromSelf: true,
        roomid: localStorage.getItem("userid"),
      });
      const messageData = {
        message: messageInput,
        users: [
          localStorage.getItem("userid"),
          localStorage.getItem("managed_by"),
        ],
        sender: localStorage.getItem("userid"),
        timestamps: Date.now(),
      };
      CreateMessage(messageData);
      AutoReply(messageInput);
      setMessageInput("");
    }
  };
  const addMsgToHitory = (obj) => {
    sethistoryData((pre) => [...pre, obj]);
  };
  const ConverToHistory = () => {
    Axios.post("/message/convert", {
      history: historyData,
      sender: localStorage.getItem("userid"),
      receiver: id,
      history_name: `History ${Math.floor(1000 + Math.random() * 9000)}`,
    }).then((res) => {
      const { status, message } = res.data;
      if (status) {
        setSelect(false);
        sethistoryData([]);
        toast.success(message);
        getHistory();
      }
    });
  };
  const getHistory = () => {
    Axios.post(`/message/gethistory`, {
      receiver: id,
      sender: localStorage.getItem("userid"),
    }).then((res) => {
      const { status, message } = res.data;
      if (status) {
        setSelect(false);
        sethistoryData([]);
        sethistoryList(message);
      }
    });
  };

  const SelectFile = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = async (event) => {
    try {
      setfileUploadLoading(true);
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("users", [
        localStorage.getItem("userid"),
        localStorage.getItem("managed_by"),
      ]);
      formData.append("sender", localStorage.getItem("userid"));
      formData.append("timestamps", Date.now());

      socket.emit("send-private-msg", {
        sender: localStorage.getItem("userid"),
        recipient: localStorage.getItem("managed_by"),
        filename: file.name,
        fromSelf: true,
        roomid: localStorage.getItem("userid"),
      });
      setfileUploadLoading(true);
      await Axios.post("/message/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      })
        .then(async (res) => {
          const { status, message } = res.data;
          if (status) {
            setUploadProgress(0);
            await GetAllChatMessage();
          } else {
            setUploadProgress(0);
            setfileUploadLoading(false);
            toast.error(message);
          }
        })
        .catch((err) => {
          if (err?.response) {
            const { data } = err?.response;
            toast.error(data.message);
            setUploadProgress(0);
            setfileUploadLoading(false);
          } else {
            setUploadProgress(0);
            toast.error("Internal Server Error");
            setfileUploadLoading(false);
          }
        });
    } catch (err) {
      setfileUploadLoading(false);
    }
  };
  const downloadFile = async (filename) => {
    setfileUploadLoading(true);
    try {
      const response = await fetch(
        `http://${process.env.REACT_APP_HOST_URL}:3030/api/v1/download/${filename}`
      );

      if (!response.ok) {
        throw new Error("Download failed");
      }

      // Extract filename from content-disposition header, if available
      const contentDisposition = response.headers.get("content-disposition");
      const match =
        contentDisposition && contentDisposition.match(/filename="(.+)"/);
      const suggestedFilename = match ? match[1] : filename;

      // Create a Blob from the response
      const blob = await response.blob();

      // Create a download link and trigger a click to download the file
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = suggestedFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setfileUploadLoading(false);
    } catch (error) {
      setfileUploadLoading(false);
      console.error("Error downloading file:", error);
    }
    // if (filename) {
    //     const downloadLink = document.createElement('a');
    //     downloadLink.href = `http://${process.env.REACT_APP_HOST_URL}:3030/api/v1/download/${filename}`;
    //     downloadLink.download = filename;
    //     document.body.appendChild(downloadLink);
    //     downloadLink.click();
    //     document.body.removeChild(downloadLink);
    // }
  };
  const GetTheme = () => {
    Axios.post("theme/getemployeetheme", {
      employeeId: localStorage.getItem("managed_by"),
      userId: id,
    }).then((res) => {
      const { status, message } = res.data;
      if (status) {
        setchatBG(message["color"]);
      }
    });
  };
  const SearchChatMessage = (e) => {
    if (e.target.value == "") {
      GetAllChatMessage();
    } else {
      Axios.post("message/searchmessage", {
        to: localStorage.getItem("managed_by"),
        from: id,
        text: e.target.value,
      }).then((res) => {
        const { status, message } = res.data;
        if (status) {
          setMessages(message);
        }
      });
    }
  };

  useEffect(() => {
    GetUserDetails();
    getHistory();
    GetAllChatMessage();
    GetTheme();
    socket.emit("add-user", localStorage.getItem("userid"));
    socket.emit("join-chat", localStorage.getItem("userid"));
    socket.on("private-msg-received", (data) => {
      data.fromSelf =
        data.sender == localStorage.getItem("userid") ? true : false;
      setMessages((prevMessages) => [...prevMessages, data]);
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 100);
    });
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
    return () => {
      socket.disconnect();
    };
  }, [containerRef.current]);

  return (
    <Grid container>
      {!DownloadLoad ? (
        <Backdrop sx={{ color: "#fff", zIndex: 999 }} open={fileUploadLoading}>
          <CircularProgress variant="determinate" value={UploadProgress} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" component="div">
              {`${Math.round(UploadProgress)}%`}
            </Typography>
          </Box>
        </Backdrop>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: 999, flexDirection: "column" }}
          open={DownloadLoad}
        >
          <CircularProgress color="inherit" />
          {DownloadLoad != "True" ? <Typography>Downloading</Typography> : ""}
        </Backdrop>
      )}

      <Grid item xs={12} sx={{ position: "sticky", top: 0, zIndex: 9999 }}>
        <Navbar user={false} open={false} setOpen={() => {}} />
      </Grid>
      <Grid item xs={12} sx={{ position: "sticky", top: 55, zIndex: 99 }}>
        <Box
          sx={{
            bgcolor: "#EFEFEF",
            border: "#10309F 1px solid",
            p: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => setopen(!open)}>
                <i class="bi bi-list"></i>
              </IconButton>
              <Avatar
                src={profile}
                alt="Employee Profile"
                sx={{
                  width: { xs: "28px", sm: "35px" },
                  height: { xs: "28px", sm: "35px" },
                  fontSize: { xs: "16px", sm: "20px", md: "18px" },
                }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  ml: 1,
                  fontSize: { xs: "14px", sm: "16px", md: "18px" },
                  color: "black",
                }}
              >
                {username}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                placeholder="Search..."
                type="text"
                size="small"
                onChange={SearchChatMessage}
                sx={{
                  display: { xs: "none", sm: "block" },
                  backgroundColor: "#10309F",
                  m: "3px",
                  color: "#FFF",
                  fontSize: "14px",
                  borderRadius: "5px",
                  input: {
                    fontSize: "14px",
                    color: "#FFF",
                    "&::placeholder": {
                      fontSize: "14px",
                      color: "#FFF",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color: "white",
                          fontSize: { xs: "16px", md: "22px" },
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              {messages.length > 0 && (
                <Button
                  onClick={() => setSelect(!select)}
                  sx={{
                    backgroundColor: "#10309F",
                    m: "3px",
                    color: "#FFF",
                    textTransform: "none",
                    px: 2,
                    "&:hover": {
                      backgroundColor: "#10309F",
                      color: "#FFF",
                    },
                  }}
                >
                  {select ? "Cancel" : "Export"}
                </Button>
              )}
              {historyData.length > 0 && (
                <Button
                  onClick={() => ConverToHistory()}
                  sx={{
                    backgroundColor: "#10309F",
                    m: "3px",
                    color: "#FFF",
                    textTransform: "none",
                    px: 2,
                    "&:hover": {
                      backgroundColor: "#10309F",
                      color: "#FFF",
                    },
                  }}
                >
                  Convert
                </Button>
              )}
            </Box>
          </Box>
          <TextField
            placeholder="Search..."
            type="text"
            fullWidth
            size="small"
            sx={{
              display: { xs: "block", sm: "none" },
              backgroundColor: "#10309F",
              m: "3px",
              color: "#FFF",
              fontSize: "14px",
              borderRadius: "5px",
              input: {
                fontSize: "14px",
                color: "#FFF",
                "&::placeholder": {
                  fontSize: "14px",
                  color: "#FFF",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: "white",
                      fontSize: { xs: "16px", md: "22px" },
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ backgroundColor: chatBG, minHeight: "70vh", p: 3 }}
      >
        <div
          ref={containerRef}
          style={{
            overflowY: "auto",
            maxHeight: "68vh",
            overflowX: "hidden",
            scrollbarWidth: "none",
          }}
        >
          {messages.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: item["fromSelf"] ? "flex-end" : "",
                m: "2px",
              }}
            >
              {select ? (
                <Checkbox
                  onClick={() => addMsgToHitory(item)}
                  size="small"
                  style={{
                    transform: "scale(.7)",
                    width: "25px",
                    height: "25px",
                  }}
                />
              ) : (
                ""
              )}
              {!item["fromSelf"] && (
                <Avatar src={profile} sx={{ width: "30px", height: "30px" }} />
              )}
              {/* {
                            item.message.startsWith("data:image") ? <div className="container" onClick={() => downloadFile(item.message, id)}>
                                <img width="200px" style={{ paddingLeft: '10px' }} src={item.message} alt="Image" />
                                <div className="download-icon"><i class="bi bi-download"></i></div>
                            </div>  */}
              <Typography
                sx={{
                  backgroundColor: "white",
                  p: "5px 15px",
                  m: "5px 10px",
                  borderColor: "white",
                  textAlign: "right",
                  borderRadius: "10px",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
                }}
              >
                {!item.message ? (
                  <IconButton
                    onClick={() => downloadFile(item.filename)}
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                  >
                    <Chip
                      label={
                        item.filename.length > 10
                          ? `${item.filename.slice(0, 15)}...`
                          : item.filename
                      }
                    />
                    <i
                      class="bi bi-download"
                      style={{ paddingLeft: "10px" }}
                    ></i>
                  </IconButton>
                ) : (
                  item.message
                )}
              </Typography>
              {/* } */}
            </Box>
          ))}
        </div>
      </Grid>
      <Grid item xs={12} sx={{ position: "sticky", bottom: 0, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 999999,
            backgroundColor: "#FFF",
          }}
        >
          <input
            accept="*"
            type="file"
            onChange={handleChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
          <AttachFileIcon
            onClick={SelectFile}
            sx={{ color: "#8A9497", mx: 1, cursor: "pointer" }}
          />
          <TextField
            onKeyDown={handleKeyPress}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message....."
            size="small"
            fullWidth
            sx={{ m: "5px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleSendMessage}>
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
        </Box>
      </Grid>
      <ChatHistorySideBar
        open={open}
        setOpen={setopen}
        history={historyList}
        getHitory={getHistory}
        dia={dia}
        setdia={setdia}
        share={true}
      />
    </Grid>
  );
}

export default UserChatPage;
