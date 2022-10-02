import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getSuggestToBuy = (id) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.get(
      `${REQUEST_URL}/suggest-to-buy/${id}`
    );
    // console.log('Data getSuggestToBuy: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't get Suggest To Buy data.");
    }
  });
};

export default getSuggestToBuy;
