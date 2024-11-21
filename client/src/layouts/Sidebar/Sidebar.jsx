// layouts/Sidebar/Sidebar.jsx

import { NavLink } from "react-router-dom";
import {FaHome,} from "react-icons/fa";
import { MdVideoSettings } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { BiAbacus, BiUser, BiUserPlus } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo_icon from '../../assets/images/logo_icon.png'
import SidebarMenu from "./SidebarMenu";
import "./sideBar.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AiOutlineBug } from "react-icons/ai";
import { Redeem } from "@mui/icons-material";
import { connect } from "react-redux";
import { FaRegNewspaper } from "react-icons/fa6";
import { SiPlaycanvas } from "react-icons/si";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdPersonPin } from "react-icons/md";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },

  {
    path: "/displayUser",
    name: "User",
    icon: <BiUser />,
   
  },
  {
    path: "/displayPlan",
    name: " List of Plans",
    icon: <BiAbacus />,
   
  },

  {
    path: "/displaySubAdmin",
    name: " Sub Admin",
    icon: <MdPersonPin />,
   
  },

  {
    path: "/tutorials",
    name: "Resources",
    icon: <MdVideoSettings />,
    subRoutes: [
      {
        path: "/vcategories",
        name: "Basic Resources",
        icon: <MdVideoSettings />
      },
      // {
      //   path: "/vsubCategories",
      //   name: "Sub Categories",
      //   icon: <MdVideoSettings />
      // },
      {
        path: "/videos",
        name: "All Resources",
        icon: <MdVideoSettings />
      },
    ],
  },
  {
    path: "/icons",
    name: "Icons ",
    icon: <AiOutlineBug />,
    subRoutes: [
      {
        path: "/bulkupload  ",
        name: "Bulk Upload",
        icon: <AiOutlineBug />
      },
      {
        path: "/categories",
        name: "Categories",
        icon: <AiOutlineBug />
      },
      {
        path: "/subCategories",
        name: "Sub Categories",
        icon: <AiOutlineBug />
      },
      {
        path: "/childCategories",
        name: "Child Categories",
        icon: <AiOutlineBug />
      },
      {
        path: "/displyIcons",
        name: "Display Icons",
        icon: <AiOutlineBug />
      },
      
    ],
  },
  {
    path: "/payment",
    name: "Payment History",
    icon: <FaMoneyCheckAlt />,
    subRoutes: [
      {
        path: "/paymenthistory",
        name: "Paymenthistory",
        icon: <FaMoneyCheckAlt />
      },     
    ],
  },

  {
    path: "/templates",
    name: "Templates",
    icon: <SiPlaycanvas />,
    subRoutes: [
      {
        path: "/userTemplate",
        name: "User's Templates",
        icon: <SiPlaycanvas />
      },
      {
        path: "/adminTemplates",
        name: "Admin Templates",
        icon: <SiPlaycanvas />
      },
    ],
  },

  {
    path: "/termsAndConditions",
    name: "Terms & Conditions",
    icon: <FaRegNewspaper />,
  },
  {
    path: "/privacyPolicies",
    name: "Privacy Policies",
    icon: <FaRegNewspaper />,
  },
  {
    path: "/aboutUs",
    name: " About Us",
    icon: <FaRegNewspaper />,
  },

]
const inputAnimation = {
  hidden: {
    width: 0,
    padding: 0,
    transition: {
      duration: 0.2,
    },
  },
  show: {
    width: "140px",
    padding: "5px 15px",
    transition: {
      duration: 0.2,
    },
  },
};

const showAnimation = {
  hidden: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  show: {
    opacity: 1,
    width: "auto",
    transition: {
      duration: 0.5,
    },
  },
};

const SideBar = ({ children, isSidebarOpen }) => {
  const dispatch = useDispatch();
  const [hiddenSidebarWidth, setHiddenSidebarWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) setHiddenSidebarWidth(45);
      else setHiddenSidebarWidth(0);
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  
  return (
    <>
      <motion.div
        animate={{
          width: isSidebarOpen ? "250px" : `${hiddenSidebarWidth}px`,
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        // className={`sidebar`}
        className={`sidebar`}
      >
        {isSidebarOpen ? (<div className="top_section">
         Biovisuals
        </div>) :
          (<div className="top_section">
            <img src={logo_icon} style={{ width: 30, height: 30 }} />
          </div>)
        }
        <section className="routes">
          {routes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  route={route}
                  key={index}
                  showAnimation={showAnimation}
                />
              );
            }

            return (
              <div key={index} className="side_Bar">
                <NavLink
                  to={route.path}
                  className="link"
                  activeclassname="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              </div>
            );
          })}
        </section>
      </motion.div>
    </>
  );
};

const mapStateToProps = state =>({
  isSidebarOpen: state.dashboard.isSidebarOpen //redux
})

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

