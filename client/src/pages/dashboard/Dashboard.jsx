// dashboard/Dashboard.jsx

import React, { useEffect, useState } from "react";
import "../dashboard/dashboard.css";
import { useStyles } from "../dashboard/dashboardStyles";
import Chart from "react-apexcharts";
import { Grid, TextField } from "@mui/material";
import { base_url } from "../../utils/Constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import Loading from "../../Components/loading/loading";
import { connect } from "react-redux";
import Layout from "../../layouts/Layout";


const Dashboard = () => {
  console.log("dashboard page")
  const dispatch = useDispatch();
  var classes = useStyles();
  const [categoryCount, setCategoryCount] = useState(0); 
  const [planCount, setPlanCount] = useState(0)
  const [userCount, setUserCount] = useState(0)
  const [chartData, setChartData] = useState({
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ["A", "B", "C", "D", "E"],
  });
  const [vedioCount, setVedioCount] = useState(0)

  const [data, setData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  const getCategoryData = async () => {
    try {
      const response = await axios.get(`${base_url}api/admin/getCategories`);
      if (response.data.status === true) {
        const categories = response.data.result;
        const count = categories.length; // Count the number of categories
        setCategoryCount(count); // Update the state with the count
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getVedioData = async () => {
    try {
      const response = await axios.get(`${base_url}api/admin/getVideo`);
      if (response.data.status === true) {
        const vedio = response.data.result;
        const count = vedio.length; // Count the number of vedio
        setVedioCount(count); // Update the state with the count
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log("vedioCount", vedioCount)

  const getPlanData = async () => {
    try {
      // Make a GET request to fetch the plan data
      const response = await axios.get(`${base_url}api/admin/getAllPlan`);
      if (response.data.status === true) {
        // Extract the plan data from the response
        const plans = response.data.plan;
        // Calculate the total number of plans
        const count = plans.length;
        // Update the categoryCount state variable with the total count of plans
        setPlanCount(count);
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUserData = async () => { // Function to fetch user data
    try {
      const response = await axios.get(`${base_url}api/admin/userManagement`);
      if (response.data.status === true) {
        const user = response.data.result;
        console.log("users", user)
        const count = user.length;
        setUserCount(count); // Update the userCount state variable with the total count of users
        console.log("count", count)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategoryData()
    getVedioData()
    getPlanData()
    getUserData()
    // Dispatch an action to set isOpen to true
    dispatch({
      type: "setIsOpen",
      payload: true,
    });
  }, []);

  return (
    <div className={classes.dashboard_container}>
     
      <div className={classes.dashboard_inner_container}>
        <Grid container spacing={2}>
          <Grid item lg={3} sm={12} md={12} xs={12}>
            <div className={classes.dashboard_card}>
              <div className="donut" style={{ display:"flex", justifyContent: 'space-between',flexDirection: 'row', width:"100%",}}>
                <div >
                  <h1 style={{ paddingTop: "10px" }}>{categoryCount}</h1>
                  <h4>All Categories </h4>
                </div>
                <img
                  src={require("../../assets/images/categories.png")}
                  alt="zodiac"
                  style={{ height: "4rem", width: "4rem" }}
                />
              </div>
            </div>
          </Grid>
          <Grid item lg={3} sm={12} md={12} xs={12}>
            <div className={classes.dashboard_card}>
              <div className="donut" style={{ display:"flex", justifyContent: 'space-between',flexDirection: 'row', width:"100%",}}>
                <div>
                  <h1 style={{ paddingTop: "10px" }}>{vedioCount}</h1>
                  <h4>Our Tutorials</h4>
                </div>
                <img
                  src={require("../../assets/images/training-course.png")}
                  alt="users"
                  style={{ height: "4rem", width: "4rem" }}
                />
              </div>
            </div>
          </Grid>
          <Grid item lg={3} sm={12} md={12} xs={12}>
            <div className={classes.dashboard_card}>
              <div className="donut" style={{ display:"flex", justifyContent: 'space-between',flexDirection: 'row', width:"100%",}}>
                <div>
                  <h1 style={{ paddingTop: "10px" }}>{planCount}</h1>
                  <h4> Plans</h4>
                </div>

                <img
                  src={require("../../assets/images/plans.png")}
                  alt="users"
                  style={{ height: "4rem", width: "4rem" }}
                />
              </div>
            </div>
          </Grid>
          <Grid item lg={3} sm={12} md={12} xs={12}>
            <div className={classes.dashboard_card}>
              <div className="donut" style={{ display:"flex", justifyContent: 'space-between',flexDirection: 'row', width:"100%",}}>
                <div>              
                    <h1 style={{ paddingTop: "10px" }}>{userCount}</h1>
                    <h4> All Users</h4>
                </div>

                <img
                  src={require("../../assets/images/profile.png")}
                  alt="users"
                  style={{ height: "4rem", width: "4rem" }}
                />
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <div className={classes.graph_card}>
              <div className="donut">
                <Chart
                  options={chartData.options}
                  series={chartData.series}
                  type="donut"
                  width="330"
                />
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <div className={classes.graph_card}>
              <div className="app">
                <div className="row">
                  <div className="mixed-chart">
                    <Chart
                      options={data.options}
                      series={data.series}
                      type="bar"
                      width="330"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
    
  );
}



const mapStateToProps = (state) => ({
  dashboardData: state.dashboard.dashboardData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

// export default Dashboard