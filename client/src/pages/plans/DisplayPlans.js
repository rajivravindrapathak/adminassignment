import React, { useEffect, useState } from "react";
import { Colors, useStyles } from '../../assets/styles.js'
import { Avatar, Grid, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { AddCircleRounded, Close } from '@mui/icons-material';
import MaterialTable from "material-table";
import logo_icon from '../../assets/images/logo_icon.png'
import { base_url, get_all_plans, get_skills, update_skill } from "../../utils/Constants.js";
import { deleteData, getData, postData } from '../../utils/FetchNodeServices.js'
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
const DisplayPlan = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    // const [plansData, setplansData] = useState()
    const [plansData, setPlansData] = useState()
    const [open, setOpen] = useState(false)
    const [_id, set_id] = useState('')
    const [skill, setSkill] = useState('')
    const [icon, setIcon] = useState({ file: '', bytes: '' })
    const [oldIcon, setOldIcon] = useState()
    const [error, setError] = useState({})
    const [planStatus, setplanStatus] = useState('');
    const [status, setStatus] = useState('')

    useEffect(function () {
        fetchAllPlans(); 
    }, [])  

    const fetchAllPlans = async () => {
        try {
            const response = await getData(get_all_plans);
            setPlansData(response.plan); 
            console.log("plandata", response.plan)
        } catch (error) {
            console.error("Error fetching plans:", error);
        }
    };

    const handleOpen = (rowData) => {
        setOpen(true);
        set_id(rowData._id)
        setSkill(rowData.skill)
        setIcon({ file: logo_icon, bytes: '' })
        setOldIcon(rowData.icon)
    };

    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }))
    }

    const handleIcon = (e) => {
        setIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
    }

    const validation = () => {
        var isValid = true
        if (!skill) {
            handleError('skill', 'Please input Skill')
            isValid = false
        }
        if (!icon.bytes) {
            handleError('icon', 'Please Select icon')
            isValid = false
        }
        return isValid
    }

    const handleSubmit = async () => {
        try {
            // Make API call to update plan status
            const endpointUrl = `api/admin/updatePlanStatus/${_id}`;
            const response = await postData(endpointUrl, { planStatus });
                if(response && response.status === true) {
                Swal.fire("Success", "Plan status updated successfully.", "success");
                fetchAllPlans();
                handleClose();
            } else {
                Swal.fire("Error", "Failed to update plan status.", "error");
            }
        } catch (error) {
            console.error("Error updating plan status:", error);
            Swal.fire("Error", "An error occurred while updating plan status.", "error");
        }
    }; 

    const handleClose = () => {
        set_id('')
        setSkill('')
        setIcon({ file: logo_icon, bytes: '' })
        setOpen(false)
    }

    const handleDelete = async (rowData) => {
        const _id = rowData._id;
        const deleteEndpoint = `api/admin/plan_delete`;
        console.log("delete", deleteEndpoint);
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `You want to delete user ${rowData.username}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });
    
        if(result.isConfirmed) {
            try {
                console.log("_id", _id)
                const response = await deleteData(deleteEndpoint, { _id: _id });
                console.log("res", response);
                if (response && response.status !== undefined) {
                    if (response.status === true) {
                        // Remove the deleted user from usersData state
                        // setUsersData(usersData.filter(user => user._id !== userId));
                        Swal.fire("Deleted!", `User ${rowData.userName} has been deleted.`, "success");
                    } else {
                        Swal.fire("Unsuccessful", `Delete operation for user with ID ${_id} cancelled.`, "info");
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
            Swal.fire("Cancelled", `Delete operation for user with ID ${_id} cancelled.`, "info");
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                {displayTable()}
                {editModal()}
            </div>
        </div >
    );  

    function displayTable() {
        return (
            <Grid container spacing={1}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <MaterialTable
                        style={{ boxShadow: '0' }}
                        title={ <div className={classes.heading}>List of Plans</div>}
                        data={plansData}
                        columns={[
                            {
                                title: 'S.No',
                                editable: 'never',
                                render: rowData => plansData.indexOf(rowData) + 1
                            },
                            { title: 'Plan Name', field: 'planName' },
                            { title: 'Plan Amount', field: 'planAmount' },
                            { title: 'Description', field: 'description' },
                            { title: 'Plan Validity', field: 'planValidity' },
                            {
                                title: 'Plan Status ', field: 'planStatus',
                            },
                        ]}
                        options={{
                            sorting: true,
                            search: true,
                            searchFieldAlignment: "right",
                            filtering: true,
                            paging: true,
                            // pageSizeOptions: createArrayWithBreakdowns(editable?.length, 5),
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
                                tooltip: 'Edit Plan Status',
                                onClick: (event, rowData) => handleOpen(rowData)
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Delete',
                                onClick: (event, rowData) => handleDelete(rowData),
                            },
                            {
                                icon: () => (
                                    <div className={classes.addButton}
                                    >
                                        <AddCircleRounded />
                                        <div className={classes.addButtontext}>Add New</div>
                                    </div>
                                ),
                                tooltip: 'Add Skill',
                                isFreeAction: true,
                                onClick: () => navigate("/addplans")
                            }
                        ]}
                    />
                </Grid>
            </Grid>
        )
    }

    function editModal() {
        const showEditForm = () => {
            return (
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <div className={classes.heading} >
                                Edit Plan Status
                            </div>
                            <div onClick={handleClose} className={classes.closeButton}>
                                <CloseRounded />
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Select Status</InputLabel>
                            <Select
                                label="Select Status"
                                labelId="select-label"
                                value={planStatus}
                                onChange={(e) => setplanStatus(e.target.value)}
                                variant="outlined"
                                error={Boolean(error.planStatus)}
                                fullWidth
                            >
                                <MenuItem >Select planStatus</MenuItem>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="inActive">inActive</MenuItem>
                            </Select>

                            {error.status && (
                                <div className={classes.errorstyles}>{error.status}</div>
                            )}

                        </FormControl>
                    </Grid>
                    <Grid item lg={6} sm={6} md={6} xs={6} >
                        <div onClick={handleSubmit} className={classes.submitbutton}>
                            Submit
                        </div>
                    </Grid>
                    <Grid item lg={6} sm={6} md={6} xs={6} >
                        <div onClick={handleClose} className={classes.denyButton}>
                            Cancel
                        </div>
                    </Grid>
                </Grid>
            )

        }
        return (
            <div>
                <Dialog
                    open={open}>
                    <DialogContent>
                        {showEditForm()}
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default DisplayPlan;
