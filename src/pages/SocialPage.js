import React from 'react'
import MyDataGrid from '../components/table/DataGrid'
import { Box, Button, Divider, Grid, InputAdornment, TextField, Typography } from '@mui/material'




function SocialPage() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90, sortable: false, },
        {
            field: 'Title',
            headerName: 'Title',
            width: 150,
            sortable: false,
        },
        {
            field: 'Url',
            headerName: 'URL',
            width: 300,
            sortable: false,
        },
        {
            field: 'Icon',
            headerName: 'Icon',
            width: 110,
            sortable: false,
        },
        {
            field: 'action',
            headerName: 'Action',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            minWidth: 200,
            flex: 1,
            valueGetter: (params) =>
                `#`,
        },
    ];

    const rows = [
        { id: 1, Url: 'https://www.youtube.com/', Title: 'Youtube', Icon: 14 },
        { id: 2, Url: 'https://www.youtube.com/', Title: 'Instagram', Icon: 31 },
        { id: 3, Url: 'https://www.youtube.com/', Title: 'LinkedIn', Icon: 31 },
        { id: 4, Url: 'https://www.youtube.com/', Title: 'Facebook', Icon: 11 },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h4' component="h4" sx={{ fontSize: { xs: "20px", md: "24px" } }}>Social</Typography>
                    <Divider variant="middle" sx={{ margin: { xs: "10px 0px", md: "10px 20px" }, backgroundColor: "gray" }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
                        <TextField size='small' fullWidth placeholder='Search...' sx={{
                            maxWidth: "250px", '& .MuiInputAdornment-root': {
                                backgroundColor: "#10309F",
                                color: "#FFF",
                                padding: '20px 20px',
                            },
                            '& .MuiInputBase-root': {
                                paddingRight: "0px"
                            }
                        }} InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <Typography variant='h6' component="h6" fontSize="12px" >Search</Typography>
                                </InputAdornment>
                            ),
                        }} />
                        <Box sx={{ display: "flex", ml: 2, alignItems: "center" }}>

                            <Button variant='contained' sx={{ backgroundColor: "#10309F", borderRadius: "0px" }} disableElevation>+ Add New</Button>
                        </Box>
                    </Box>
                    <MyDataGrid rows={rows} columns={columns} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default SocialPage
