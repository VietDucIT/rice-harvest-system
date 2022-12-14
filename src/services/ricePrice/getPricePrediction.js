import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getPricePrediction = async () => {
  try {
    console.log("getPricePrediction - Called.");
    const response = await axios.get(`${REQUEST_URL}/rice-price/prediction`);
    // console.log("getPricePrediction - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("getPricePrediction - Can't get Price Prediction: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getPricePrediction;
