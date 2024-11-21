// all Route page(app.js)
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";

// import AddSubSkills from "./pages/subSkills/AddSubSkills";
// import DisplaySubSkills from "./pages/subSkills/DisplaySubSkills";
import Login from './pages/login/Login';
import AddRechargePlans from "./pages/Recharge/AddRechargePlans";
import DisplayRechargePlans from './pages/Recharge/DisplayRechargePlans';
import DisplayFirstRechargeOffer from './pages/Recharge/DisplayFirstRechargeOffer';
import AddFirstRechargeOffer from "./pages/Recharge/AddFirstRechargeOffer";
import DisplayUser from "./pages/user/DisplayUser";
import AddUser from "./pages/user/AddUser";
import DisplayPlan from "./pages/plans/DisplayPlans";
import AddPlan from "./pages/plans/AddPlans";
import DisplayCategories from "./pages/icons/DisplayCategories";
import AddCategories from "./pages/icons/AddCategories";
import DisplaySubCategories from "./pages/icons/DisplaySubCategories";
import AddSubCategories from "./pages/icons/AddSubCategories";
import DisplayChildCategories from "./pages/icons/DisplayChildCategories";
import AddChildCategories from "./pages/icons/AddChildCategories";
import EditUser from "./pages/user/EditUser";
import DisplayIcons from "./pages/icons/DisplayIcons";
import AddIcons from "./pages/icons/AddIcons";
import DisplayVCategories from "./pages/tutorials/DisplayVCategories";
import AddVCategories from "./pages/tutorials/AddVCategories";
import DisplayVSubCategories from "./pages/tutorials/DisplayVSubCategories";
import AddVSubCategories from "./pages/tutorials/AddVSubCategories";
import DisplayVideos from "./pages/tutorials/DisplayAllvideos";
import AddVideos from "./pages/tutorials/AddVideos";


import TopAstrology from "./pages/astrology/TopAstrology";
import ListAstrology from "./pages/astrology/ListAstrology";
import AddAstrologers from "./pages/astrology/AddAstrologers";
import DisplayEnquiry from "./pages/astrology/DisplayEnquiry";
import AddNotification from "./pages/notification/AddNotification";
import AddBulkUploadIcon from "./pages/icons/AddBulkUploadIcon";
import PaymentHistory from "./pages/payment/PaymentHistory";
import Layout from "./layouts/Layout";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TermsAndConditions from "./pages/termsAndConditions/TermsAndConditions";
import PrivacyPolicies from "./pages/privacyPolicies/PrivacyPolicies";
import AboutUs from "./pages/about/AboutUs";
import DisplaySubAdmin from "./pages/subAdmin/DisplaySubAdmin";
import AddSubAdmin from "./pages/subAdmin/AddSubAdmin";
import AdminTemplates from "./pages/templates/AdminTemplates";
import UserTemplates from "./pages/templates/UserTemplates";
import AddTemplates from "./pages/templates/AddTemplates";
// babita
function App() {
  let redux = useSelector(state => state)
  console.log("Reudx redux", redux)

  const [appToken, setAppToken] = useState()
  useEffect(() => {
    try {
      const userToken = localStorage.getItem("token");
      console.log("userToken token", userToken)
      setAppToken(userToken)
      if (!userToken) {
        // navigate("/login");
      }
    }
    catch (e) {
      console.log(e)
    }
  }, [appToken]);

  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
        {/* {
          appToken && <> */}
          {/* <Route element={<Layout />}> */}
            
            <Route index element={<Dashboard />} />
            <Route path="*" element={<div style={{backgroundColor:"red"}}> Not Ready</div>} />
            <Route path="/displayUser" element={<DisplayUser />} />
            <Route path="/AddUser" element={<AddUser />} />
            <Route path="/editUser" element={<EditUser />} />
            <Route path="/displayPlan" element={<DisplayPlan />} />
            <Route path="/addplans" element={<AddPlan />} />
            <Route path="/bulkupload" element={<AddBulkUploadIcon />} />
            <Route path="/categories" element={<DisplayCategories />} />
            <Route path="/addCategories" element={<AddCategories />} />
            <Route path="/subCategories" element={<DisplaySubCategories />} />
            <Route path="/addSubCategories" element={<AddSubCategories />} />
            <Route path="/childCategories" element={<DisplayChildCategories />} />
            <Route path="/addChildCategories" element={<AddChildCategories />} />
            <Route path="/displyIcons" element={<DisplayIcons />} />
            <Route path="/addIcons" element={<AddIcons />} />
            <Route path="/vcategories" element={<DisplayVCategories />} />
            <Route path="/addVcategories" element={< AddVCategories />} />
            <Route path="/vsubCategories" element={<DisplayVSubCategories />} />
            <Route path="/addVSubCategories" element={<AddVSubCategories />} />
            <Route path="/videos" element={< DisplayVideos />} />
            <Route path="/addVideos" element={<AddVideos />} />
            <Route path="/add/notification" element={<AddNotification />} />
            <Route path="/paymenthistory" element={<PaymentHistory />} />

            <Route path="/adminTemplates" element={<AdminTemplates/>}/>
            <Route path="/userTemplate" element={<UserTemplates/>}/>
            <Route path="/addTemplates" element={<AddTemplates/>}/>
            <Route path="/termsAndConditions" element={<TermsAndConditions/>}/>
            <Route path="/privacyPolicies" element={<PrivacyPolicies/>}/>
            <Route path="/aboutUs" element={<AboutUs/>}/>
            <Route path="/displaySubAdmin" element={<DisplaySubAdmin/>}/>
            <Route path="/addSubAdmin" element={<AddSubAdmin/>}/>
          {/* </Route> */}
          {/* </>
        } */}
        </Route>
      </Routes>
    </Router>

  );
}


export default App;