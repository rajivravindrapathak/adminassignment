import React, { useEffect, useState } from "react";
import { useStyles } from '../../assets/styles.js';
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select, Button } from "@mui/material";
import DvrIcon from '@mui/icons-material/Dvr';
import "react-datepicker/dist/react-datepicker.css"; // Add this line
import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import { base_url } from "../../utils/Constants.js";
import axios from "axios";
import { addChildCategogry } from "../../utils/FetchNodeServices.js";
import Swal from "sweetalert2";
import useAutocomplete from '@mui/material/useAutocomplete';


const AddChildCategories = () => {

    const navigate = useNavigate();
    const classes = useStyles();
    const [img, setImg] = useState(null);
    const [name, setName] = useState('');
    const [discription, setDiscription] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [error, setError] = useState({});
    const [displayCategoriesData, setDisplayCategoriesData] = useState([]);
    const [childCategoryName, setChildCategoryName] = useState('');
    const [childCategoryImage, setChildCategoryImage] = useState(null);
    const [displaySubCategoriesData, setDisplaySubCategoriesData] = useState([])
    const [childCategoryKeyWord, setChildCategoryKeyWord] = useState()
    const [errorKeywords, setErrorKeywords] = useState('');


    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }));
    };

    // const handleFileChange = (e) => {
    //     // const file = e.target.files[0];
    //     // setImg(file);
    //     // handleError('img', ''); // Clear the error when there is a change
    //      // const file = e.target.files[0];
    //     // setSubCategoryImage(file);
    //     // handleError('img', '');

    //     if (e.target.files && e.target.files.length > 0) {
    //         setChildCategoryImage(e.target.files[0])
    //         handleError('childCategoryImage', ''); // Clear the error when there is a change
    //     }
    // };

    const handleFileChange = (e) => {
        // const file = e.target.files[0];
        // setSubCategoryImage(file);
        // handleError('img', '');
    
        if (e.target.files && e.target.files.length > 0) {
            setChildCategoryImage(e.target.files[0])
          handleError('childCategoryImage', ''); // Clear the error when there is a change
        }
    };

    const handleTitleChange = (e) => {
        setChildCategoryName(e.target.value);
        handleError('childCategoryName', ''); // Clear the error when there is a change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const isValid = validateForm();
        // if (isValid) {
            console.log('Form submitted successfully');
            try {
                const childCategoriesData = new FormData();
                childCategoriesData.append('childCategoryImage', childCategoryImage);
                // console.log("childCategoryImage:", childCategoryImage);
                childCategoriesData.append('childCategoryName', childCategoryName);
                childCategoriesData.append('childCategoryKeyWord', childCategoryKeyWord.join(',')); // Assuming keywords are stored as an array
                childCategoriesData.append('status', status);
                childCategoriesData.append('subCategory_id', subCategory);
                // Send the form data to your API

                const response = await addChildCategogry(childCategoriesData);
                if (response.data.status === true) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Child Category added successfully',
                        showConfirmButton: false,
                        timer: 1500 // Optional: Auto close after 1.5 seconds
                    });
                }
                navigate('/childCategories')
            } catch (error) {
                console.log("Client-side error:", error);
                console.log("Server-side error:", error.response.data);
            }
        // }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubCategoryChange = (e) => {
        setSubCategory(e.target.value);
    };

    const validateForm = () => {
        const newError = {};

        if (!category) {
            newError.category = "Category is required";
        }

        if (!subCategory) {
            newError.subCategory = "Sub Category is required";
        }

        if (!name) {
            newError.name = "Child Category Name is required";
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
        { title: 'Bio' },
        { title: 'Chemistry' },
        { title: 'op1' },
        { title: 'op2' },
        { title: 'op3' },
    ];

    // const getCategories = async () => {
    //     try {
    //       const response = await axios.get(`${base_url}/api/admin/getCategories`);
    //       setDisplayCategoriesData(response.data.result);
    //       console.log('data', response.data.result)
    //     } catch (error) {
    //       console.log(error);
    //     }
    // };

    const getSubCategories = async () => {
        try {
          const response = await axios.get(`${base_url}/api/admin/getSubCategory`);
          setDisplaySubCategoriesData(response.data.result);
          console.log('data', response.data.result)
        } catch (error) {
          console.log(error);
        }
    };
    
    useEffect(() => {
        // getCategories()
        getSubCategories();
    }, []);

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

    console.log("subCategory", subCategory._id)

    return (
        <div className={classes.container}>
            <div className={classes.box} style={{ padding: "3rem" }}>
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <div className={classes.heading} >
                                Upload Sub Categories
                            </div>

                            <div onClick={() => navigate("/subCategories")} className={classes.addButton}>

                                <DvrIcon />
                                <div className={classes.addButtontext}>Display Categories</div>
                            </div>
                        </div>
                    </Grid>

                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="category-label">Select Category</InputLabel>
                            <Select
                                    labelId="category-label"
                                    id="subCategory"
                                    value={subCategory}
                                    onChange={handleSubCategoryChange}
                                    label="Select Sub Category"
                                    error={Boolean(error.subCategory)}
                                    helperText={error.subCategory}
                                >
                                    {displaySubCategoriesData.map((subCategory) => (
                                        <MenuItem
                                            key={subCategory._id}
                                            value={subCategory._id}
                                        >
                                            {subCategory.subCategoryName}
                                        </MenuItem>
                                    ))}
                                </Select>
                        </FormControl>
                    </Grid>                  

                    {subCategory && (
                        <div style={{ width: '100%', padding: '10px' }}>
                                <Grid container spacing={2}>
                                <Grid item lg={12} sm={12} md={12} xs={12} >
                                    <TextField
                                        label="Child Category Name"
                                        value={childCategoryName}
                                        onChange={handleTitleChange}
                                        variant='outlined'
                                        fullWidth
                                        error={Boolean(error.childCategoryName)}
                                        helperText={error.childCategoryName} />
                                </Grid>
                                <Grid item lg={12} sm={12} md={12} xs={12}>
                                    <Autocomplete
                                        {...getRootProps()}
                                        multiple
                                        id="tags-outlined"
                                        options={top10icons}
                                        value={childCategoryKeyWord}
                                        onChange={(event, newValue) => {
                                            setChildCategoryKeyWord(newValue.map(option => option.title));
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
                                    <TextField
                                        type="file"
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleFileChange}
                                        error={Boolean(error.img)}
                                        helperText={error.img}
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
                                            <MenuItem>Select Status</MenuItem>
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
                    )}
                </Grid>
            </div >
        </div >
    );
};

export default AddChildCategories;
