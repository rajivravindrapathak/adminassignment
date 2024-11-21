// import React, { useState } from "react";
// import { useStyles } from "../../assets/styles.js";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import {
//   Grid,
//   TextField,
//   Select,
//   Avatar,
//   OutlinedInput,
//   InputLabel,
//   MenuItem,
//   FormControl,
//   ListItemText,
//   Checkbox,
//   FormGroup,
//   FormControlLabel,
//   FormLabel,
// } from "@mui/material";

// import { useNavigate } from "react-router-dom";
// import { Colors } from "../../assets/styles.js";
// import logo_icon from "../../assets/images/logo_icon.png";

// const RemediesList = [
//   {
//     id: 1,
//     topic: "Marriage",
//   },
//   {
//     id: 2,
//     topic: "Health",
//   },
//   {
//     id: 3,
//     topic: "Career",
//   },
//   {
//     id: 4,
//     topic: "Finance",
//   },
//   {
//     id: 5,
//     topic: "Education",
//   },
//   {
//     id: 6,
//     topic: "Relationships",
//   },
//   {
//     id: 7,
//     topic: "Travel",
//   },
//   {
//     id: 8,
//     topic: "Spirituality",
//   },
// ];

// export const AddAstrologers = () => {
//   const RemediesList = [
//     {
//       id: 1,
//       topic: "Marriage",
//     },
//     {
//       id: 2,
//       topic: "Health",
//     },
//     {
//       id: 3,
//       topic: "Career",
//     },
//     {
//       id: 4,
//       topic: "Finance",
//     },
//     {
//       id: 5,
//       topic: "Education",
//     },
//     {
//       id: 6,
//       topic: "Relationships",
//     },
//     {
//       id: 7,
//       topic: "Travel",
//     },
//     {
//       id: 8,
//       topic: "Spirituality",
//     },
//   ];

//   var classes = useStyles();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [altMobile, setAltMobile] = useState("");
//   const [currency, setcurrency] = useState("");
//   const [gender, setgender] = useState("");
//   const [password, setpassword] = useState("");
//   const [dob, setdob] = useState("");
//   const [experience, setexperience] = useState("");
//   const [language, setlanguage] = useState("");
//   const [address, setaddress] = useState("");
//   const [country, setcountry] = useState("");
//   const [state, setstate] = useState("");
//   const [city, setcity] = useState("");
//   const [youtubeLink, setyoutubeLink] = useState("");
//   const [followersValue, setfollowersValue] = useState("");
//   const [freeMinutes, setfreeMinutes] = useState("");
//   const [bankAccountNumber, setbankAccountNumber] = useState("");
//   const [accountType, setAccountType] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [accountHolderName, setaccountHolderName] = useState("");
//   const [panNumber, setpanNumber] = useState("");
//   const [adharNumber, setadharNumber] = useState("");
//   const [consultationPrice, setconsultationPrice] = useState("");
//   const [callPrice, setcallPrice] = useState("");
//   const [commissionCallPrice, setcommissionCallPrice] = useState("");
//   const [chatPrice, setchatPrice] = useState("");
//   const [commissionChatPrice, setcommissionChatPrice] = useState("");
//   const [callPriceDollar, setcallPriceDollar] = useState("");
//   const [chatPriceDollar, setchatPriceDollar] = useState("");
//   const [commissionCall, setcommissionCall] = useState("");
//   const [commissionChat, setcommissionChat] = useState("");
//   const [commissionRemark, setcommissionRemark] = useState("");
//   const [skills, setskills] = useState("");
//   const [shortBio, setshortBio] = useState("");
//   const [longBio, setlongBio] = useState("");
//   const [remedies, setRemedies] = useState([]);
//   const [working, setworking] = useState("");
//   const [Submit, setsubmit] = useState("");
//   const [Reset, setreset] = useState("");
//   const [checkedValues, setCheckedValues] = useState([]);
//   const [errors, setErrors] = useState({});

//   const handleCheckboxChange = (event) => {
//     const { value, checked } = event.target;

//     if (checked) {
//       setCheckedValues([...checkedValues, value]); // Add value to the array
//     } else {
//       const updatedValues = checkedValues.filter((item) => item !== value); // Remove value from the array
//       setCheckedValues(updatedValues);
//     }
//   };

//   const handleValidation = () => {
//     let formIsValid = true;
//     const newErrors = {};

//     // Validate name
//     if (!name) {
//       newErrors.name = "Name is required";
//       formIsValid = false;
//     }

//     // Validate email
//     if (!email) {
//       newErrors.email = "Email is required";
//       formIsValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Invalid email address";
//       formIsValid = false;
//     }

//     // Validate mobile number
//     if (!mobile) {
//       newErrors.mobile = "Mobile number is required";
//       formIsValid = false;
//     } else if (!/^[0-9]{10}$/.test(mobile)) {
//       newErrors.mobile = "Invalid mobile number";
//       formIsValid = false;
//     }

//     // Validate alternate mobile number
//     if (!altMobile) {
//       newErrors.altMobile = "Mobile number is required";
//       formIsValid = false;
//     } else if (altMobile && !/^[0-9]{10}$/.test(altMobile)) {
//       newErrors.altMobile = "Invalid alternate mobile number";
//       formIsValid = false;
//     }

//     // Validate currency
//     if (!currency) {
//       newErrors.currency = "Currency is required";
//       formIsValid = false;
//     }
//     if (!gender) {
//       newErrors.gender = "Gender is required";
//       formIsValid = false;
//     }
//     if (!password) {
//       newErrors.password = "Password is required";
//       formIsValid = false;
//     }
//     if (!dob) {
//       newErrors.dob = "Date of birth is required";
//       formIsValid = false;
//     }
//     if (!experience || experience === "-Experience in Years-") {
//       newErrors.experience = "Please select your experience in years";
//       formIsValid = false;
//     }
//     if (!language) {
//       newErrors.language = "Language is required";
//       formIsValid = false;
//     }
//     if (!address) {
//       newErrors.address = "address is required";
//       formIsValid = false;
//     }
//     if (!country || country === "-Select your Country-") {
//       newErrors.country = "Please select your country";
//       formIsValid = false;
//     }
//     if (!state || state === "-Select your State-") {
//       newErrors.state = "Please select your state";
//       formIsValid = false;
//     }
//     if (!city || city === "-Select your City-") {
//       newErrors.city = "Please select your city";
//       formIsValid = false;
//     }
//     if (!youtubeLink) {
//       newErrors.youtubeLink = "YouTubeLink of birth is required";
//       formIsValid = false;
//     }
//     if (!followersValue) {
//       newErrors.followersValue = "Invalid value for followers";
//       formIsValid = false;
//     }

//     if (!freeMinutes) {
//       newErrors.freeMinutes = "Invalid value for free minutes";
//       formIsValid = false;
//     }
//     // Assuming you want to ensure the skills field is not empty
//     if (!skills) {
//       newErrors.skills = "Skills is required";
//       formIsValid = false;
//     }
//     // Assuming you want to ensure the field is a valid numeric value
//     if (!bankAccountNumber) {
//       newErrors.bankAccountNumber = "Bank Account Number is required";
//       formIsValid = false;
//     } else if (isNaN(bankAccountNumber) || bankAccountNumber <= 0) {
//       newErrors.bankAccountNumber = "Invalid Bank Account Number";
//       formIsValid = false;
//     }
//     if (!accountType) {
//       newErrors.accountType = "Account Type is required";
//       formIsValid = false;
//     }
//     if (!ifscCode) {
//       newErrors.ifscCode = "IFSC Code is required";
//       formIsValid = false;
//     } else if (!ifscCode(ifscCode)) {
//       newErrors.ifscCode = "Invalid IFSC Code";
//       formIsValid = false;
//     }
//     if (!accountHolderName) {
//       newErrors.accountHolderName = "Holder name  is required";
//       formIsValid = false;
//     }
//     if (!panNumber) {
//       newErrors.panNumber = "Pan card number is required";
//       formIsValid = false;
//     }
//     if (!adharNumber) {
//       newErrors.adharNumber = "adhar number is required";
//       formIsValid = false;
//     }
//     if (!consultationPrice) {
//       newErrors.consultationPrice = "Consultation Price is required";
//       formIsValid = false;
//     }
//     if (!callPrice) {
//       newErrors.callPrice = " Call Price is required";
//       formIsValid = false;
//     }
//     if (!commissionCallPrice) {
//       newErrors.commissionCallPrice = " Commission Call Price is required";
//       formIsValid = false;
//     }
//     if (!chatPrice) {
//       newErrors.chatPrice = " chat Price Price is required";
//       formIsValid = false;
//     }
//     if (!commissionChatPrice) {
//       newErrors.commissionChatPrice =
//         "  commission chat Price Price is required";
//       formIsValid = false;
//     }
//     if (!callPrice) {
//       newErrors.callPrice = "  call Price  is required";
//       formIsValid = false;
//     }
//     if (!chatPriceDollar) {
//       newErrors.chatPriceDollar = "  chat Price Dollar is required";
//       formIsValid = false;
//     }
//     if (!callPriceDollar) {
//       newErrors.callPriceDollar = "  Call Price Dollar is required";
//       formIsValid = false;
//     }
//     if (!commissionCallPrice) {
//       newErrors.commissionCallPrice = " commission Call Price  is required";
//       formIsValid = false;
//     }
//     if (!commissionRemark) {
//       newErrors.commissionRemark = " commission Remark  is required";
//       formIsValid = false;
//     }
//     if (!commissionCall) {
//       newErrors.commissionCall = " commission call Dollar  is required";
//       formIsValid = false;
//     }
//     if (!commissionChat) {
//       newErrors.commissionChat = " commission Chat Dollar  is required";
//       formIsValid = false;
//     }
//     if (!shortBio) {
//       newErrors.shortBio = " short bio  is required";
//       formIsValid = false;
//     }
//     if (!longBio) {
//       newErrors.longBio = " long bio  is required";
//       formIsValid = false;
//     }

//     setErrors(newErrors);
//     return formIsValid;
//   };
//   const handleSubmit = () => {
//     if (handleValidation()) {
//       // Form is valid, proceed with submission logic

//       // Example: Make an API call, update database, etc.

//       console.log("Form submitted successfully!");
//     } else {
//       // Form is not valid, display an error or take appropriate action
//       console.log("Form validation failed. Please check the errors.");
//     }
//   };

//   const handleReset = () => {
//     // Reset form fields
//     setName("");
//     setEmail("");
//     setMobile("");
//     // Reset other state variables as needed

//     // Clear validation errors
//     setErrors({});

//     console.log("Form reset successfully!");
//   };
//   const [profilePhoto, setprofilePhoto] = useState({
//     file: logo_icon,
//     bytes: "",
//   });
//   const [bankProof, setbankProof] = useState({
//     file: logo_icon,
//     bytes: "",
//   });
//   const [idProof, setidProof] = useState({
//     file: logo_icon,
//     bytes: "",
//   });

//   const handleProfile = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setprofilePhoto({
//         file: URL.createObjectURL(e.target.files[0]),
//         bytes: e.target.files[0],
//       });
//       // handleError("profilePhoto", null);
//     }
//   };
//   const handlebankProof = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setbankProof({
//         file: URL.createObjectURL(e.target.files[0]),
//         bytes: e.target.files[0],
//       });
//     }
//   };
//   const handleidProof = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setidProof({
//         file: URL.createObjectURL(e.target.files[0]),
//         bytes: e.target.files[0],
//       });
//     }
//   };
//   const Offers = [
//     {
//       id: 1,
//       topic: "Best Choice",
//     },
//     {
//       id: 2,
//       topic: "Special offers",
//     },
//     {
//       id: 3,
//       topic: "Today's Deal",
//     },
//     {
//       id: 4,
//       topic: "New",
//     },
//   ];

//   const mainExpertise = [
//     {
//       id: 1,
//       topic: "Vedic Astrology",
//     },
//     {
//       id: 2,
//       topic: "Tarot Card Reading",
//     },
//     {
//       id: 3,
//       topic: "Numerology",
//     },
//     {
//       id: 4,
//       topic: "Western Astrology",
//     },
//     {
//       id: 5,
//       topic: "Palmistry",
//     },
//     {
//       id: 6,
//       topic: "Astrological Remedies",
//     },
//     {
//       id: 7,
//       topic: "Horoscope Matching",
//     },
//     {
//       id: 8,
//       topic: "Vastu Shastra",
//     },
//     {
//       id: 9,
//       topic: "Psychic Reading",
//     },
//     {
//       id: 10,
//       topic: "Gemstone Consultation",
//     },
//     {
//       id: 11,
//       topic: "Feng Shui",
//     },
//     {
//       id: 12,
//       topic: "Aura Reading",
//     },
//     {
//       id: 13,
//       topic: "Kundli Analysis",
//     },
//     {
//       id: 14,
//       topic: "Astrological Counseling",
//     },
//     {
//       id: 15,
//       topic: "Chakra Balancing",
//     },
//     {
//       id: 16,
//       topic: "Dream Interpretation",
//     },
//     {
//       id: 17,
//       topic: "Astrological Predictions",
//     },
//     {
//       id: 18,
//       topic: "Astrology for Career",
//     },
//     {
//       id: 19,
//       topic: "Astrology for Relationships",
//     },
//   ];

//   const expertise = [
//     {
//       id: 1,
//       topic: "Love Experties",
//     },
//     {
//       id: 2,
//       topic: "Career Experties",
//     },
//     {
//       id: 3,
//       topic: "Gemology",
//     },
//     {
//       id: 4,
//       topic: "Prashan Kundli",
//     },
//     {
//       id: 5,
//       topic: "Devil",
//     },
//     {
//       id: 6,
//       topic: "Palnistry",
//     },
//     {
//       id: 7,
//       topic: "Raman Shatra",
//     },
//     {
//       id: 8,
//       topic: "Vastu Shastra",
//     },
//     {
//       id: 9,
//       topic: "Black magic",
//     },
//     {
//       id: 10,
//       topic: "Face Reading",
//     },
//   ];

//   return (
//     <div className={classes.container}>
//       <div className={classes.box}>
//         <Grid container spacing={2}>
//           <Grid item lg={12} sm={12} md={12} xs={12}>
//             <div className={classes.headingContainer}>
//               <div className={classes.heading}>Add Astrologer</div>
//             </div>
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="Enter Name"
//               value={name}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setName(e.target.value)}
//               helperText={errors.name}
//               error={!!errors.name}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="Enter Email"
//               value={email}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setEmail(e.target.value)}
//               helperText={errors.email}
//               error={!!errors.email}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="Enter Mobile Number"
//               value={mobile}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setMobile(e.target.value)}
//               helperText={errors.mobile}
//               error={!!errors.mobile}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="Alternate Mobile Number"
//               value={altMobile}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setAltMobile(e.target.value)}
//               helperText={errors.altMobile}
//               error={!!errors.altMobile}
//             />
//           </Grid>
//           <Grid item lg={4} md={12} sm={12} xs={12}>
//             <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label">Currency</InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 label="currency"
//                 value={currency}
//                 onChange={(e) => setcurrency(e.target.value)}
//                 error={!!errors.currency}
//               >
//                 <MenuItem disabled value={null}>
//                   -Select Currency-
//                 </MenuItem>
//                 <MenuItem value="INR">INR</MenuItem>
//                 <MenuItem value="USD">USD</MenuItem>
//               </Select>
//               {errors.currency && (
//                 <div className={classes.errorstyles}>{errors.currency}</div>
//               )}
//             </FormControl>
//           </Grid>
//           <Grid item lg={4} md={12} sm={12} xs={12}>
//             <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label">Gender</InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 label="gender"
//                 value={gender}
//                 onChange={(e) => setgender(e.target.value)}
//                 error={!!errors.gender} // Highlight the field if there's an error
//               >
//                 <MenuItem disabled value={null}>
//                   -Select Gender-
//                 </MenuItem>
//                 <MenuItem value="Male">MALE</MenuItem>
//                 <MenuItem value="Female">Female</MenuItem>
//                 <MenuItem value="Other">Other</MenuItem>
//               </Select>
//               {errors.gender && (
//                 <div className={classes.errorstyles}>{errors.gender}</div>
//               )}
//             </FormControl>
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="Password"
//               type="password"
//               value={password}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setpassword(e.target.value)}
//               helperText={errors.password}
//               error={!!errors.password}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               type="date"
//               value={dob}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setdob(e.target.value)}
//               helperText={errors.dob}
//               error={!!errors.dob}
//             />
//           </Grid>
//           <Grid item lg={4} md={12} sm={12} xs={12}>
//             <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label">
//                 Experience in Years
//               </InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 label="Experience in years"
//                 value={experience}
//                 onChange={(e) => setexperience(e.target.value)}
//                 error={!!errors.experience} // Highlight the field if there's an error
//               >
//                 <MenuItem disabled value={null}>
//                   -Experience in Years-
//                 </MenuItem>
//                 <MenuItem value="1">1</MenuItem>
//                 <MenuItem value="2">2</MenuItem>
//                 <MenuItem value="3">3</MenuItem>
//                 <MenuItem value="4">4</MenuItem>
//                 <MenuItem value="5">5</MenuItem>
//                 <MenuItem value="6">6</MenuItem>
//                 <MenuItem value="7">7</MenuItem>
//                 <MenuItem value="8">8</MenuItem>
//                 <MenuItem value="9">9</MenuItem>
//                 <MenuItem value="10">10</MenuItem>
//               </Select>
//               {errors.experience && (
//                 <div className={classes.errorstyles}>{errors.experience}</div>
//               )}
//             </FormControl>
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="Language"
//               value={language}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setlanguage(e.target.value)}
//               helperText={errors.language}
//               error={!!errors.language} // Highlight the field if there's an error
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="Address"
//               value={address}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setaddress(e.target.value)}
//               helperText={errors.language}
//               error={!!errors.language} // Highlight the field if there's an error
//             />
//           </Grid>
//           <Grid item lg={4} md={12} sm={12} xs={12}>
//             <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label">Country</InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 label="Country"
//                 value={country}
//                 onChange={(e) => setcountry(e.target.value)}
//                 error={!!errors.country} // Highlight the field if there's an error
//               >
//                 <MenuItem disabled value={null}>
//                   -Select your Country-
//                 </MenuItem>
//                 <MenuItem value="India">India</MenuItem>
//                 <MenuItem value="Brazil">Brazil</MenuItem>
//                 {/* Add more countries as needed */}
//               </Select>
//               {errors.country && (
//                 <div className={classes.errorstyles}>{errors.country}</div>
//               )}
//             </FormControl>
//           </Grid>
//           <Grid item lg={4} md={12} sm={12} xs={12}>
//             <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label">State</InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 label="State"
//                 value={state}
//                 onChange={(e) => setstate(e.target.value)}
//                 error={!!errors.state} // Highlight the field if there's an error
//               >
//                 <MenuItem disabled value={null}>
//                   -Select your State-
//                 </MenuItem>
//                 <MenuItem value="jk">Jammu & Kashmir</MenuItem>
//                 <MenuItem value="up">Uttar Pradesh</MenuItem>
//                 <MenuItem value="uk">UttraKhand</MenuItem>
//               </Select>
//               {errors.state && (
//                 <div className={classes.errorstyles}>{errors.state}</div>
//               )}
//             </FormControl>
//           </Grid>
//           <Grid item lg={4} md={12} sm={12} xs={12}>
//             <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label">City</InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 label="City"
//                 value={city}
//                 onChange={(e) => setcity(e.target.value)}
//                 error={!!errors.city} // Highlight the field if there's an error
//               >
//                 <MenuItem disabled value={null}>
//                   -Select your City-
//                 </MenuItem>
//                 <MenuItem value="bijnor">Bijnor</MenuItem>
//                 <MenuItem value="meerut">Meerut</MenuItem>
//                 <MenuItem value="noida">Noida</MenuItem>
//                 {/* Add more cities as needed */}
//               </Select>
//               {errors.city && (
//                 <div className={classes.errorstyles}>{errors.city}</div>
//               )}
//             </FormControl>
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="Youtube Link"
//               value={youtubeLink}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setyoutubeLink(e.target.value)}
//               helperText={errors.youtubeLink}
//               error={!!errors.youtubeLink}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               type="number"
//               label="Followers Value"
//               value={followersValue}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setfollowersValue(e.target.value)}
//               helperText={errors.followersValue}
//               error={!!errors.followersValue} // Highlight the field if there's an error
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               type="number"
//               label="Free Minutes"
//               value={freeMinutes}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setfreeMinutes(e.target.value)}
//               helperText={errors.freeMinutes}
//               error={!!errors.freeMinutes} // Highlight the field if there's an error
//             />
//           </Grid>

//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="skills"
//               value={skills}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setskills(e.target.value)}
//               helperText={errors.skills}
//               error={!!errors.skills}
//             />
//           </Grid>

//           <Grid
//             item
//             lg={3}
//             sm={3}
//             md={3}
//             xs={3}
//             className={classes.uploadContainer}
//           >
//             <Grid
//               component="label"
//               onClick={handleProfile}
//               className={classes.uploadImageButton}
//             >
//               Upload Profile Photo
//               <input
//                 onChange={handleProfile}
//                 hidden
//                 accept="image/*"
//                 type="file"
//               />
//             </Grid>
//             <div className={classes.errorstyles}>{error.profilePhoto}</div>
//           </Grid>
//           <Grid item lg={1} sm={1} md={1} xs={1}>
//             <Avatar
//               color={Colors.primaryDark}
//               src={profilePhoto.file}
//               style={{ width: 56, height: 56 }}
//             />
//           </Grid>
//           <Grid
//             item
//             lg={3}
//             sm={3}
//             md={3}
//             xs={3}
//             className={classes.uploadContainer}
//           >
//             <Grid
//               component="label"
//               onClick={handlebankProof}
//               className={classes.uploadImageButton}
//             >
//               Upload Bank Proof
//               <input
//                 onChange={handlebankProof}
//                 hidden
//                 accept="image/*"
//                 type="file"
//               />
//             </Grid>
//             <div className={classes.errorstyles}>{error.bankProof}</div>
//           </Grid>
//           <Grid item lg={1} sm={1} md={1} xs={1}>
//             <Avatar
//               color={Colors.primaryDark}
//               src={bankProof.file}
//               style={{ width: 56, height: 56 }}
//             />
//           </Grid>
//           <Grid
//             item
//             lg={3}
//             sm={3}
//             md={3}
//             xs={3}
//             className={classes.uploadContainer}
//           >
//             <Grid
//               component="label"
//               onClick={handleidProof}
//               className={classes.uploadImageButton}
//             >
//               Upload Id Proof
//               <input
//                 onChange={handleidProof}
//                 hidden
//                 accept="image/*"
//                 type="file"
//               />
//             </Grid>
//             <div className={classes.errorstyles}>{error.idProof}</div>
//           </Grid>
//           <Grid item lg={1} sm={1} md={1} xs={1}>
//             <Avatar
//               color={Colors.primaryDark}
//               src={idProof.file}
//               style={{ width: 56, height: 56 }}
//             />
//           </Grid>

//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               type="number"
//               label="Bank Account Number"
//               value={bankAccountNumber}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setbankAccountNumber(e.target.value)}
//               helperText={errors.bankAccountNumber}
//               error={!!errors.bankAccountNumber} // Highlight the field if there's an error
//             />
//           </Grid>
//           <Grid item lg={4} md={12} sm={12} xs={12}>
//             <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label">
//                 Account Type
//               </InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 label="Account Type"
//                 value={accountType}
//                 onChange={(e) => setAccountType(e.target.value)}
//                 helperText={errors.accountType}
//                 error={!!errors.accountType} // Highlight the field if there's an error
//               >
//                 <div className={classes.errorstyles}>{errors.accountType}</div>
//                 <MenuItem disabled value={null}>
//                   -Select Account type-
//                 </MenuItem>
//                 <MenuItem value="saving">Saving</MenuItem>
//                 <MenuItem value="current">Current</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="Enter IFSC Code"
//               value={ifscCode}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setIfscCode(e.target.value)}
//               helperText={errors.ifscCode}
//               error={!!errors.ifscCode} // Highlight the field if there's an error
//             />
//           </Grid>

//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="Account Holder Name"
//               value={accountHolderName}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setaccountHolderName(e.target.value)}
//               helperText={errors.accountHolderName}
//               error={!!errors.accountHolderName}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               type="number"
//               label="PAN card Number"
//               value={panNumber}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setpanNumber(e.target.value)}
//               helperText={errors.panNumber}
//               error={!!errors.panNumber}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               type="number"
//               label="Adhar card Number"
//               value={adharNumber}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setadharNumber(e.target.value)}
//               helperText={errors.adharNumber}
//               error={!!errors.adharNumber}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="Consultation Price"
//               value={consultationPrice}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setconsultationPrice(e.target.value)}
//               helperText={errors.consultationPrice}
//               error={!!errors.consultationPrice}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="Call Price (Per/Min)"
//               value={callPrice}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setcallPrice(e.target.value)}
//               helperText={errors.callPrice}
//               error={!!errors.callPrice}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label=" Commission Call Price"
//               value={commissionCallPrice}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setcommissionCall(e.target.value)}
//               helperText={errors.commissionCallPrice}
//               error={!!errors.commissionCallPrice}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label=" Chat Price (Per/Min)"
//               value={chatPrice}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setchatPrice(e.target.value)}
//               helperText={errors.chatPrice}
//               error={!!errors.chatPrice}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label=" Commission Chat Price"
//               value={commissionChatPrice}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setcommissionChatPrice(e.target.value)}
//               helperText={errors.commissionChatPrice}
//               error={!!errors.commissionChatPrice}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="Call Price (Dollar)"
//               value={callPriceDollar}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setcallPriceDollar(e.target.value)}
//               helperText={errors.callPriceDollar}
//               error={!!errors.callPriceDollar}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="Chat Price (Dollar)"
//               value={chatPriceDollar}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setchatPriceDollar(e.target.value)}
//               helperText={errors.chatPriceDollar}
//               error={!!errors.chatPriceDollar}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="Commission Call Price (Dollar)"
//               value={commissionCall}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setcommissionCall(e.target.value)}
//               helperText={errors.commissionCall}
//               error={!!errors.commissionCall}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="Commission Chat Price (Dollar)"
//               value={commissionChat}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setcommissionChat(e.target.value)}
//               helperText={errors.commissionChat}
//               error={!!errors.commissionChat}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}>
//             <TextField
//               label="Commission Remark"
//               value={commissionRemark}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setcommissionRemark(e.target.value)}
//               helperText={errors.commissionRemark}
//               error={!!errors.commissionRemark}
//             />
//           </Grid>
//           <Grid item lg={4} sm={12} md={12} xs={12}></Grid>
//           <Grid item lg={6} sm={12} md={12} xs={12}>
//             <TextField
//               id="outlined-multiline-static"
//               multiline
//               rows={4}
//               label="Short Bio(max-150)"
//               value={shortBio}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setshortBio(e.target.value)}
//               helperText={errors.shortBio}
//               error={!!errors.shortBio}
//             />
//           </Grid>
//           <Grid item lg={6} sm={12} md={12} xs={12}>
//             <TextField
//               id="outlined-multiline-static"
//               multiline
//               rows={4}
//               label="Long Bio"
//               value={longBio}
//               variant="outlined"
//               fullWidth
//               onChange={(e) => setlongBio(e.target.value)}
//               helperText={errors.longBio}
//               error={!!errors.longBio}
//             />
//           </Grid>
//           <Grid item lg={6} sm={12} md={12} xs={12}>
//             <FormControl component="fieldset">
//               <FormLabel component="legend">Remedies</FormLabel>
//               <FormGroup aria-label="position" row>
//                 {RemediesList.map((item) => {
//                   return (
//                     <div key={item.topic} className={classes.chips}>
//                       <FormControlLabel
//                         // onChange={() => handleRemedies(item)}
//                         control={
//                           <Checkbox
//                             checked={remedies.indexOf(item.topic) !== -1}
//                           />
//                         }
//                         label={item.topic}
//                         labelPlacement="end"
//                       />
//                     </div>
//                   );
//                 })}
//               </FormGroup>
//             </FormControl>
//           </Grid>
//           <Grid item lg={6} sm={12} md={12} xs={12}>
//             <FormControl component="fieldset">
//               <FormLabel component="legend">Offers-Category</FormLabel>
//               <FormGroup aria-label="position" row>
//                 {Offers.map((item) => {
//                   return (
//                     <div className={classes.chips}>
//                       <FormControlLabel
//                         value={item.topic}
//                         control={<Checkbox />}
//                         label={item.topic}
//                         labelPlacement="end"
//                       />
//                     </div>
//                   );
//                 })}
//               </FormGroup>
//             </FormControl>
//           </Grid>
//           <Grid item lg={6} sm={12} md={12} xs={12}>
//             <FormControl component="fieldset">
//               <FormLabel component="legend"> Main Experties</FormLabel>
//               <FormGroup aria-label="position" row>
//                 {mainExpertise.map((item) => {
//                   return (
//                     <div className={classes.chips}>
//                       <FormControlLabel
//                         value={item.topic}
//                         control={<Checkbox />}
//                         label={item.topic}
//                         labelPlacement="end"
//                       />
//                     </div>
//                   );
//                 })}
//               </FormGroup>
//             </FormControl>
//           </Grid>
//           <Grid item lg={6} sm={12} md={12} xs={12}>
//             <FormControl component="fieldset">
//               <FormLabel component="legend">Experties</FormLabel>
//               <FormGroup aria-label="position" row>
//                 {expertise.map((item) => {
//                   return (
//                     <div className={classes.chips}>
//                       <FormControlLabel
//                         value={item.topic}
//                         control={<Checkbox />}
//                         label={item.topic}
//                         labelPlacement="end"
//                       />
//                     </div>
//                   );
//                 })}
//               </FormGroup>
//             </FormControl>
//           </Grid>
//           <Grid item lg={12} sm={12} md={12} xs={12}>
//             <FormControl component="fieldset">
//               <FormLabel component="legend">
//                 Are you working on any other online portal?
//               </FormLabel>
//               <RadioGroup
//                 row
//                 aria-label="position"
//                 name="position"
//                 defaultValue={false}
//                 onChange={(e) => setworking(e.target.value)}
//               >
//                 <FormControlLabel
//                   value={false}
//                   control={<Radio color="primary" />}
//                   label="No"
//                 />
//                 <FormControlLabel
//                   value={true}
//                   control={<Radio color="primary" />}
//                   label="Yes"
//                 />
//               </RadioGroup>
//             </FormControl>
//           </Grid>
//           <Grid item lg={6} sm={6} md={6} xs={6}>
//             <div onClick={handleSubmit} className={classes.submitbutton}>
//               Submit
//             </div>
//           </Grid>
//           <Grid item lg={6} sm={6} md={6} xs={6}>
//             <div onClick={handleReset} className={classes.denyButton}>
//               Reset
//             </div>
//           </Grid>
//         </Grid>
//       </div>
//     </div>
//   );
// };

// export default AddAstrologers;
