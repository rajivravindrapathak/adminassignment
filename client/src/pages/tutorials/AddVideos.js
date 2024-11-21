import React, { useState } from "react";
import { useStyles } from '../../assets/styles.js';
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select, Button } from "@mui/material";
import DvrIcon from '@mui/icons-material/Dvr';
import "react-datepicker/dist/react-datepicker.css"; // Add this line
import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import { type } from "@testing-library/user-event/dist/type/index.js";
import Swal from "sweetalert2";
import { addVedio, addVideo } from "../../utils/FetchNodeServices.js";
import useAutocomplete from '@mui/material/useAutocomplete';


const AddVideos = () => {

    const navigate = useNavigate();
    const classes = useStyles();
    const [videoFile, setVedioFile] = useState(null)
    const [title, setTitle] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState({});
    const [vedioKeyword, setVedioKeyword] = useState();
    const [errorKeywords, setErrorKeywords] = useState('');
    const [descrioption, setDescrioption] = useState('')

    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }));
        console.log(error); // Add this line to check the error state
    };

    const handleCategoryChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleFileChange = (e) => {
        if(e.target.files && e.target.files.length > 0) {
            setVedioFile(e.target.files[0])
            handleError('videoFile', ''); // Clear the error when there is a change
        }
    };
    const handleTitleNameChange = (e) => {
        setTitle(e.target.value);
        handleError('title', ''); // Clear the error when there is a change
    };

    const handleDescChange = (e) => {
        setDescrioption(e.target.value)
        handleError('descrioption', '');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const isValid = validateForm();
        // if (isValid) {
            console.log('Form submitted successfully');
            try {
                const VideoData = new FormData();
                VideoData.append('categoryName', categoryName)
                VideoData.append('videoFile', videoFile);
                VideoData.append('title', title);
                VideoData.append('descrioption', descrioption);
                VideoData.append('vedioKeyword', vedioKeyword.join(',')); // Assuming keywords are stored as an array
                VideoData.append('status', status);
                // VideoData.append('childCategory_id', childCategory);
                // Send the form data to your API

                const response = await addVideo(VideoData);
                if (response.data.status === true) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Vedio added successfully',
                        showConfirmButton: false,
                        timer: 1500 // Optional: Auto close after 1.5 seconds
                    });
                }
                navigate('/videos')
            } catch (error) {
                console.log("Client-side error:", error);
                console.log("Server-side error:", error.response.data);
            }
        // }
    };

    // const validateForm = () => {
    //     const newError = {};
    
    //     // if (!category) {
    //     //     newError.category = "Category is required";
    //     // }
    
    //     // if (category && !subCategory) {
    //     //     newError.subCategory = "Sub Category is required";
    //     // }
    
    //     // if (!img) {
    //     //     newError.img = "Image is required";
    //     // }
    
    //     // if (!name) {
    //     //     newError.name = "Icon Name is required";
    //     // }
    
    //     // if (keywords.length === 0) {
    //     //     newError.keywords = "Select at least one keyword";
    //     // }
    
    //     // if (!status || status === "option1") {
    //     //     newError.status = "Please select a valid Status";
    //     // }
    
    //     setError(newError);
    
    //     // Return true if no errors, false if there are errors
    //     return Object.keys(newError).length === 0;
    // };

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
                                Uplode Videos
                            </div>

                            <div onClick={() => navigate("/videos")} className={classes.addButton}>

                                <DvrIcon />
                                <div className={classes.addButtontext}>Display Videos</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="category-label">Select Category</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                value={categoryName}
                                onChange={handleCategoryChange}
                                label="Select Category"
                            >
                                <MenuItem value="">Select Category</MenuItem>
                                <MenuItem value="basic">  basic tutorial</MenuItem>
                                <MenuItem value="brush"> brush tutorial</MenuItem>
                                <MenuItem value="tutorial"> redo tutorial</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {categoryName  && (
                        <div style={{ width: '100%', padding: '10px' }}>

                            <Grid container spacing={2}>

                                {/* <Grid item lg={12} sm={12} md={12} xs={12} >
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="category-label">Select Sub Category</InputLabel>
                                        <Select
                                            labelId="category-label"
                                            id="subCategory"
                                            value={subCategory}
                                            onChange={handleSubCategoryChange}
                                            label="Select Sub Category"
                                        >
                                            <MenuItem value="">Select Sub Category</MenuItem>
                                            <MenuItem value="basic">  basic tutorial</MenuItem>
                                            <MenuItem value="brush"> brush tutorial</MenuItem>
                                            <MenuItem value="tutorial"> redo tutorial</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid> */}

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
                                        label="Title"
                                        value={title}
                                        onChange={handleTitleNameChange}
                                        error={Boolean(error.title)}
                                        variant='outlined' fullWidth
                                        helperText={error.title}  // This line displays the error message
                                    />
                                </Grid>
                                <Grid item lg={12} sm={12} md={12} xs={12} >
                                    <TextField
                                        label="Descrioption"
                                        value={descrioption}
                                        onChange={handleDescChange}
                                        error={Boolean(error.descrioption)}
                                        variant='outlined' fullWidth
                                        helperText={error.descrioption}  // This line displays the error message
                                    />
                                </Grid>

                                <Grid item lg={12} sm={12} md={12} xs={12} >
                                    <Autocomplete
                                        multiple
                                        id="tags-outlined"
                                        options={top10icons}
                                        value={vedioKeyword}
                                        onChange={(event, newValue) => {
                                            setVedioKeyword(newValue.map(option => option.title));;
                                            setErrorKeywords(newValue.length === 0 ? 'Select at least one keyword' : '');
                                        }}
                                        getOptionLabel={(option) => option.title}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Select vedio Keywords"
                                                // placeholder="BioBasics"
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
                                        <h5 style={{ textAlign: "center" }}> Upload Vedio</h5>
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

export default AddVideos;
