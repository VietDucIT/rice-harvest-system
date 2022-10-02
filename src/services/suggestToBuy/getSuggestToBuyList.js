import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getSuggestToBuyList = (idTrader) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.get(
      `${REQUEST_URL}/suggest-to-buy/${idTrader}/list`
    );
    // console.log('Data getSuggestToBuyList: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't get Suggest To Buy list.");
    }
  });
};

export default getSuggestToBuyList;
