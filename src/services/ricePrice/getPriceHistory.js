import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getPriceHistory = async () => {
  try {
    console.log("getPriceHistory - Called.");
    const response = await axios.get(`${REQUEST_URL}/rice-price/history`);
    // console.log("getPriceHistory - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get Price History: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getPriceHistory;
