import React, { useEffect, useState } from "react";
import { Colors, useStyles } from '../../assets/styles.js'
import { Avatar, Grid, Button, TextField } from "@mui/material";
import { AddCircleRounded, Close } from '@mui/icons-material';
import MaterialTable from "material-table";
import logo_icon from '../../assets/images/logo_icon.png'
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import axios from "axios";
import { base_url, image_url } from "../../utils/Constants.js";
const DisplayChildCategories = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const[oldIcon, SetOldIcon] = useState('')
    const [icon, setIcon] = useState({ file: '', bytes: '' })
    const [displayChildCategoriesData, setDisplayChildCategoriesData] = useState([])

    const handleOpen = (rowData) => {
        setIcon({ file: logo_icon, bytes: '' })
    };

    const handleIcon = (e) => {
        setIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
    }   

    const handleSubmit = async () => {
        try {
            // const response = await axios.get(`${base_url}${get_category}`, {});
            // return response.data;
          } catch (error) {
            console.log(error);
            return null;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}api/admin/getChildCategory`);  
                setDisplayChildCategoriesData(response.data.result);
                console.log("data", (response.data.result))
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, []);

    const handleClose = () => {
        setIcon({ file: logo_icon, bytes: '' })
        setOpen(false)
    }


    return (
        <div className={classes.container}>
            <div className={classes.box}>
                {DisplayChildCategories()}
                {editModal()}
            </div>
        </div >
    );


    function DisplayChildCategories() {
        return (

            <Grid container spacing={1}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <MaterialTable
                        style={{ boxShadow: '0' }}
                        title={<div className={classes.heading}>Display Child Categories</div>}
                        columns={[
                            {
                                title: 'S.No',
                                editable: 'never',
                                render: (rowData) => displayChildCategoriesData.indexOf(rowData) + 1,
                            },
                            {
                                title: 'Category Name',
                                field: 'categoryName',
                                editable: 'never',
                            },
                            {
                                title: 'SubCategory Name',
                                field: 'subCategoryName',
                                editable: 'never',
                            },
                            {
                                title: 'Child Category Name',
                                field: 'childCategoryName',
                                editable: 'never',
                            },
                            {
                                title: 'Image',
                                field: 'childCategoryImage',
                                editable: 'never',
                                render: (rowData) => (
                                    <img
                                        src={image_url + rowData.childCategoryImage}
                                        alt={rowData.childCategoryName}
                                        style={{ width: 50, height: 50, }}
                                    />
                                ),
                            },
                            {
                                title: 'SubCategory KeyWord',
                                field: 'childCategoryKeyWord',
                                editable: 'never',
                            },
                            {
                                title: 'Status',
                                field: 'status',
                                editable: 'never',
                            },
                        ]}
                        data={displayChildCategoriesData}
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
                                onClick: () => navigate('/addChildCategories'),
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
                            // error={error.skill ? true : false}
                            // helperText={error.skill}
                            // value={skill}
                            // onFocus={() => handleError('skill', null)}
                            // onChange={(event) => setSkill(event.target.value)}
                            variant='outlined' fullWidth />
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

export default DisplayChildCategories;
