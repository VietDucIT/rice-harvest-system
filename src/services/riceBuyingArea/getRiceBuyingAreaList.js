import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getRiceBuyingAreaList = async (idTrader) => {
  try {
    // console.log("ID Trader: ", idTrader);
    const response = await axios.get(
      `${REQUEST_URL}/rice-buying-area/${idTrader}/list`
    );
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't get Rice Buying Area list: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getRiceBuyingAreaList;
