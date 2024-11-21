// login page here
import React, { useState } from "react";
import { useStyles } from '../../assets/styles.js'
import { Avatar, Grid, IconButton, TextField, Button } from "@mui/material";
import Swal from "sweetalert2"
import logo_icon from '../../assets/images/logo_icon.png'
import { Colors } from "../../assets/styles.js";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import { useDispatch, useSelector } from "react-redux";
import * as AuthAction from "../../redux/Actions/authAction";

const Login = () => {
    const dispatch = useDispatch();
    const classes = useStyles()
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate()
    const isLoading = useSelector(state => state.login.isLoading);
    const error = useSelector(state => state.login.error);

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const validation = () => {
        var valid = true
        if (loginData.username.length === 0) {
            valid = false
        }
        if (loginData.password.length === 0) {
            valid = false
        }
        return valid
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        if (validation()) {

           
            const success = await dispatch(AuthAction.onLogin({
                username: loginData.username,
                password: loginData.password,
                onComplete: () => navigate("/")
    
            }));
            if(success) {
                Swal.fire({
                    icon: "success",
                    title: "Login Successful1234",
                    showConfirmButton: false,
                    timer: 2000,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Invalid username or password",
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Validation Error",
                text: "Please enter username and password",
            });
        }
    };
       
    return (
        <div className={classes.loginContainer}>
            <div className={classes.loginBox}>
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <div className={classes.loginheadingContainer}  >
                            <img src={logo_icon} style={{ width: '5rem', height: '5rem' }} />
                            <div className={classes.login} >
                                Login to
                            </div>
                            <div className={classes.loginheading} >
                                Biovisual Basics
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div class="label-float">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={loginData.username}
                                    name="username"
                                    onChange={handleChange}
                                />
                                <label>UserName</label>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>

                            <div class="label-float">
                                <input
                                    type="password"
                                    placeholder=""
                                    value={loginData.password}
                                    onChange={handleChange}
                                    name="password"
                                />
                                <label>Password</label>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <div class='loginButton' onClick={handleLogin}>
                            Login
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
export default Login;


