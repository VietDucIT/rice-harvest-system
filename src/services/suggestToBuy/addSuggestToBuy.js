import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const addSuggestToBuy = (suggestToBuyData) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.post(
      `${REQUEST_URL}/suggest-to-buy/`,
      suggestToBuyData
    );
    // console.log('Data addSuggestToBuy: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't add Suggest To Buy.");
    }
  });
};

export default addSuggestToBuy;
