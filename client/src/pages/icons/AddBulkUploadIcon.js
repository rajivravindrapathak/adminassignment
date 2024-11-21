import React, { useState } from 'react'
import { useStyles } from '../../assets/styles.js';
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select, Button } from "@mui/material";
import axios from 'axios';
import { addBulkUpload } from '../../utils/FetchNodeServices.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AddCircleRounded } from '@mui/icons-material';

const AddBulkUploadIcon = () => {
    const classes = useStyles();
    const [excelFile, setexcelFile] = useState(null)
    const [error, setError] = useState()
    const navigate = useNavigate()

    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setexcelFile(e.target.files[0])
            handleError('excelFile', ''); // Clear the error when there is a change
        }
    }

    const handleBulkUpload = async () => {
        try {
            const BulkData = new FormData();
            BulkData.append('excelFile', excelFile);
            
            console.log("BulkData:", BulkData);
            // Send the form data to your API

            const response = await addBulkUpload(BulkData);
            console.log("data", response)
            if (response.data.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Bulk Icon added successfully',
                    showConfirmButton: false,
                    timer: 1500 // Optional: Auto close after 1.5 seconds
                });
                navigate('/displyIcons')
            }
        } catch (error) {
            console.log("Client-side error:", error);
            console.log("Server-side error:", error.response.data);
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log("Server-side error:", error.response.data);
                // Display a user-friendly error message based on error.response.data
                // You can use Swal or other UI components for this
              } else if (error.request) {
                // The request was made but no response was received
                console.log("No response received from the server");
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error setting up the request:", error.message);
              }
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.box} style={{ padding: "3rem" }}>
            <h1>BulkUpload Icon</h1>
                <Grid container spacing={2} style={{ marginTop: '25px'}}>                    
                    <Grid item lg={9} sm={9} md={9} xs={9}>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </Grid>
                    <Grid item lg={3} sm={3} md={3} xs={3}>
                        <div className={classes.addButton} onClick={handleBulkUpload}>
                            <AddCircleRounded />
                            <div className={classes.addButtontext}>Add New</div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default AddBulkUploadIcon




// import React, { useState } from 'react';
// import { useStyles } from '../../assets/styles.js';
// import { Grid } from "@mui/material";
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const AddBulkUploadIcon = () => {
//     const classes = useStyles();
//     const [excelFile, setExcelFile] = useState(null);

//     const handleFileChange = (e) => {
//         if (e.target.files && e.target.files.length > 0) {
//             setExcelFile(e.target.files[0]);
//         }
//     };

//     const handleBulkUpload = async () => {
//         try {
//             if (!excelFile) {
//                 console.log("File not uploaded");
//                 return;
//             }

//             const formData = new FormData();
//             formData.append('excelFile', excelFile);

//             console.log("BulkData:", formData);

//             // Send the form data to your API
//             const response = await axios.post('http://localhost:5000/api/admin/bulkUpload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             console.log("data", response);

//             if (response.data.status === true) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Bulk Icon added successfully',
//                     showConfirmButton: false,
//                     timer: 1500 // Optional: Auto close after 1.5 seconds
//                 });
//             }
//         } catch (error) {
//             console.log("Client-side error:", error);
//             console.log("Server-side error:", error.response?.data);

//             if (error.response) {
//                 // The request was made and the server responded with a status code
//                 console.log("Server-side error:", error.response.data);
//                 // Display a user-friendly error message based on error.response.data
//                 // You can use Swal or other UI components for this
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 console.log("No response received from the server");
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 console.log("Error setting up the request:", error.message);
//             }
//         }
//     };

//     return (
//         <div className={classes.container}>
//             <div className={classes.box} style={{ padding: "3rem" }}>
//                 <Grid container spacing={2}>
//                     <h1>BulkUpload Icon</h1>
//                     <Grid item lg={12} sm={12} md={12} xs={12}>
//                         <input type="file" accept="image/*" onChange={handleFileChange} />
//                     </Grid>
//                     <div className={classes.heading} onClick={handleBulkUpload}>
//                         Upload Icon
//                     </div>
//                 </Grid>
//             </div>
//         </div>
//     );
// };

// export default AddBulkUploadIcon;
