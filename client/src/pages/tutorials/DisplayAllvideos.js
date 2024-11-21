import React, { useEffect, useState } from "react";
import { Colors, useStyles } from '../../assets/styles.js'
import { Avatar, Grid, Button, TextField } from "@mui/material";
import { AddCircleRounded, Close } from '@mui/icons-material';
import MaterialTable from "material-table";
import logo_icon from '../../assets/images/logo_icon.png'
import { base_url, get_skills, update_skill } from "../../utils/Constants.js";
import { getData, postData } from '../../utils/FetchNodeServices.js'
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import axios from "axios";
const DisplayVideos = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [oldIcon, SetOldIcon] = useState('')
    const [video, setVideo] = useState({ file: '', bytes: '' })
    const [fdate, setFdate] = useState();
    const [tdate, setTdate] = useState();
    const [type, setType] = useState();
    const [errors, setErrors] = useState({ date: '' }); // Initialize errors with an empty object
    const [displayVedioData, setDisplayVedioData] = useState([])


    const handleOpen = (rowData) => {
        setVideo({ file: logo_icon, bytes: '' })
    };

    const handleVideos = (e) => {
        setVideo({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
    }   

    const handleSubmit = async () => {
        // /getVideo
    }

    const handleClose = () => {
        setVideo({ file: logo_icon, bytes: '' })
        setOpen(false)
    }

    const getVedio = async () => {
        try {
            const response = await axios.get(`${base_url}api/admin/getVideo`);  
            setDisplayVedioData(response.data.result);
            console.log("data", (response.data.result))
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getVedio()
    }, [])

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
                        title={ <div>
                            <div className={classes.heading}>Display All Videos</div>
                            {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '20px', width: '100%' }}>
                                    <div style={{ marginTop: 10, marginRight: 10, }}>
                                        <TextField
                                            label="From Date"
                                            type="date"
                                            value={fdate}
                                            onChange={(e) => setFdate(e.target.value)}
                                            error={Boolean(errors.fdate)}
                                            helperText={errors.fdate}
                                            variant="outlined"
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true, // Ensures the label doesn't overlap
                                            }}
                                            style={{
                                                width: '100%', // Full width
                                            }}
                                        />
                                    </div>
                                    <div style={{ marginTop: 10, marginRight: 10,  }}>
                                        <TextField
                                            label="To Date"
                                            type="date"
                                            value={tdate}
                                            onChange={(e) => setTdate(e.target.value)}
                                            error={Boolean(errors.tdate)}
                                            helperText={errors.tdate}
                                            variant="outlined"
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true, // Ensures the label doesn't overlap
                                            }}
                                            style={{
                                                width: '100%', // Full width
                                            }}
                                        />
                                    </div>
                                </div>
                                <div style={{ alignSelf: 'flex-end' }}>
                                    <div className={classes.submitbutton} style={{width:"90px"}}>
                                        Apply
                                    </div>
                                </div>
                            </div> */}
                        </div>}
                        data={displayVedioData}
                        columns={[
                            {
                                title: 'S.No',
                                editable: 'never',
                                render: rowData => displayVedioData.indexOf(rowData) + 1
                            },
                            { 
                                title: 'Video', 
                                field: 'videoFile',
                                editable: 'never',
                            },
                            {
                                title: 'Name ', 
                                field: 'title',
                                editable: 'never',

                            },
                            {
                                title: 'Key words ', 
                                field: 'vedioKeyword',
                                editable: 'never',

                            },
                            {
                                title: 'Categories ', 
                                field: 'categoryName',
                                editable: 'never',
                                
                            },
                            {
                                title: 'Status ', 
                                field: 'status',
                                editable: 'never',
                                
                            },
                        ]}
                        
                        options={{
                            sorting: true,
                            search: true,
                            searchFieldAlignment: "right",
                            filtering: false,
                            paging: true,
                            // pageSizeOptions: createArrayWithBreakdowns(editable?.length, 5),
                            pageSize: 80,
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
                                tooltip: 'Add Skill',
                                isFreeAction: true,
                                onClick: () => navigate("/addVideos")
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
                        <Grid component="label" onClick={handleVideos} className={classes.uploadImageButton}>
                            Upload Picutre
                            <input onChange={handleVideos} hidden accept="video/*" type="file" />
                        </Grid>
                    </Grid>
                    <Grid item lg={6} sm={6} md={6} xs={6} >
                        <Avatar
                            color={Colors.primaryDark}
                            src={video.file}
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

export default DisplayVideos;
