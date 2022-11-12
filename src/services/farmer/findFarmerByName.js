import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const findFarmerByName = async (name) => {
  try {
    // console.log("Farmer name: ", name);
    const response = await axios.get(`${REQUEST_URL}/farmer/find-by-name`, {
      params: { name: name },
    });
    // console.log("findFarmerByName - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't find Farmer by Name: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default findFarmerByName;
