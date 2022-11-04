import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const updateRicePrice = async () => {
  try {
    const response = await axios.put(`${REQUEST_URL}/rice-price/update`);
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't update Rice Price: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default updateRicePrice;