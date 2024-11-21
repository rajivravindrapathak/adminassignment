// import React, { useEffect, useState } from "react";
// import { Colors, useStyles } from '../../assets/styles.js'
// import { Avatar, Grid, Button, TextField } from "@mui/material";
// import { AddCircleRounded, Close } from '@mui/icons-material';
// import MaterialTable from "material-table";
// import logo_icon from '../../assets/images/logo_icon.png'
// import { get_skills, update_skill } from "../../utils/Constants.js";
// import { getData, postData } from '../../utils/FetchNodeServices.js'
// import { useNavigate } from "react-router-dom";
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import { CloseRounded } from "@mui/icons-material";
// import Swal from "sweetalert2";
// const DisplayRechargePlans = () => {
//     const classes = useStyles()
//     const navigate = useNavigate()
//     const [skillsData, setSkillsData] = useState()
//     const [open, setOpen] = useState(false)

//     const [skill_id, setSkill_id] = useState('')
//     const [skill, setSkill] = useState('')
//     const [icon, setIcon] = useState({ file: '', bytes: '' })
//     const [oldIcon, setOldIcon] = useState()
//     const [error, setError] = useState({})


//     useEffect(function () {
//         fetchAllSkills()
//     }, [])

//     const fetchAllSkills = async () => {
//         var response = await getData(get_skills)
//         setSkillsData(response.skills)
//     }

//     const handleOpen = (rowData) => {
//         setOpen(true);
//         setSkill_id(rowData._id)
//         setSkill(rowData.skill)
//         setIcon({ file: logo_icon, bytes: '' })
//         setOldIcon(rowData.icon)
//     };

//     const handleError = (input, value) => {
//         setError((prev) => ({ ...prev, [input]: value }))
//     }

//     const handleIcon = (e) => {
//         setIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
//     }

//     const validation = () => {
//         var isValid = true
//         if (!skill) {
//             handleError('skill', 'Please input Skill')
//             isValid = false
//         }
//         if (!icon.bytes) {
//             handleError('icon', 'Please Select icon')
//             isValid = false
//         }
//         return isValid
//     }

//     const handleSubmit = async () => {
//         if (validation()) {
//             var formData = new FormData()
//             formData.append('skillId', skill_id)
//             formData.append('skill', skill)
//             formData.append('image', icon.bytes)
//             var response = await postData(update_skill, formData)
//             if (response.status) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: "Skill Updated Successfull",
//                     showConfirmButton: false,
//                     timer: 2000
//                 })
//                 handleClose()
//             }
//             else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: "Server Error",
//                     text: "Failed to Update Skill",
//                     showConfirmButton: false,
//                     timer: 2000
//                 })
//             }
//         }
//     }

//     const handleClose = () => {
//         setSkill_id('')
//         setSkill('')
//         setIcon({ file: logo_icon, bytes: '' })
//         setOpen(false)
//     }


//     return (
//         <div className={classes.container}>
//             <div className={classes.box}>
//                 {displayTable()}
//                 {editModal()}
//             </div>
//         </div >
//     );


//     function displayTable() {
//         return (
//             <Grid container spacing={1}>
//                 <Grid item lg={12} sm={12} md={12} xs={12}>
//                     <MaterialTable
//                         style={{ boxShadow: '0' }}
//                         title={ <div className={classes.heading}>List of Plans</div>}
//                         data={skillsData}
//                         columns={[
//                             {
//                                 title: 'S.No',
//                                 editable: 'never',
//                                 render: rowData => skillsData.indexOf(rowData) + 1
//                             },
//                             { title: 'Price', field: 'Price' },
//                             {
//                                 title: 'Active Users ', field: 'icon',
//                                 render: rowData => <Avatar src={logo_icon} style={{ width: 50, height: 50 }} variant='rounded' />
//                             },
//                         ]}
//                         options={{
//                             sorting: true,
//                             search: true,
//                             searchFieldAlignment: "right",
//                             filtering: true,
//                             paging: true,
//                             // pageSizeOptions: createArrayWithBreakdowns(editable?.length, 5),
//                             pageSize: 5,
//                             paginationType: "stepped",
//                             showFirstLastPageButtons: true,
//                             paginationPosition: "bottom",
//                             exportButton: false,
//                             exportAllData: false,
//                             exportFileName: "Category data",
//                             addRowPosition: "first",
//                             actionsColumnIndex: -1,
//                             selection: false,
//                             showSelectAllCheckbox: false,
//                         }}
//                         actions={[
//                             {
//                                 icon: 'edit',
//                                 tooltip: 'Edit Skill',
//                                 onClick: (event, rowData) => handleOpen(rowData)
//                             },
//                             {
//                                 icon: () => (
//                                     <div className={classes.addButton}
//                                     >
//                                         <AddCircleRounded />
//                                         <div className={classes.addButtontext}>Add New</div>
//                                     </div>
//                                 ),
//                                 tooltip: 'Add Skill',
//                                 isFreeAction: true,
//                                 onClick: () => navigate("/addRechargePlan")
//                             }
//                         ]}
//                     />
//                 </Grid>
//             </Grid>
//         )
//     }

//     function editModal() {
//         const showEditForm = () => {
//             return (
//                 <Grid container spacing={2}>
//                     <Grid item lg={12} sm={12} md={12} xs={12}>
//                         <div className={classes.headingContainer}>
//                             <div className={classes.heading} >
//                                 Edit Skill
//                             </div>
//                             <div onClick={handleClose} className={classes.closeButton}>
//                                 <CloseRounded />
//                             </div>
//                         </div>
//                     </Grid>
//                     <Grid item lg={12} sm={12} md={12} xs={12} >
//                         <TextField
//                             label="Enter Skill"
//                             error={error.skill ? true : false}
//                             helperText={error.skill}
//                             value={skill}
//                             onFocus={() => handleError('skill', null)}
//                             onChange={(event) => setSkill(event.target.value)}
//                             variant='outlined' fullWidth />
//                     </Grid>
//                     <Grid item lg={6} sm={6} md={6} xs={6} className={classes.uploadContainer}   >
//                         <Grid component="label" onClick={handleIcon} className={classes.uploadImageButton}>
//                             Upload Picutre
//                             <input onChange={handleIcon} hidden accept="image/*" type="file" />
//                         </Grid>
//                     </Grid>
//                     <Grid item lg={6} sm={6} md={6} xs={6} >
//                         <Avatar
//                             color={Colors.primaryDark}
//                             src={icon.file}
//                             style={{ width: 56, height: 56 }}
//                         />
//                     </Grid>
//                     <Grid item lg={6} sm={6} md={6} xs={6} >
//                         <div onClick={handleSubmit} className={classes.submitbutton}>
//                             Submit
//                         </div>
//                     </Grid>
//                     <Grid item lg={6} sm={6} md={6} xs={6} >
//                         <div onClick={handleClose} className={classes.denyButton}>
//                             Cancel
//                         </div>
//                     </Grid>
//                 </Grid>
//             )

//         }
//         return (
//             <div>
//                 <Dialog
//                     open={open}>
//                     <DialogContent>
//                         {showEditForm()}
//                     </DialogContent>
//                 </Dialog>
//             </div>
//         )
//     }
// }

// export default DisplayRechargePlans;
