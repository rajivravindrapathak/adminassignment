import React, { useEffect, useState } from "react";
import { Breadcrumbs, Button, Grid, Input, Select, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { base_url } from "../../utils/Constants";
// import Header from "../../components/Header";
// import Sidebar from "../../components/Sidebar";
// import { addNotificationData, getPlayerData } from "../../api/Api";

const AddNotification = () => {
  const navigate = useNavigate();
  const [Biovisual, setBiovisual] = useState([]);
  const [selectedBiovisual, setSelectedBiovisual] = useState([]);
  const [formData, setFormData] = useState({
    notificationTitle: "",
    notificationMessage: "",
    notificationImg: "",    
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlayerChange = (event) => {
    const values = event.target.value;
    const selectedBiovisual = values.includes("selectAll")
      ? Biovisual
      : Biovisual.filter((player) => values.includes(player.first_name));

    setSelectedBiovisual(selectedBiovisual);

    const titles = selectedBiovisual.map((player) => player.notificationTitle?.toString() || "");
    const messages = selectedBiovisual.map((player) => player.notificationMessage?.toString() || "");

    setFormData((prev) => ({
      ...prev,
      list_id: selectedBiovisual.map((player) => player._id),
      notificationTitle: titles.join(", "),
      notificationMessage: messages.join(", "),
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      notificationImg: file,
    }));
  };

  const onFinish = async () => {
    // try {
    //   const responses = await Promise.all(
    //     // selectedBiovisual.map((player) => addNotificationData({ ...formData, list_id: [player._id] }))
    //   );

    //   const isSuccess = responses.every((response) => response.data.status === "success");

    //   if (isSuccess) {
    //     Swal.fire({
    //       icon: "success",
    //       title: "Success!",
    //       text: "Notifications sent successfully.",
    //     });

    //     setFormData({
    //       list_id: [],
    //       notificationTitle: "",
    //       notificationMessage: "",
    //       notificationImg: "",
    //     });

    //     setSelectedBiovisual([]);
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Error!",
    //       text: "Some notifications failed to send. Please try again.",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }

    try {
        const response = await axios.post(`${base_url}/notifications`, );
        return response;
      } catch (error) {
        throw error;
      }
  };

  const getNotification = async () => {
    try {
    //   const response = await getPlayerData();
    //   setBiovisual(response);
    } catch (error) {
      console.error("Error fetching Biovisual:", error);
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Breadcrumbs>
            <Typography>Notification</Typography>
            <Typography>Home</Typography>
            <Typography>Send Notification</Typography>
          </Breadcrumbs>
          <hr />
          <form onSubmit={onFinish}>
            <Typography variant="h4">Send Notification</Typography>
            <Typography>All Player</Typography>
            <Select
              multiple
              fullWidth
              value={selectedBiovisual.map((player) => player.first_name)}
              onChange={handlePlayerChange}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
            >
              {/* Option for Select All */}
              <option value="selectAll">Select All</option>

              {/* Options for individual Biovisual */}
              {Biovisual.map((player) => (
                <option key={player.first_name} value={player.first_name}>
                  {player.first_name}
                </option>
              ))}
            </Select>

            <TextField
              fullWidth
              label="Notification Title"
              name="notificationTitle"
              value={formData?.notificationTitle}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Notification Message"
              name="notificationMessage"
              value={formData?.notificationMessage}
              onChange={handleChange}
              multiline
              rows={4}
            />

            <input
              type="file"
              label="Image"
              name="notificationImg"
              accept=".jpeg, .png, .jpg"
              onChange={handleFileUpload}
            />

            <Button type="submit" variant="contained" color="primary" style={{ marginRight: "1%" }}>
              Submit
            </Button>
            <Button type="reset" variant="contained" color="primary">
              Reset
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default AddNotification;






   

