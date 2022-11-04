import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const checkNewestRicePrice = async () => {
  try {
    const response = await axios.get(`${REQUEST_URL}/rice-price/check`);
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't check Newest Rice Price: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default checkNewestRicePrice;