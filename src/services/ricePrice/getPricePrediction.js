import axios from "axios";

import REQUEST_URL from "../urlToBackend";

// Need a parameter such as date or url ???
const getPricePrediction = () => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.get(
      `${REQUEST_URL}/rice-price/prediction`
    );
    // console.log("Data getPricePrediction: ", data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't get Price Prediction.");
    }
  });
};

export default getPricePrediction;
