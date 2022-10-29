import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifySuggestToBuy = (suggestToBuyData) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.put(
      `${REQUEST_URL}/suggest-to-buy/${suggestToBuyData._id}`,
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
