import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';
import { LoadingButton } from '@mui/lab';



const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '&.MuiDataGrid-root': {
        border: 'none',
    },
    '& .MuiDataGrid-columnHeader': {
        backgroundColor: '#10309F',
        color: '#FFF',
        fontWeight: 'bold',
    },
}));

export default function MyDataGrid({ rows, columns, id, visible }) {
    const [filteredRows, setFilteredRows] = useState(rows);
    const [loading, setloading] = useState(false);

    const handleSearchChange = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filteredData = rows.filter((row) => {
            return columns.some((column) =>
                String(row[column.field]).toLowerCase().includes(searchValue)
            );
        });
        setFilteredRows(filteredData);
    };
    const exportToExcel = (data, columns) => {
        setloading(true)
        const filteredData = data.map(item => {
            const filteredItem = {};
            columns.forEach(column => {
                filteredItem[column] = item[column];
            });
            return filteredItem;
        });

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(filteredData);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${localStorage.getItem("userid")}.xlsx`);
        setloading(false)
    };
    useEffect(() => {
        setFilteredRows(rows);
    }, [rows]);

    return (
        <Box >
            {
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2, flexWrap: "wrap-reverse" }}>
                    <TextField size='small' fullWidth placeholder='Search...' sx={{
                        maxWidth: "350px", '& .MuiInputAdornment-root': {
                            backgroundColor: "#10309F",
                            color: "#FFF",
                            padding: '20px 20px',
                        },
                        '& .MuiInputBase-root': {
                            paddingRight: "0px"
                        }

                    }} onChange={handleSearchChange} />
                    {
                        <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 0 }, justifyContent: "end" }}>
                            {(localStorage.getItem("role") !== "Employee" && visible) && <Link to='/users/create/new' style={{ color: "inherit", backgroundColor: "inherit", textDecoration: "none" }}> <Button variant='contained' sx={{ mr: 2, minWidth: "120px", backgroundColor: "#10309F", borderRadius: "0px", "&:hover": { backgroundColor: "#10309F" } }} disableElevation>+  Add New</Button></Link>}
                            {(visible && rows.length > 0) && <LoadingButton loading={loading} variant='contained' onClick={() => exportToExcel(rows, ["username", "email", "phone", "payment", "user_level", "join_date", "expire_date"])} sx={{ backgroundColor: "#10309F", borderRadius: "0px", "&:hover": { backgroundColor: "#10309F" } }} disableElevation> <svg width="14" height="16" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 6H11V0H5V6H1L8 14L15 6ZM0 16H16V18H0V16Z" fill="white" />
                            </svg>&nbsp; Export
                            </LoadingButton>}
                        </Box>
                    }
                </Box>

            }
            <Box sx={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px', borderRadius: '6px', border: '1px solid #10309F' }}>
                <StyledDataGrid
                    rows={filteredRows}
                    columns={columns}
                    getRowId={(row) => row[id]}
                    autoHeight={true}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection={false}
                    disableColumnMenu
                    disableColumnFilter
                    disableColumnSelector
                    disableRowSelectionOnClick
                />
            </Box>
        </Box>
    );
}
