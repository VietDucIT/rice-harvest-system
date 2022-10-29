import axios from "axios";

import REQUEST_URL from "../urlToBackend";

// Which is Address type, string or object ???
const getFarmerListByAddress = async (address) => {
  try {
    // console.log("Address: ", address);
    const response = await axios.get(`${REQUEST_URL}/farmer/list-by-address`, {
      params: address,
    });
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't get Farmer list by address: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getFarmerListByAddress;
