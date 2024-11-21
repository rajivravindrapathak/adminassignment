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
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";


export const AddSubAdmin = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [altMobile, setAltMobile] = useState("");
  const [password, setPassword] = useState("");
  const [working, setWorking] = useState("");
  const [submit, setSubmit] = useState("");
  const [reset, setReset] = useState("");

  const permissionLabelStyle = {
    fontSize: '1rem !important', // Set your desired font size here with !important
  };

  const handleSubmit = () => {
    const validationErrors = {};
    if (!name) {
      validationErrors.name = "Name is required";
    }
    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }
    if (!altMobile) {
      validationErrors.altMobile = "Mobile Number is required";
    }

    if (Object.keys(validationErrors).length === 0) {
      // Proceed with submission logic
      setSubmit("Submitting..."); // You can use this state to show a loading indicator
      // Add your logic here for submitting the form data
    } else {
      setErrors(validationErrors);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMobile("");
    setAltMobile("");
    setPassword("");
    setWorking("");
    setReset("");
    setErrors({});
  };
  const astrologicalReasons = [
    {
      id: 1,
      topic: "Create Sub-Admin",
    },
    {
      id: 2,
      topic: "List of users",
    },
    {
      id: 3,
      topic: "Add and review Resources",
    },
    {
      id: 4,
      topic: "Add and review Icons",
    },
    {
      id: 5,
      topic: "Add and review Templates",
    },
    {
      id: 6,
      topic: "Privacy Policies",
    },
    {
      id: 7,
      topic: "Terms & Conditions",
    },
    {
      id: 8,
      topic: "About Us",
    },
 
    {
      id: 9,
      topic: "Review Transaction History ",
    },
    
      
  ];

  console.log(working)
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Sub-Admin</div>
              <div
                onClick={() => navigate("/displaySubAdmin")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Sub-Admins</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              helperText={errors.name}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              helperText={errors.email}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Password"
              type="password"
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
              label="Mobile Number"
              value={altMobile}
              onChange={(e) => setAltMobile(e.target.value)}
              error={errors.altMobile}
              helperText={errors.altMobile}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Permission</FormLabel>
              <FormGroup aria-label="position" row >
                {astrologicalReasons.map((item) => (
                  <div key={item.id} className={classes.chips}>
                    <FormControlLabel
                      value={item.topic}
                      control={<Checkbox />}
                      label={item.topic}
                      labelPlacement="end"
                      className={classes.permissionLabel}
                    />
                  </div>
                ))}
              </FormGroup>
            </FormControl>
          </Grid>

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

export default AddSubAdmin;