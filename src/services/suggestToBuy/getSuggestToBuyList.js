import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getSuggestToBuyList = async (idTrader) => {
  try {
    // console.log("ID Trader: ", idTrader);
    const response = await axios.get(
      `${REQUEST_URL}/suggest-to-buy/trader/${idTrader}`
    );
    // console.log("getSuggestToBuyList - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get Suggest To Buy list: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getSuggestToBuyList;
