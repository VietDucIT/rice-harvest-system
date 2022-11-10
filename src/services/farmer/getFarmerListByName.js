import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getFarmerListByName = async (name) => {
  try {
    // console.log("Farmer name: ", name);
    const response = await axios.get(`${REQUEST_URL}/farmer/list-by-name`, {
      params: { name: name },
    });
    // console.log("getFarmerListByName - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get Farmer list by Name: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getFarmerListByName;
