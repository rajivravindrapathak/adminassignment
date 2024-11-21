import React, { useState } from "react";
import { useStyles } from '../../assets/styles.js';
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select, Button } from "@mui/material";
import DvrIcon from '@mui/icons-material/Dvr';
import "react-datepicker/dist/react-datepicker.css"; // Add this line
import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';

const AddVCategories = () => {

    const navigate = useNavigate();
    const classes = useStyles();
    const [img, setImg] = useState(null);
    const [name, setName] = useState('');
    const [discription, setDiscription] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState({});

    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImg(file);
        handleError('img', ''); // Clear the error when there is a change
    };

    const handleTitleChange = (e) => {
        setName(e.target.value);
        handleError('name', ''); // Clear the error when there is a change
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            // TODO: Add logic to handle the uploaded video file
            console.log('Form submitted successfully');
        }
    };

    const validateForm = () => {
        const newError = {};

        if (!name) {
            newError.name = "Category Name is required";
        }

        if (!img) {
            newError.img = "Image is required";
        }

        if (!status || status === "option1") {
            newError.status = "Please select a valid Status";
        }

        setError(newError);

        // Return true if no errors, false if there are errors
        return Object.keys(newError).length === 0;
    };
    
    const top10icons = [
        { title: 'Bio'},
        { title: 'Chemistry'},
        { title: 'op1'},
        { title: 'op2'},
        { title: 'op3'},
      ];

    return (
        <div className={classes.container}>
            <div className={classes.box} style={{ padding: "3rem" }}>
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <div className={classes.heading} >
                                Uplode Categories
                            </div>
                            
                            <div onClick={() => navigate("/addVSubCategories")} className={classes.addButton}>

                                <DvrIcon />
                                <div className={classes.addButtontext}>Display Video Categories</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <TextField
                            label="Category Name"
                            value={name}
                            onChange={handleTitleChange}
                            variant='outlined' 
                            fullWidth
                            error={Boolean(error.name)}
                            helperText={error.name} />
                    </Grid>

                    


                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <TextField
                            type="file"
                            variant="outlined"
                            fullWidth
                            onChange={handleFileChange}
                            error={Boolean(error.img)}
                            helperText={error.img}
                        // Add any other props you need for file input
                        />
                    </Grid>
                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Select Status</InputLabel>
                            <Select
                                label="Select Status"
                                labelId="select-label"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                variant="outlined"
                                error={Boolean(error.status)}
                                fullWidth
                            >
                                <MenuItem value="option1">Select Status</MenuItem>
                                <MenuItem value="option2">Active</MenuItem>
                                <MenuItem value="option3">Inactive</MenuItem>
                            </Select>
                            {error.status && (
                                <div className={classes.errorstyles}>{error.status}</div>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{
                            borderRadius: 25,
                            backgroundColor: "#B97432",
                            padding: "10px 20px",
                            fontSize: "18px",
                            color: "white",
                            cursor: "pointer",
                        }} onClick={handleSubmit}>
                            <h5 style={{ textAlign: "center" }}> Upload Icon</h5>
                        </div>
                    </Grid>



                </Grid>
            </div>
        </div>
    );
};

export default AddVCategories;
