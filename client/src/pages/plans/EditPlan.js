// edit user page

import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";

import {
    Grid,
    TextField,
    FormControl,
    Checkbox,
    FormGroup,
    FormControlLabel,
    FormLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../../utils/FetchNodeServices.js";
import { base_url, update_profile } from "../../utils/Constants.js";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";


export const EditPlan = props => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    // const [userName, setUserName] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [submit, setSubmit] = useState("");
    const [reset, setReset] = useState("");
    const location = useLocation()
    const [profileImage, setProfileImage] = useState(null)


    // const userName  = useSelector(state => state.auth.userName );
    // console.log("username::::::::", userName )
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {           
            setProfileImage(e.target.files[0])
            // handleError('profileImage', ''); // Clear the error when there is a change
        }
    }

    const handleSubmit = async () => {
        // const validationErrors = {};   /api/admin/updatePlanStatus
        // if(Object.keys(validationErrors).length === 0) {
        //     try {
        //         setSubmit("Submitting...");
        //         // Create a FormData object to send the updated user data along with the image file
        //         const formData = new FormData();
        //         formData.append("firstName", firstName);
        //         formData.append("lastName", lastName);
        //         formData.append("password", password);
        //         formData.append("confirmPassword", confirmPassword);
        //         formData.append("profileImage", profileImage); // Assuming profileImage is the name of the file field
        //         const response = await axios.post(`${base_url}${update_profile}`, formData, {
        //             headers: {
        //                 "Content-Type": "multipart/form-data", // Make sure to set the content type to multipart/form-data for file upload
        //             },
        //         }); 
        //         console.log(response)

        //         if(response.status === 200) {
        //             // Handle success, e.g., show success message with SweetAlert
        //             Swal.fire({
        //                 title: "Success!",
        //                 text: "User updated successfully!",
        //                 icon: "success",
        //             }).then(() => {
        //                 // Do something after success if needed
        //             });
    
        //             console.log("Profile updated successfully:", response.data);
        //         } else {
        //             // Handle error, e.g., show error message
        //             console.error("Error updating profile:", response.data);
        //         }
        //     } catch (error) {
        //         // Handle unexpected errors
        //         console.error("Unexpected error during profile update:", error);
        //     } finally {
        //         setSubmit(""); // Reset the submit state
        //     }
        // } else {
        //     setErrors(validationErrors);
        // }
    };

    const handleReset = () => {
        
    };


    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <div className={classes.heading}>Update your profile</div>
                            <div
                                onClick={() => navigate("/displayUser")}
                                className={classes.addButton}
                            >
                                <CloseIcon />

                            </div>
                        </div>
                    </Grid>
                    
                    {/* <Grid item lg={6} sm={12} md={12} xs={12}>
                        <TextField
                            label="Enter Plan Name"
                            name="PlanName"
                            value={planName}
                            onChange={(e) => setPlanName(e.target.value)}
                            error={errors.planName}
                            helperText={errors.planName}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item lg={6} sm={12} md={12} xs={12}>
                        <TextField
                            label="Enter plan amount"
                            name="planAmount"
                            value={planAmount }
                            onChange={(e) => setPlanAmount(e.target.value)}
                            error={errors.planAmount}
                            helperText={errors.planAmount}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item lg={6} sm={12} md={12} xs={12}>
                        <TextField
                            label="Description"
                            type="string"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            error={errors.description}
                            helperText={errors.description}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item lg={6} sm={12} md={12} xs={12}>
                        <TextField
                            label="Plan validity"
                            type="string"
                            name="planValidity"
                            value={planValidity}
                            onChange={(e) => setPlanValidity(e.target.value)}
                            error={errors.planValidity}
                            helperText={errors.planValidity}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                        />
                    </Grid> */}
                    
                    <Grid item lg={6} sm={6} md={6} xs={6}>
                        <div onClick={handleSubmit} className={classes.submitbutton}>
                            {submit || "Submit"}
                        </div>
                    </Grid>
                    <Grid item lg={6} sm={6} md={6} xs={6}>
                        <div onClick={handleReset} className={classes.denyButton}>
                            {reset || "Reset"}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default EditPlan;
