import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getRiceBuyingAreaList = async (idTrader) => {
  try {
    // console.log("getRiceBuyingAreaList - ID Trader: ", idTrader);
    const response = await axios.get(
      `${REQUEST_URL}/rice-buying-area/trader/${idTrader}`
    );
    // console.log("getRiceBuyingAreaList - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("getRiceBuyingAreaList - Can't get Rice Buying Area List: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getRiceBuyingAreaList;
