import axios from "axios";

import REQUEST_URL from "../urlToBackend";

// Need a parameter such as date or url ???
const getRicePrice = async () => {
  try {
    const response = await axios.get(`${REQUEST_URL}/rice-price/`);
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't get Rice Price: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getRicePrice;
