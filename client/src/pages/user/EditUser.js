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
// import { useAuth } from "../../contexts/AuthContext"; // Import the authentication context
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

const EditUser = ({ username }) => {
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

    // const handleSubmit = async () => {
    //     const validationErrors = {};
    //     if(Object.keys(validationErrors).length === 0) {
    //         try {
    //             setSubmit("Submitting...");
    //             // Create a FormData object to send the updated user data along with the image file
    //             const formData = new FormData();
    //             formData.append("firstName", firstName);
    //             formData.append("lastName", lastName);
    //             formData.append("password", password);
    //             formData.append("confirmPassword", confirmPassword);
    //             // formData.append("profileImage", profileImage); // Assuming profileImage is the name of the file field
    //             const response = await axios.post(`${base_url}${update_profile}`, formData, {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data", // Make sure to set the content type to multipart/form-data for file upload
    //                 },
    //             }); 
    //             console.log(response)

    //             if(response.status === 200) {
    //                 // Handle success, e.g., show success message with SweetAlert
    //                 Swal.fire({
    //                     title: "Success!",
    //                     text: "User updated successfully!",
    //                     icon: "success",
    //                 }).then(() => {
    //                     // Do something after success if needed
    //                 });
    
    //                 console.log("Profile updated successfully:", response.data);
    //             } else {
    //                 // Handle error, e.g., show error message
    //                 console.error("Error updating profile:", response.data);
    //             }
    //         } catch (error) {
    //             // Handle unexpected errors
    //             console.error("Unexpected error during profile update:", error);
    //         } finally {
    //             setSubmit(""); // Reset the submit state
    //         }
    //     } else {
    //         setErrors(validationErrors);
    //     }
    // };


    const handleSubmit = async (username) => {
        const validationErrors = {};
        // Perform validation checks here if needed
        
        try {
            // Prepare the data to send in the request
            const userData = {
                firstName: firstName,
                lastName: lastName,
                password: password,
                confirmPassword: confirmPassword
            };
    
            // Make a POST request to the API endpoint
            const response = await postData(`${base_url}/api/admin/updateUserProfileByName/${username}`, userData);
    
            if (response && response.status === true) {
                // Handle success
                Swal.fire({
                    title: "Success!",
                    text: "User profile updated successfully.",
                    icon: "success",
                }).then(() => {
                    // Do something after success if needed
                });
                // Optionally, you can navigate the user back to a different page after successful update
                navigate("/displayUser");
            } else {
                // Handle failure
                Swal.fire("Error", "Failed to update user profile.", "error");
            }
        } catch (error) {
            // Handle errors
            console.error("Error updating user profile:", error);
            Swal.fire("Error", "An error occurred while updating user profile.", "error");
        }
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
                    <Grid item lg={6} sm={12} md={12} xs={12}>
                        <TextField
                            label="Enter First Name"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            error={errors.firstName}
                            helperText={errors.firstName}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item lg={6} sm={12} md={12} xs={12}>
                        <TextField
                            label="Enter last Name"
                            name="lastName"
                            value={lastName }
                            onChange={(e) => setLastName(e.target.value)}
                            error={errors.lastName}
                            helperText={errors.lastName}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item lg={6} sm={12} md={12} xs={12}>
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors.password}
                            helperText={errors.password}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item lg={6} sm={12} md={12} xs={12}>
                        <TextField
                            label="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    {/* <Grid item lg={12} sm={12} md={12} xs={12}>
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

export default EditUser;
