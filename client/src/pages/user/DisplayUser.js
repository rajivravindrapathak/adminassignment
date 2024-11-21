// dispaly user page

import React, { useEffect, useState } from "react";
import { useStyles } from "../../assets/styles.js";
import Swal from 'sweetalert2';
import MaterialTable from 'material-table';
import MTableAction from 'material-table';
import { base_url, delete_user_by_id, get_all_users } from "../../utils/Constants.js";
import { deleteData, getUserData } from "../../utils/FetchNodeServices.js";
import { Check, Clear } from '@mui/icons-material';
import {Grid,} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo_icon from "../../assets/images/logo_icon.png";
import { getData } from "../../utils/FetchNodeServices.js";
import StatusIcon from "../../Components/loading/StatusIcon.js";
import axios from "axios";

export const ListUsers = () => {
    var classes = useStyles();
    const navigate = useNavigate();
    const [usersData, setUsersData] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(function () {
        fetchAllUsers()
    }, [])

    const fetchAllUsers = async () => {
        var response = await getData(get_all_users)
        setUsersData(response.result)
        console.log("data", response.result)
    }

    const handleDelete = async (rowData) => {
        // Assuming rowData has an identifier like an ID
        const userId = rowData._id;
    
        // Ensure that delete_user_by_id is correctly defined
        const deleteEndpoint = `api/admin/deleteUserProfileById/${userId}`;
        console.log("delete", deleteEndpoint);
        // Use SweetAlert2 for confirmation
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `You want to delete user ${rowData.userName}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });
    
        if (result.isConfirmed) {
            try {
                const response = await deleteData(deleteEndpoint);
                console.log("res", response);
                if (response && response.status !== undefined) {
                    if (response.status === true) {
                        // Remove the deleted user from usersData state
                        setUsersData(usersData.filter(user => user._id !== userId));
                        Swal.fire("Deleted!", `User ${rowData.userName} has been deleted.`, "success");
                    } else {
                        Swal.fire("Unsuccessful", `Delete operation for user with ID ${userId} cancelled.`, "info");
                    }
                } else {
                    console.error("Unexpected response structure:", response);
                    Swal.fire("Error", "An error occurred while deleting the user.", "error");
                }
            } catch (error) {
                console.error("Error deleting user data:", error);
                // Handle error if necessary
                Swal.fire("Error", "An error occurred while deleting the user.", "error");
            }
        } else {
            // Show a cancellation message using SweetAlert2
            Swal.fire("Cancelled", `Delete operation for user with ID ${userId} cancelled.`, "info");
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.box} >
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12} style={{ marginTop: 15 }}>
                        <MaterialTable
                            title={<div className={classes.heading}>List of Users</div>}
                            data={usersData}
                            columns={[
                                {
                                    title: 'S.No',
                                    field: '_id',
                                    editable: 'never',
                                    render: rowData => usersData.indexOf(rowData) + 1
                                },
                                {
                                    title: 'Profile',
                                    field: 'profile',
                                    editable: 'never',
                                    render: rowData => (
                                        <img
                                            src={rowData.profile}
                                            alt={`Profile-${rowData.id}`}
                                            style={{ width: 80, borderRadius: '50%' }}
                                        />
                                    ),
                                },
                                {
                                    title: 'Name',
                                    field: 'firstName',
                                    editable: 'never',

                                },                                
                                {
                                    title: 'Current Role',
                                    field: 'currentRole',
                                    editable: 'never',
                                },
                                {
                                    title: 'Email',
                                    field: 'email',
                                    editable: 'never',

                                },
                                {
                                    title: 'Phone',
                                    field: 'phone',
                                    editable: 'never',

                                },
                                {
                                    title: 'Password',
                                    field: 'password',
                                    editable: 'never',

                                },
                                {
                                    title: 'Status',
                                    field: 'userStatus',
                                    editable: 'never',
                                    render: rowData => (
                                        <StatusIcon userStatus={rowData.userStatus} />
                                    ),
                                },

                            ]}
                            options={{
                                sorting: true,
                                search: true,
                                searchFieldAlignment: "right",
                                filtering: false,
                                paging: true,
                                pageSize: 5,
                                paginationType: "stepped",
                                showFirstLastPageButtons: true,
                                paginationPosition: "bottom",
                                exportButton: false,
                                exportAllData: false,
                                exportFileName: "Category data",
                                addRowPosition: "first",
                                actionsColumnIndex: -1,
                                selection: false,
                                showSelectAllCheckbox: false,
                            }}
                            actions={[
                                {
                                    icon: 'edit',
                                    tooltip: 'Edit',
                                    onClick: (event, rowData) => navigate('/editUser', { state: { rowData: rowData } }),
                                },
                                {
                                    icon: 'delete',
                                    tooltip: 'Delete',
                                    onClick: (event, rowData) => handleDelete(rowData),
                                },
                            ]}
                        />
                    </Grid>

                </Grid>
            </div>
        </div>
    );
};

export default ListUsers;