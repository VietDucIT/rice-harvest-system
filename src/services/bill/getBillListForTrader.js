import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getBillListForTrader = async (idTrader) => {
  try {
    const response = await axios.get(`${REQUEST_URL}/bill/trader/${idTrader}`);
    // console.log("getBillListForTrader - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get Bill List for Trader: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getBillListForTrader;
