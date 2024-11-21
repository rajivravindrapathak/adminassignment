// import React, { useState } from "react";
// import { useStyles } from '../../assets/styles.js';
// import { Grid, TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
// import DvrIcon from '@mui/icons-material/Dvr';
// import { add_recharge_plans } from "../../utils/Constants.js";
// import { postData } from '../../utils/FetchNodeServices.js';
// import Swal from "sweetalert2";
// import "react-datepicker/dist/react-datepicker.css"; // Add this line
// import { useNavigate } from "react-router-dom";

// const AddFirstRechargeOffer = () => {

//     const navigate = useNavigate();
//     const classes = useStyles();
//     const [rechargeAmount, setRechargeAmount] = useState('');
//     const [extraPercent, setExtraPercent] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [status, setStatus] = useState('');
//     const [error, setError] = useState({});

//     const handleError = (input, value) => {
//         setError((prev) => ({ ...prev, [input]: value }));
//     };

//     const validation = () => {
//         let isValid = true;
//         if (!rechargeAmount) {
//             handleError('rechargeAmount', 'Please input Recharge Amount');
//             isValid = false;
//         }
//         if (!extraPercent) {
//             handleError('extraPercent', 'Please input Extra Percent');
//             isValid = false;
//         }
//         if (!startDate) {
//             handleError('startDate', 'Please Pick Start Date');
//             isValid = false;
//         }
//         if (!endDate) {
//             handleError('endDate', 'Please Pick End Date');
//             isValid = false;
//         }
//         if (!status || status === 'option1') {
//             handleError('status', 'Please Select Status');
//             isValid = false;
//         }

//         return isValid;
//     };

//     const handleSubmit = async () => {
//         if (validation()) {
//             var formData = new FormData();
//             formData.append('rechargeAmount', rechargeAmount);
//             formData.append('extraPercent', extraPercent);
//             formData.append('startDate', startDate);
//             formData.append('endDate', endDate);
//             formData.append('status', status);
//             var response = await postData(add_recharge_plans, formData);
//             if (response.status) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: "Recharge Plan Added Successfully",
//                     showConfirmButton: false,
//                     timer: 2000
//                 });
//                 handleReset();
//             }
//             else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: "Server Error",
//                     text: "Recharge Submission Failed",
//                     showConfirmButton: false,
//                     timer: 2000
//                 });
//             }
//         }
//     };

//     const handleReset = () => {
//         setRechargeAmount('');
//         setExtraPercent('');
//         setStartDate('');
//         setEndDate('');
//         setStatus('');
//         setError({});
//     };

//     const handleDateChange = (date) => {
//         setStartDate(date);
//         // Additional logic you want to perform on date change
//     };

//     return (
//         <div className={classes.container}>
//             <div className={classes.box}>
//                 <Grid container spacing={2}>
//                     <Grid item lg={12} sm={12} md={12} xs={12}>
//                         <div className={classes.headingContainer}>
//                             <div className={classes.heading} >
//                                 First Recharge Offer
//                             </div>
//                             <div onClick={() => navigate("/displayRechargePlans")} className={classes.addButton}>
//                                 <DvrIcon />
//                                 <div className={classes.addButtontext}>Display Plans</div>
//                             </div>
//                         </div>
//                     </Grid>

//                     <Grid item lg={4} sm={12} md={12} xs={12} >
//                         <label>Pay Amt</label>
//                         <TextField
//                             label="1"
//                             error={Boolean(error.rechargeAmount)}
//                             helperText={error.rechargeAmount}
//                             value={rechargeAmount}
//                             onFocus={() => handleError('rechargeAmount', null)}
//                             onChange={(event) => setRechargeAmount(event.target.value)}
//                             variant='outlined' fullWidth />
//                     </Grid>
//                     <Grid item lg={4} sm={12} md={12} xs={12} >
//                         <label>Recharge Plan Extra Percent</label>
//                         <TextField
//                             label="20"
//                             error={Boolean(error.extraPercent)}
//                             helperText={error.extraPercent}
//                             value={extraPercent}
//                             onFocus={() => handleError('extraPercent', null)}
//                             onChange={(event) => setExtraPercent(event.target.value)}
//                             variant='outlined' fullWidth />
//                     </Grid>

//                     <Grid item lg={4} sm={6} md={6} xs={6} >
//                         <label>Status</label>
//                         <FormControl fullWidth>
//                             <InputLabel id="select-label">Select Option</InputLabel>
//                             <Select
//                                 label="Select Option"
//                                 labelId="select-label"
//                                 value={status}
//                                 onChange={(e) => setStatus(e.target.value)}
//                                 variant="outlined"
//                                 error={Boolean(error.status)}
//                                 fullWidth
//                             >
//                                 <MenuItem value="option1">Select Status</MenuItem>
//                                 <MenuItem value="option2">Enable</MenuItem>
//                                 <MenuItem value="option3">Disable</MenuItem>
//                             </Select>
//                             {error.status && (
//                                 <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '8px' }}>
//                                     {error.status}
//                                 </div>
//                             )}
//                         </FormControl>
//                     </Grid>

//                     <Grid item lg={6} sm={6} md={6} xs={6} >
//                         <div onClick={handleSubmit} className={classes.submitbutton}>
//                             Submit
//                         </div>
//                     </Grid>
//                     <Grid item lg={6} sm={6} md={6} xs={6} >
//                         <div onClick={handleReset} className={classes.denyButton}>
//                             Reset
//                         </div>
//                     </Grid>
//                 </Grid>
//             </div>
//         </div>
//     );
// };

// export default AddFirstRechargeOffer;
