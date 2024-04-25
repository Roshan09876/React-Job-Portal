import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import SideNav from '../../components/SideNav'
import { Link } from 'react-router-dom';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { allUserAction } from '../../redux/actions/UserAction';
import { deleteUserApi } from '../../apis/Api';
import { toast } from 'react-toastify';

const DashUsers = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allUserAction());
    }, []);


    const { users, loading } = useSelector(state => state.allUsers);
    let data = [];
    data = (users !== undefined && users.length > 0) ? users : []

    const deleteUserById = (e, id) => {
        console.log(id);
        //Dialog box 
        const confirm = window.confirm('Are you sure want to delete this user??')
        if (!confirm) {
            return
        } else {
            deleteUserApi(id).then((res) => {
                if (res.data.success == false) {
                    toast.error(res.data.message)
                } else {
                    toast.success(res.data.message)
                   
                }
            })
        }
    }

    const columns = [

        {
            field: '_id',
            headerName: 'User ID',
            width: 150,
            editable: true,
        },

        {
            field: 'email',
            headerName: 'E_mail',
            width: 150,
        },

        {
            field: 'role',
            headerName: 'User status',
            width: 150,
            renderCell: (params) => (
                params.row.role === 1 ? "Admin" : "Regular user"
            )
        },

        {
            field: 'createdAt',
            headerName: 'Creation date',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            )
        },

        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained"><Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/user/${values.row._id}`}>Edit</Link></ Button>
                    < Button onClick={(e) => deleteUserById(e, values.row._id)} variant="contained" color="error">Delete</ Button>
                </Box>
            )
        }
    ];
    return (
        <>
            <Navbar />
            <SideNav />
            <Box sx={
                { ml: 15, mr: 10 }
            }>

                <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                    All users
                </Typography>
                {/* <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                    <Button variant='contained' color="success" startIcon={<AddIcon />}> Create user</Button>
                </Box> */}
                <Paper sx={{ bgcolor: "secondary.midNightBlue" }} >

                    <Box sx={{ height: 500, width: '100%' }}>
                        <DataGrid
                            sx={{

                                '& .MuiTablePagination-displayedRows': {
                                    color: 'white',
                                },
                                color: 'white',
                                [`& .${gridClasses.row}`]: {
                                    bgcolor: (theme) =>
                                        // theme.palette.mode === 'light' ? blue[200] : grey[900],
                                        theme.palette.secondary.main
                                },
                                button: {
                                    color: '#ffffff'
                                }

                            }}
                            loading={loading}
                            getRowId={(row) => row._id}
                            rows={data}
                            columns={columns}
                            pageSize={3}
                            rowsPerPageOptions={[3]}
                            checkboxSelection
                            slots={{ toolbar: GridToolbar }}
                        />
                    </Box>
                </Paper>

            </Box>
        </>
    )
}

export default DashUsers
