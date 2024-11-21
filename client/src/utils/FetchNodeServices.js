import axios from "axios";
import { add_sub_categories, admin_login, base_url, get_all_users } from "./Constants";

const postData = async (url, body, isFile = false) => {
  try {
    const headers = {
      headers: {
        "content-type": isFile ? "multipart/form-data" : "application/json",
      },
    };
    var response = await axios.post(`${base_url + url}`, body, headers);
    return response.data;
  } catch (error) {
    return false;
  }
};

const getData = async (url) => {
  try {
    var response = await axios.get(`${base_url + url}`);
    var result = response.data;
    return result;
  } catch (e) {
    return false;
  }
};

export const UserLogin = async (loginData) => {
  try {
    const response = await axios.post(`${base_url}${admin_login}`, {
      username: loginData.username,
      password: loginData.password,
    });
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getUserData = async () => {
  try {
    const response = await axios.get(`${base_url}${get_all_users}`, {});
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addCategogry = async (categoriesData) => {
  try {
    const response = await axios.post(`${base_url}api/admin/addCategory`, categoriesData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Make sure to set the content type for FormData
      },
    });
    return response;
  } catch (error) {
      throw error;
  }
};

export const addSubCategogry = async (subCategoriesData) => {
  try {
    const response = await axios.post(`${base_url}${add_sub_categories}`, subCategoriesData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Make sure to set the content type for FormData
      },
    });
    return response;
  } catch (error) {
      throw error;
  }
};

export const addChildCategogry = async (childCategoriesData) => {
  try {
    const response = await axios.post(`${base_url}api/admin/addChildCategory`, childCategoriesData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Make sure to set the content type for FormData
      },
    });
    return response;
  } catch (error) {
      throw error;
  }
};

export const addIcon = async (iconData) => {
  try {
    const response = await axios.post(`${base_url}api/admin/addIcon`, iconData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Make sure to set the content type for FormData
      },
    });
    return response;
  } catch (error) {
      throw error;
  }
};

export const addVideo = async (videoData) => {
  try {
    const response = await axios.post(`${base_url}api/admin/uploadVideo`, videoData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Make sure to set the content type for FormData
      },
    });
    return response;
  } catch (error) {
      throw error;
  }
}

export const addBulkUpload = async(BulkData) => {
  try {
    const response = await axios.post(`${base_url}api/admin/bulkUpload`, BulkData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Make sure to set the content type for FormData
      },
    });
    return response;
  } catch (error) {
      throw error;
  }
}

const putData = async (url, body, isFile = false) => {
  try {
    const headers = {
      headers: {
        "content-type": isFile ? "multipart/form-data" : "application/json",
      },
    };
    var response = await axios.put(`${base_url + url}`, body, headers);
    return response.data;
  } catch (error) {
    return false;
  }
};

const deleteData = async (url) => {
  try {
    const headers = {
      "Content-Type": "application/json", 
    };
    const response = await axios.post(`${base_url}${url}`);
    return response.data;
  } catch (error) {
    console.error("Error in deleteData:", error);
    return false;
  }
};

export { postData, getData, putData, deleteData };