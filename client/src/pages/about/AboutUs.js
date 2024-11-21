import React, { useState } from "react";
import { useStyles } from '../../assets/styles.js';
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { TextareaAutosize } from '@mui/base';
import DvrIcon from '@mui/icons-material/Dvr';
import { add_recharge_plans } from "../../utils/Constants.js";
import { postData } from '../../utils/FetchNodeServices.js';
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "../../Components/RichTextEditor.js";


const AboutUs = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [rechargeAmount, setRechargeAmount] = useState('');
    const [extraPercent, setExtraPercent] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [terms, setTerms] = useState('');
    const [error, setError] = useState({});

    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }));
    };

    const validation = () => {
        let isValid = true;
        if (!rechargeAmount) {
            handleError('rechargeAmount', 'Please input Recharge Amount');
            isValid = false;
        }
        if (!extraPercent) {
            handleError('extraPercent', 'Please input Extra Percent');
            isValid = false;
        }
        if (!startDate) {
            handleError('startDate', 'Please Pick Start Date');
            isValid = false;
        }
        if (!endDate) {
            handleError('endDate', 'Please Pick End Date');
            isValid = false;
        }
        if (!status || status === 'option1') {
            handleError('status', 'Please Select Status');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async () => {
        if (validation()) {
            var formData = new FormData();
            formData.append('rechargeAmount', rechargeAmount);
            formData.append('extraPercent', extraPercent);
            formData.append('startDate', startDate);
            formData.append('endDate', endDate);
            formData.append('status', status);
            var response = await postData(add_recharge_plans, formData);
            if (response.status) {
                Swal.fire({
                    icon: 'success',
                    title: "Recharge Plan Added Successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
                handleReset();
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: "Server Error",
                    text: "Recharge Submission Failed",
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }
    };

    const handleReset = () => {
        setRechargeAmount('');
        setExtraPercent('');
        setStartDate('');
        setEndDate('');
        setStatus('');
        setError({});
    };

    const handleDateChange = (date) => {
        setStartDate(date);
        // Additional logic you want to perform on date change
    };

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <div className={classes.heading} >
                               About Us
                            </div>
                        </div>
                    </Grid>

                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            label="About Us"
                            value={terms}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setTerms(e.target.value)}
                           
                            
                        />
                    </Grid>

                    <Grid item lg={6} sm={6} md={6} xs={6} >
                        <div onClick={handleSubmit} className={classes.submitbutton}>
                            Submit
                        </div>
                    </Grid>
                    <Grid item lg={6} sm={6} md={6} xs={6} >
                        <div onClick={handleReset} className={classes.denyButton}>
                            Reset
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default AboutUs;
