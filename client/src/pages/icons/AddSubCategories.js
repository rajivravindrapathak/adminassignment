import React, { useEffect, useState } from "react";
import { useStyles } from '../../assets/styles.js';
import {
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button
} from "@mui/material";
import DvrIcon from '@mui/icons-material/Dvr';
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import Swal from "sweetalert2";
import { addSubCategogry } from "../../utils/FetchNodeServices.js";
import { base_url } from "../../utils/Constants.js";
import { useNavigate } from "react-router-dom";
import useAutocomplete from '@mui/material/useAutocomplete';


const AddSubCategories = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [img, setImg] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState({});
  const [keywords, setKeywords] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState('');
  const [errorKeywords, setErrorKeywords] = useState('');
  const [subCategoryImage, setSubCategoryImage] = useState(null);
  const [subCategoryKeyWord, setSubCategoryKeyWord] = useState();
  const [displayCategoriesData, setDisplayCategoriesData] = useState([]);
  
  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const handleFileChange = (e) => {
    // const file = e.target.files[0];
    // setSubCategoryImage(file);
    // handleError('img', '');

    if (e.target.files && e.target.files.length > 0) {
      setSubCategoryImage(e.target.files[0])
      handleError('subCategoryImage', ''); // Clear the error when there is a change
    }
  };

  const handleTitleChange = (e) => {
    setSubCategoryName(e.target.value);
    handleError('subCategoryName', '');
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    handleError('category', '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const subCategoriesData = new FormData();
      subCategoriesData.append('subCategoryImage', subCategoryImage);
      subCategoriesData.append('subCategoryName', subCategoryName);
      subCategoriesData.append('subCategoryKeyWord', subCategoryKeyWord.join(','));
      subCategoriesData.append('status', status);
      subCategoriesData.append('category_id', category);
      console.log("categoryid", category)
      const response = await addSubCategogry(subCategoriesData);
      console.log("Full response:", response);
      if(response.data.status === true) {
        Swal.fire({
          icon: 'success',
          title: 'SubCategory added successfully',
          showConfirmButton: false,
          timer: 1500
        });
      }
      navigate('/subCategories')
    } catch (error) {
      console.log("Client-side error:", error);
      console.log("Server-side error:", error.response.data);
    }
  };

  const validateForm = () => {
    const newError = {};

    if (!category) {
      newError.category = "Select Category is required";
    }

    if (!name) {
      newError.name = "Sub Category Name is required";
    }

    if (!img) {
      newError.img = "Image is required";
    }

    if (!status || status === "option1") {
      newError.status = "Please select a valid Status";
    }

    setError(newError);

    return Object.keys(newError).length === 0;
  };

  const top10icons = [
    { title: 'Amiba' },
    { title: 'organic' },
    { title: 'op1' },
    { title: 'op2' },
    { title: 'op3' },
  ];

  const getCategories = async () => {
    try {
      const response = await axios.get(`${base_url}/api/admin/getCategories`);
      setDisplayCategoriesData(response.data.result);
      console.log("data", response.data.result)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
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


  return (
    <div className={classes.container}>
      <div className={classes.box} style={{ padding: "3rem" }}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>
                Upload Sub Categories
              </div>
              <div onClick={() => navigate("/subCategories")} className={classes.addButton}>
                <DvrIcon />
                <div className={classes.addButtontext}>Add subCategories</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12} >
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-label">Select Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={category}
                onChange={handleCategoryChange}
                label="Select Category"
                error={Boolean(error.category)}
                helperText={error.category}
              >
                <MenuItem value="">Select Category</MenuItem>
                {displayCategoriesData?.map((category) => (
                  <MenuItem
                    key={category?._id}
                    value={category?._id}

                  >
                    {category?.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {category && (
            <div style={{ width: '100%', padding: '10px' }}>
              <Grid container spacing={2}>
                <Grid item lg={12} sm={12} md={12} xs={12} >
                  <TextField
                    label="Sub Category Name"
                    value={subCategoryName}
                    onChange={handleTitleChange}
                    variant='outlined'
                    fullWidth
                    error={Boolean(error.subCategoryName)}
                    helperText={error.subCategoryName} />
                </Grid>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                  <Autocomplete
                    {...getRootProps()}
                    multiple
                    id="tags-outlined"
                    options={top10icons}
                    value={subCategoryKeyWord}
                    onChange={(event, newValue) => {
                        setSubCategoryKeyWord(newValue.map(option => option.title));
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
          )}
        </Grid>
      </div>
    </div>
  );
};

export default AddSubCategories;
