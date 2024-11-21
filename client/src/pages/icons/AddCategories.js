import React, { useState } from "react";
import { useStyles } from '../../assets/styles.js';
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select, Button } from "@mui/material";
import DvrIcon from '@mui/icons-material/Dvr';
import "react-datepicker/dist/react-datepicker.css"; // Add this line
import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import useAutocomplete from '@mui/material/useAutocomplete';
import { addCategogry } from "../../utils/FetchNodeServices.js";
import Swal from 'sweetalert2';

const AddCategories = () => {

    const navigate = useNavigate();
    const classes = useStyles();
    const [categoryName, setCategoryName] = useState(''); // categoryName
    // const [categoryImage, setCategoryImage] = useState({ file: null, bytes: "" }); // categoryImage
    const [categoryImage, setCategoryImage] = useState(null); // categoryImage
    const [categoryKeyWord, setCategoryKeyWord] = useState(); // categoryKeyWord
    const [status, setStatus] = useState('');
    const [error, setError] = useState({});
    const [errorKeywords, setErrorKeywords] = useState('');

    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            // setCategoryImage({
            //     file: URL.createObjectURL(e.target.files[0]),
            //     bytes: e.target.files[0]
            // });
            setCategoryImage(e.target.files[0])
            handleError('categoryImage', ''); // Clear the error when there is a change
        }
    };

    const handleTitleChange = (e) => {
        setCategoryName(e.target.value);
        handleError('categoryName', ''); // Clear the error when there is a change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const isValid = validateForm();
        // if (isValid) {
            console.log('Form submitted successfully');
            try {
                const categoriesData = new FormData();
                categoriesData.append('categoryImage', categoryImage);
                console.log("categoryImage:", categoryImage);
                categoriesData.append('categoryName', categoryName);
                categoriesData.append('categoryKeyWord', categoryKeyWord.join(',')); // Assuming keywords are stored as an array
                categoriesData.append('status', status);
                // Send the form data to your API

                const response = await addCategogry(categoriesData);
                if (response.data.status === true) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Category added successfully',
                        showConfirmButton: false,
                        timer: 1500 // Optional: Auto close after 1.5 seconds
                    });
                    navigate('/categories')
                }
            } catch (error) {
                console.log("Client-side error:", error);
                console.log("Server-side error:", error.response.data);
            }
        // }
    };

    const validateForm = () => {
        const newError = {};
        if (!categoryName) {
            newError.categoryName = "Category Name is required";
        }
        if (!categoryImage) {
            newError.categoryImage = "Image is required";
        }
        if (!status || status === "option1") {
            newError.status = "Please select a valid Status";
        }
        setError(newError);
        // Return true if no errors, false if there are errors
        return Object.keys(newError).length === 0;
    };

    const top10icons = [
        { title: 'Bio' },
        { title: 'Chemistry' },
        { title: 'op1' },
        { title: 'op2' },
        { title: 'op3' },
    ];

    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete({
        id: 'tags-outlined',
        options: top10icons,
        getOptionLabel: (option) => option.title,
        isOptionEqualToValue: (option, value) => option.title === value.title,
    });

    return (
        <div className={classes.container}>
            <div className={classes.box} style={{ padding: "3rem" }}>
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <div className={classes.heading} >
                                Upload Categories 
                            </div>

                            <div onClick={() => navigate("/categories")} className={classes.addButton}>

                                <DvrIcon />
                                <div className={classes.addButtontext}>Display Categories</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <TextField
                            label="Category Name"
                            value={categoryName}
                            onChange={handleTitleChange}
                            variant='outlined'
                            fullWidth
                            error={Boolean(error.categoryName)}
                            helperText={error.categoryName} />
                    </Grid>

                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <Autocomplete
                            {...getRootProps()}
                            multiple
                            id="tags-outlined"
                            options={top10icons}
                            value={categoryKeyWord}
                            onChange={(event, newValue) => {
                                setCategoryKeyWord(newValue.map(option => option.title));
                                setErrorKeywords(newValue.length === 0 ? 'Select at least one keyword' : '');
                            }}
                            getOptionLabel={(option) => option.title}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Keywords"
                                    error={Boolean(errorKeywords)}
                                    helperText={errorKeywords}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
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
                                <MenuItem >Select Status</MenuItem>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="inActive">inActive</MenuItem>
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

export default AddCategories;
