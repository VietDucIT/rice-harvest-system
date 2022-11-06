import axios from "axios";

import REQUEST_URL from "../urlToBackend";

// Need a parameter such as date or url ???
const getPricePrediction = async () => {
  try {
    const response = await axios.get(`${REQUEST_URL}/rice-price/prediction`);
    // console.log("getPricePrediction - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get Price Prediction: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getPricePrediction;
