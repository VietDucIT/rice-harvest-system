import axios from "axios";

import REQUEST_URL from "../urlToBackend";

// Which is Address type, string or object ???
const findFarmerByAddress = async (address) => {
  try {
    // console.log("Address: ", address);
    const response = await axios.get(`${REQUEST_URL}/farmer/find-by-address`, {
      params: address,
    });
    // console.log("findFarmerByAddress - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't find Farmer by Address: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default findFarmerByAddress;
