import React, { useEffect, useState } from 'react'
import MyDataGrid from '../../components/table/DataGrid'
import { Backdrop, Box, Button, Chip, CircularProgress, Divider, Grid, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Axios from '../../config/axiosConfig';
import { toast } from 'react-toastify';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteAlert from '../../components/alert/deleteAlert';
import moment from 'moment';

function Users() {
    const [userList, setUserList] = useState([])
    const [Loading, setLoading] = useState(true)
    const [colum, setcolum] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()

    const columns = [
        {
            field: 'username',
            headerName: 'Username',
            width: 150,
            sortable: false,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            sortable: false,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 120,
            sortable: false,
        },
        {
            field: 'user_level',
            headerName: 'User Level',
            width: 110,
            sortable: false,
            renderCell: (params) => params.row["user_level"] ? params.row["user_level"] : " - "

        },
        {
            field: 'join_date',
            headerName: 'Joined Date',
            width: 150,
            sortable: false,
            renderCell: (params) => params.row.join_date ? moment(params.row.join_date).format("DD-MM-YYYY") : "-"
        },
        {
            field: 'expire_date',
            headerName: 'Expire Date',
            width: 150,
            sortable: false,
            renderCell: (params) => params.row.expire_date ? moment(params.row.expire_date).format("DD-MM-YYYY") : "-"
        },
        {
            field: 'days_left',
            headerName: 'Days Left',
            width: 150,
            sortable: false,
            renderCell: (params) => params.row.days_left != null ? params.row.days_left > 30 ? <Chip color='success' size='small' label={params.row.days_left + " Days Left"} /> : params.row.days_left > 10 ? <Chip size='small' color='warning' label={params.row.days_left + " Days Left"} /> : <Chip size='small' color='error' label={params.row.days_left + " Days Left"} /> : " - "
        },
        {
            field: 'payment',
            headerName: 'Payment',
            width: 110,
            sortable: false,
            renderCell: (params) => params.row["payment"] ? <Chip size='small' color={params.row["payment"] == "UnPaid" ? "error" : "success"} label={params.row["payment"]} /> : " - "
        },
        {
            field: 'action',
            headerAlign: "center",
            headerName: 'Action',
            sortable: false,
            minWidth: 180,
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ textAlign: "center", width: "100%" }}>
                    <Tooltip
                        title="view User"
                        arrow
                        onClick={() => {
                            navigate(`/users/view/${params.id}`);
                        }}
                    >
                        <RemoveRedEyeOutlinedIcon sx={{ cursor: "pointer" }} />
                    </Tooltip>
                    <Tooltip
                        title="Edit User"
                        arrow
                        onClick={() => {
                            navigate(`/users/edit/${params.id}`);
                        }}
                    >
                        <EditNoteOutlinedIcon sx={{ cursor: "pointer", mx: 1 }} />
                    </Tooltip>
                    <Tooltip
                        title="Delete User"
                        arrow
                        onClick={() => DeleteUser(params.id)}
                    >
                        <DeleteOutlineOutlinedIcon sx={{ cursor: "pointer", color: "red" }} />
                    </Tooltip>
                </Box>
            )
        }
    ];

    const DeleteUser = async (id) => {
        const isConfirm = await DeleteAlert()
        if (isConfirm) {
            Axios.delete(`/user/${id}`).then(res => {
                const { status, message } = res.data
                if (status) {
                    GetAllUserList()
                }
            }).catch(err => {
                const { data } = err.response
                toast.error(data.message)
            })
        }
    }
    const GetAllUserList = () => {
        setLoading(true)
        Axios.get(params.usertype == "allusers" ? `user/list` : `user/list/filter/${params["usertype"]}`).then(res => {
            const { status, message } = res.data
            if (status) {
                setUserList(message)
                setLoading(false)
            }
        }).catch(err => {
            const { data } = err.response
            toast.error(data.message)
            setLoading(false)
            navigate(-1)
        })
    }
    useEffect(() => {
        GetAllUserList()
        if (localStorage.getItem("role") == "Employee") {
            columns.splice(6, 0, {
                field: 'message',
                headerName: 'Message',
                width: 100,
                sortable: false,
                align: 'center',
                renderCell: (params) => <Link to={`/chat/${params.id}`}><i className='bi bi-chat' style={{ fontSize: "20px", color: "#10309F" }}></i></Link>
            })
            setcolum(columns)
        } else {
            setcolum(columns)
        }
    }, [location.pathname])
    return (
        <Box >
            <Grid container>
                <Backdrop
                    sx={{ color: '#fff', zIndex: 999 }}
                    open={Loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='h4' component="h4" sx={{ fontSize: { xs: "20px", md: "24px" } }}>{params.usertype == "allusers" ? "All Users" : params.usertype}</Typography>
                            <Divider variant="middle" sx={{ margin: { xs: "10px 0px", md: "10px 20px" }, backgroundColor: "gray" }} />
                        </Grid>

                    </Grid>

                    <MyDataGrid rows={userList} columns={colum} id="_id" visible={true} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Users
