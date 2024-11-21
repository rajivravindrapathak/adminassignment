
import React, { useEffect, useState } from "react";
import { useStyles } from '../../assets/styles.js'
import { Avatar, Grid, TextField, FormControl, InputLabel, Select, MenuItem, List } from "@mui/material";
import { AddCircleRounded } from '@mui/icons-material';
import MaterialTable from "material-table";
import { Colors } from "../../assets/styles.js";
import logo_icon from '../../assets/images/logo_icon.png'
import { getData, postData } from '../../utils/FetchNodeServices.js'
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CloseRounded } from "@mui/icons-material";
import StatusIcon from "../../Components/loading/StatusIcon.js";
import Swal from "sweetalert2";

const staticUserData = [
    { _id: 1, profile: 'profile1.jpg', userName: 'User1', email: 'user1@example.com', phone: '1234567890', password: '******', lastSeen: '2024-02-18', userStatus: 'active' },
    { _id: 2, profile: 'profile2.jpg', userName: 'User2', email: 'user2@example.com', phone: '9876543210', password: '******', lastSeen: '2024-02-18', userStatus: 'inactive' },
    // Add more sample data as needed
];




const AdminTemplates = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [usersData, setUsersData] = useState([]);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [fdate, setFdate] = useState();
    const [tdate, setTdate] = useState();
    const [templateName, setTemplateName] = useState('');
    const [icon, setIcon] = useState({ file: logo_icon, bytes: null });
    const [errors, setErrors] = useState({ date: '' });

    const Active = 'Active';
    const Deactive = 'Deactive';
    const handleOpen = (rowData) => {
        setOpen(true);
    };

    const handleIcon = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] });
        }
    };


    const handleSubmit = () => {
        var formData = new FormData();
        formData.append('image', icon.bytes);

        Swal.fire({
            icon: 'success',
            title: "Sub Skill Updated Successfully",
            showConfirmButton: false,
            timer: 2000
        });
        handleClose();
    };


    const handleClose = () => {
        setOpen(false)
    }




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
                        title={ <div className={classes.heading}>Admins's Templates</div>}
                        data={staticUserData}
                        columns={[
                            {
                                title: 'S.No',
                                field: '_id',
                                editable: 'never',
                                // render: rowData => usersData.indexOf(rowData) + 1
                            },
                            {
                                title: 'Template',
                                field: 'template',
                                editable: 'never',
                                render: rowData => (
                                    <img
                                        src={rowData.template}
                                        alt={`Profile-${rowData.id}`}
                                        style={{ width: 80, borderRadius: '50%' }}
                                    />
                                ),
                            },
                            {
                                title: 'Template Name',
                                field: 'Template Name',
                                editable: 'never',

                            },
                            
                            {
                                title: 'Update Date',
                                field: 'updateDate',
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
                                tooltip: 'Edit',
                                onClick: (event, rowData) => handleOpen(rowData)
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Delete',
                            },
                            {
                                icon: () => (
                                    <div className={classes.addButton}>
                                        <AddCircleRounded />
                                        <div className={classes.addButtontext}>Add Templates</div>
                                    </div>
                                ),
                                tooltip: 'Add Skill',
                                isFreeAction: true,
                                onClick: () => navigate("/AddTemplates")
                            }
                        ]}
                    />
                </Grid>
            </Grid>
        )
    }

    function editModal() {
        // const fillSkillList = () => {
        //     return (
        //         skillsList.map((item) => {
        //             return (
        //                 <MenuItem value={item._id}>{item.skill}</MenuItem>
        //             )
        //         })
        //     )
        // }

        const showEditForm = () => {
            return (
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <div className={classes.heading} >
                                Edit
                            </div>
                            <div onClick={handleClose} className={classes.closeButton}>
                                <CloseRounded />
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label="Change Template Name"
                            value={templateName}
                            onChange={(event) => setTemplateName(event.target.value)}
                            variant='outlined' fullWidth />
                    </Grid>
                    
                    <Grid item lg={4} sm={6} md={6} xs={6} className={classes.uploadContainer}   >
                        <Grid component="label" onClick={handleIcon} className={classes.uploadImageButton}>
                            Upload Template
                            <input onChange={handleIcon} hidden accept="image/*" type="file" />
                        </Grid>
                    </Grid>
                    <Grid item lg={2} sm={6} md={6} xs={6} >
                        <Avatar
                            color={Colors.primaryDark}
                            src={icon.file}
                            style={{ width: 56, height: 56 }}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem disabled value={null}>-Select Status-</MenuItem>
                                <MenuItem value={Active}>Active </MenuItem>
                                <MenuItem value={Deactive}> Deactive</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={6} sm={6} md={6} xs={6} >
                        <div onClick={handleSubmit} className={classes.submitbutton}>
                            Submit
                        </div>
                    </Grid>
                    <Grid item lg={6} sm={6} md={6} xs={6} >
                        <div onClick={handleClose} className={classes.denyButton}>
                            Reset
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
};

export default AdminTemplates;




