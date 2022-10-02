import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifySuggestToBuy = (id, suggestToBuyData) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.post(
      `${REQUEST_URL}/suggest-to-buy/${id}/modify`,
      suggestToBuyData
    );
    // console.log('Data modifySuggestToBuy: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't modify Suggest To Buy.");
    }
  });
};

export default modifySuggestToBuy;
