import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const updateRicePrice = async () => {
  try {
    const response = await axios.put(`${REQUEST_URL}/rice-price/update`);
    // console.log("updateRicePrice - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("updateRicePrice - Can't update Rice Price: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default updateRicePrice;
