import React, { useEffect, useState } from "react";
import { Colors, useStyles } from '../../assets/styles.js';
import { Avatar, Grid, TextField } from "@mui/material";
import MaterialTable from "material-table";
import { getData } from '../../utils/FetchNodeServices.js';
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CloseRounded, AddCircleRounded } from "@mui/icons-material";
import axios from "axios";
import { base_url } from "../../utils/Constants.js";

const DisplayVCategories = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [icon, setIcon] = useState({ file: '', bytes: '' });
    const [videoCategories, setVideoCategories] = useState();
    const [displayVedioData, setDisplayVedioData] = useState([])

    const handleOpen = (rowData) => {
        setIcon({ file: rowData.icon, bytes: '' }); // Assuming you have an 'icon' property in your video category data
        setOpen(true);
    };

    const handleIcon = (e) => {
        setIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] });
    };

    const handleSubmit = async () => {
        // Handle submission logic if needed
        setOpen(false);
    };

    const handleClose = () => {
        setIcon({ file: '', bytes: '' });
        setOpen(false);
    };

    const getBasicVedio = async () => {
        try {
            const response = await axios.get(`${base_url}api/admin/getVideosByCategoryName/:aa`);
            setDisplayVedioData(response.data.videos); 
            console.log("response", response.data.videos)
        } catch (error) {
            console.error("Error fetching video categories:", error);
        }
    }

    useEffect(() => {
        getBasicVedio()
    }, [])

    const displayTable = () => {
        return (          
            <Grid container spacing={1}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <MaterialTable
                        style={{ boxShadow: '0' }}
                        title={<div className={classes.heading}>Display Video Categories</div>}
                        data={displayVedioData}
                        columns={[
                            { 
                                title: 'Category Name', 
                                field: 'categoryName', 
                                editable: 'never' 
                            },
                            { 
                                title: 'Video', 
                                field: 'videoFile', 
                                editable: 'never' 
                            },
                            { 
                                title: 'Title', 
                                field: 'title', 
                                editable: 'never' 
                            },
                            { 
                                title: 'Status', 
                                field: 'status', 
                                editable: 'never' 
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
                                tooltip: 'Edit Icon',
                                onClick: (event, rowData) => handleOpen(rowData)
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Delete Icon',
                                onClick: (event, rowData) => handleOpen(rowData)
                            },
                            {
                                icon: () => (
                                    <div className={classes.addButton}>
                                        <AddCircleRounded />
                                        <div className={classes.addButtontext}>Add New</div>
                                    </div>
                                ),
                                tooltip: 'Add Video Category',
                                isFreeAction: true,
                                onClick: () => navigate("/addVcategories")
                            }
                        ]}
                    />
                </Grid>
            </Grid>
        );
    };

    const editModal = () => {
        return (
            <div>
                <Dialog open={open}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            {/* Edit form content goes here */}
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        );
    };

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                {displayTable()}
                {editModal()}
            </div>
        </div>
    );
};

export default DisplayVCategories;
