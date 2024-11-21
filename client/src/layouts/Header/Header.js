// layouts/Header/Header.jsx

import React, { useEffect, useState } from "react";
import "./header.css";
import { FaBars, FaUser } from "react-icons/fa";
import { NavLink, Navigate,} from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";

import { connect } from "react-redux";
import logo_icon from '../../assets/images/logo_icon.png'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";
import * as Actions from '../../redux/Actions/dashboardAction'

const Header = ({ dispatch, isSidebarOpen}) => {

  const [userToggle, setUserToggle] = useState(false);
  const handleUserToggle = () => setUserToggle(!userToggle);
  const navigate = useNavigate();
  const [data, setData]= useState()
 
  useEffect(() => {
    try {
      const userData = localStorage.getItem("token");
      setData(userData)
    
      if(!userData) {
          navigate("/login");
        }
      }
      catch(e)
    {
      console.log(e)
    }
  }, [data, userToggle]);

  const toggleSidebar = () => {
    dispatch(Actions.setIsSidebarOpne(!isSidebarOpen));
  };

  const logout = () => {
    Swal.fire({
      title: `Are you sure to Logout`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.grayDark,
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          setData("");
          localStorage.clear();
        } catch (e) {
          console.log(e);
        }
      }
    });
    // try {
    //   localStorage.clear();
    //   setUserToggle(false)
    // } catch (e) {
    //   console.log(e);
    // }
  };

  useEffect(() => {
    let previousWidth = window.innerWidth;
    console.log("Screen Width ::: ", previousWidth)
    const handleResize = () => {
      if (window.innerWidth > 900) {
        console.log('Window is getting larger');
        dispatch(Actions.setIsSidebarOpne(true));
      } else if (window.innerWidth < 900) {
        dispatch(Actions.setIsSidebarOpne(false));
        console.log('Window is getting smaller');
      }
    };

    // Set up event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
   
  return (
    <>
      <header className="header">
        <div className="header_wrapper">
          <div> 
            <div className="bars">
              <FaBars onClick={toggleSidebar} />
            </div>
          </div>

          <div className="header_icon_name">
            <img src={logo_icon} style={{ width: 40, height: 40 }} />
            <h3 style={{ marginLeft: 10, }}>Biovisuals </h3>
          </div>
          <div>
            <FaUser onClick={handleUserToggle} className="user_icon" />
            {userToggle && (
              <ul className="user_wrapper">
                <li className="user_list_style">
                  <NavLink to="/password/change">
                    <FaUser className="user_list_icon" /> Change Password
                  </NavLink>
                </li>
                <hr className="hr" />
                <li className="user_list_style">
                  <NavLink to="" onClick={logout}>
                    <BiLogOutCircle className="user_list_icon" /> Log Out
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>
    </>
  );
};


const mapStateToProps = state => ({
  isSidebarOpen: state.dashboard.isSidebarOpen
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Header);

