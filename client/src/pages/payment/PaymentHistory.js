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

export const PaymentHistory = () => {
    var classes = useStyles();
    const navigate = useNavigate();
    const [usersData, setUsersData] = useState([]);
    const [open, setOpen] = useState(false);
    const [paymentHistory, setPaymentHistory] = useState()

    useEffect(() => {
        fetchPaymentHistory();
    }, []);

    const fetchPaymentHistory = async () => {
        try {
            // Adjust the URL based on your server setup
            const response = await axios.get(`${base_url}api/payment/paymentHistory`, 
          
            );
            setPaymentHistory(response.data.result);
            console.log("payData1", response.data.result)
           
            if (response.data.status === true) {
                // setPaymentHistory(response.data.result);
            } else {
                console.error("Error fetching payment history:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching payment history:", error);
        }
    };

    console.log("paydata2", paymentHistory)

    const handleOpen = (rowData) => {
        // Implement the logic to handle the opening of a record
        setOpen(true);
        const userId = rowData._id;

        console.log("Opening record:", rowData);
        // You can add more logic here based on what you want to achieve
        // ${userId}
    };

    const handleDelete = async (rowData) => {
        // Assuming rowData has an identifier like an ID
        const userId = rowData._id;

        // Use SweetAlert2 for confirmation
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete user ${rowData.userName}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const response = await deleteData(`${delete_user_by_id}/${userId}`)
                console.log( response )
                if (response.status) {
                    Swal.fire('Deleted!', `User  ${rowData.userName} has been deleted.`, 'success');
                }
                else {

                    Swal.fire('Unsuccessful', `Delete operation for user with ID ${userId} cancelled.`, 'info');
                }

            }
            catch (error) {
                console.error("Error deleting user data:", error);
                // Handle error if necessary
                Swal.fire('Error', 'An error occurred while deleting the user.', 'error');
            }
        } else {
            // Show a cancellation message using SweetAlert2
            Swal.fire('Cancelled', `Delete operation for user with ID ${userId} cancelled.`, 'info');
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.box} >
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12} style={{ marginTop: 15 }}>
                        <MaterialTable
                            title={<div className={classes.heading}>Payment History</div>}
                            data={paymentHistory}
                            columns={[
                                {
                                    title: 'S.No',
                                    field: '_id',
                                    editable: 'never',
                                    render: rowData => paymentHistory.indexOf(rowData) + 1
                                },
                                // {
                                //     title: 'Profile',
                                //     field: 'profile',
                                //     editable: 'never',
                                //     render: rowData => (
                                //         <img
                                //             src={rowData.profile}
                                //             alt={`Profile-${rowData.id}`}
                                //             style={{ width: 80, borderRadius: '50%' }}
                                //         />
                                //     ),
                                // },
                                {
                                    title: 'Amount',
                                    field: 'amount',
                                    editable: 'never',

                                },                                
                                {
                                    title: 'User Email',
                                    field: 'userEmail',
                                    editable: 'never',
                                },                               
                                {
                                    title: 'PaymentId',
                                    field: 'PaymentId',
                                    editable: 'never',
                                },
                                {
                                    title: 'currency',
                                    field: 'currency',
                                    editable: 'never',

                                },
                                {
                                    title: 'CreatedAt',
                                    field: 'CreatedAt',
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

export default PaymentHistory;