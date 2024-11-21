import React, { useEffect, useState } from "react";
import { useStyles } from '../../assets/styles.js';
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select, Button } from "@mui/material";
import DvrIcon from '@mui/icons-material/Dvr';
import "react-datepicker/dist/react-datepicker.css"; // Add this line
import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import { base_url } from "../../utils/Constants.js";
import { addIcon } from "../../utils/FetchNodeServices.js";
import Swal from "sweetalert2";
import useAutocomplete from '@mui/material/useAutocomplete';


const AddIcons = () => {

    const navigate = useNavigate();
    const classes = useStyles();
    const [img, setImg] = useState(null);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [childCategory, setChildCategory] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState({});
    const [keywords, setKeywords] = useState([]);
    const [errorKeywords, setErrorKeywords] = useState('');
    const [displayChildCategoriesData, setDisplayChildCategoriesData] = useState([])
    const [iconImage, setIconImage] = useState(null)
    const [iconName, setIconName] = useState('')
    const [iconKeyWord, setIconKeyword] = useState()

    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }));
        console.log(error); // Add this line to check the error state
    };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     setImg(file);
    // };

    const handleNameChange = (e) => {
        setName(e.target.value);
        handleError('name', ''); // Clear the error when there is a change
    };

    const handleFileChange = (e) => {
      
        if(e.target.files && e.target.files.length > 0) {
            setIconImage(e.target.files[0])
            handleError('iconImage', ''); // Clear the error when there is a change
        }
    };

    const handleTitleChange = (e) => {
        setIconName(e.target.value);
        handleError('iconName', ''); // Clear the error when there is a change
    };

    const handleCategoryChange = (e) => {
        setChildCategory(e.target.value);
    };
    const handleSubCategoryChange = (e) => {
        setSubCategory(e.target.value);
    };
    const handleChildCategoryChange = (e) => {
        setChildCategory(e.target.value);
    };
    const validateForm = () => {
        const newError = {};
    
        if (!category) {
            newError.category = "Category is required";
        }
    
        if (category && !subCategory) {
            newError.subCategory = "Sub Category is required";
        }
    
        if (!img) {
            newError.img = "Image is required";
        }
    
        if (!name) {
            newError.name = "Icon Name is required";
        }
    
        if (keywords.length === 0) {
            newError.keywords = "Select at least one keyword";
        }
    
        if (!status || status === "option1") {
            newError.status = "Please select a valid Status";
        }
    
        setError(newError);
    
        // Return true if no errors, false if there are errors
        return Object.keys(newError).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const isValid = validateForm();
        // if (isValid) {
            console.log('Form submitted successfully');
            try {
                const iconData = new FormData();
                iconData.append('iconImage', iconImage);
                iconData.append('iconName', iconName);
                iconData.append('iconKeyWord', iconKeyWord.join(',')); // Assuming keywords are stored as an array
                iconData.append('status', status);
                iconData.append('childCategory_id', childCategory);
                // Send the form data to your API

                const response = await addIcon(iconData);
                if (response.data.status === true) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Icon added successfully',
                        showConfirmButton: false,
                        timer: 1500 // Optional: Auto close after 1.5 seconds
                    });
                }
                navigate('/displyIcons')
            } catch (error) {
                console.log("Client-side error:", error);
                console.log("Server-side error:", error.response.data);
            }
        // }
    };

    const getChildCategories = async () => {
        try {
          const response = await axios.get(`${base_url}/api/admin/getChildCategory`);
          setDisplayChildCategoriesData(response.data.result);
          console.log('data', response.data.result)
        } catch (error) {
          console.log(error);
        }
    };
    
    useEffect(() => {
        getChildCategories();
    }, []);    

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
                                Upload Icon
                            </div>

                            <div onClick={() => navigate("/displyIcons")} className={classes.addButton}>

                                <DvrIcon />
                                <div className={classes.addButtontext}>Display Icons</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="category-label">Select ChildCategory</InputLabel> 
                            <Select
                                labelId="category-label"
                                id="category"
                                value={childCategory}
                                onChange={handleCategoryChange}
                                label="Select childCategory"
                            >
                               {displayChildCategoriesData?.map((childCategories) => (
                                    <MenuItem
                                        key={childCategories?._id}
                                        value={childCategories?._id}

                                    >
                                        {childCategories?.childCategoryName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {childCategory && (
                        <div style={{ width: '100%', padding: '10px' }}>

                            <Grid container spacing={2}>

                                <Grid item lg={12} sm={12} md={12} xs={12}>
                                    <TextField
                                        type="file"
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleFileChange}
                                        error={Boolean(error.img)}
                                        helperText={error.img}  // This line displays the error message
                                    />
                                </Grid>
                                <Grid item lg={12} sm={12} md={12} xs={12} >
                                    <TextField
                                        label="Icon Name"
                                        value={iconName}
                                        onChange={handleTitleChange}
                                        error={Boolean(error.iconName)}
                                        variant='outlined' fullWidth
                                        helperText={error.iconName}  // This line displays the error message
                                    />
                                </Grid>
                                <Grid item lg={12} sm={12} md={12} xs={12} >                                   
                                    <Autocomplete
                                        {...getRootProps()}
                                        multiple
                                        id="tags-outlined"
                                        options={top10icons}
                                        value={iconKeyWord}
                                        onChange={(event, newValue) => {
                                            setIconKeyword(newValue.map(option => option.title));
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
                                            <MenuItem value="inActive">Inactive</MenuItem>
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
                                        cursor: "pointer",  // Add cursor pointer style
                                    }} onClick={handleSubmit}>
                                        <h5 style={{ textAlign: "center" }}> Upload Icon</h5>
                                    </div>
                                </Grid>

                            </Grid>
                        </div>
                    )}

                </Grid>
            </div>
        </div>
    );
};

export default AddIcons;
