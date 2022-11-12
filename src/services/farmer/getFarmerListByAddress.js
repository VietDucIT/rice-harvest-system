import axios from "axios";

import REQUEST_URL from "../urlToBackend";

// Which is Address type, string or object ???
const getFarmerListByAddress = async (address) => {
  try {
    // console.log("Address: ", address);
    const response = await axios.get(`${REQUEST_URL}/farmer/list-by-address`, {
      params: address,
    });
    // console.log("getFarmerListByAddress - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get Farmer List by Address: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getFarmerListByAddress;
