import React, { useEffect, useState } from "react";
import { Colors, useStyles } from '../../assets/styles.js'
import { Avatar, Grid, Button, TextField } from "@mui/material";
import { AddCircleRounded, Close } from '@mui/icons-material';
import MaterialTable from "material-table";
import logo_icon from '../../assets/images/logo_icon.png'
import { base_url, get_skills, image_url, update_skill } from "../../utils/Constants.js";
import { getData, postData } from '../../utils/FetchNodeServices.js'
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import axios from "axios";
const DisplayCategories = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const[oldIcon, SetOldIcon] = useState('')
    const [icon, setIcon] = useState({ file: '', bytes: '' })
    const [displayCategoriesData, setDisplayCategoriesData] = useState()

    const handleOpen = (rowData) => {
        setIcon({ file: logo_icon, bytes: '' })
    };

    const handleIcon = (e) => {
        setIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
    }

    const handleSubmit = async () => {
       
    }

    const DisplayCategoriesData = async () => {
        try {
            const response = await axios.get(`${base_url}api/admin/getCategories`);
            setDisplayCategoriesData(response.data.result);
            console.log("data", (response.data.result))
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {    
        DisplayCategoriesData();
    }, []);

    const handleClose = () => {
        setIcon({ file: logo_icon, bytes: '' })
        setOpen(false)
    }

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                {displayCategories()}
                {editModal()}
            </div>
        </div >
    );


    function displayCategories() {
        return (
            <Grid container spacing={1}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <MaterialTable                        
                        style={{ boxShadow: '0' }}
                        title={<div className={classes.heading}>Display Categories</div>}
                        columns={[
                            {
                                title: 'S.No',
                                render: (rowData) => displayCategoriesData.indexOf(rowData) + 1
                            },
                            {
                                title: 'Category Name',
                                field: 'categoryName',
                                editable: 'never',
                            },
                            {
                                title: 'Image',
                                field: 'categoryImage', // Update field name to match your data
                                editable: 'never',
                                render: rowData => (
                                    <img
                                        src={image_url + rowData.categoryImage} // Use the correct key for images
                                        alt={rowData.categoryImage}
                                        style={{ width: 50, height: 50 }}
                                    />
                                ),
                            },
                            {
                                title: 'Status',
                                field: 'status',
                                editable: 'never',
                            },
                        ]}
                        data={displayCategoriesData}
                        options={{
                            sorting: true,
                            search: true,
                            searchFieldAlignment: 'right',
                            filtering: false,
                            paging: true,
                            pageSize: 5,
                            paginationType: 'stepped',
                            showFirstLastPageButtons: true,
                            paginationPosition: 'bottom',
                            exportButton: false,
                            exportAllData: false,
                            exportFileName: 'Category data',
                            addRowPosition: 'first',
                            actionsColumnIndex: -1,
                            selection: false,
                            showSelectAllCheckbox: false,
                        }}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Icon',
                                onClick: (event, rowData) => handleOpen(rowData),
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Delete Icon',
                                onClick: (event, rowData) => handleOpen(rowData),
                            },
                            {
                                icon: () => (
                                    <div className={classes.addButton}>
                                        <AddCircleRounded />
                                        <div className={classes.addButtontext}>Add New</div>
                                    </div>
                                ),
                                tooltip: 'Add Skill',
                                isFreeAction: true,
                                onClick: () => navigate('/addCategories'),
                            },
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
                                Edit Skill
                            </div>
                            <div onClick={handleClose} className={classes.closeButton}>
                                <CloseRounded />
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <TextField
                            label="Enter Skill"                        
                            variant='outlined' fullWidth 
                        />
                    </Grid>
                    <Grid item lg={6} sm={6} md={6} xs={6} className={classes.uploadContainer}   >
                        <Grid component="label" onClick={handleIcon} className={classes.uploadImageButton}>
                            Upload Picutre
                            <input onChange={handleIcon} hidden accept="image/*" type="file" />
                        </Grid>
                    </Grid>
                    <Grid item lg={6} sm={6} md={6} xs={6} >
                        <Avatar
                            color={Colors.primaryDark}
                            src={icon.file}
                            style={{ width: 56, height: 56 }}
                        />
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

export default DisplayCategories;
