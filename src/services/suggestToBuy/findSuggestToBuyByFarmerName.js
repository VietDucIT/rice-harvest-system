import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const findSuggestToBuyByFarmerName = async (farmerName, idTrader) => {
  try {
    // console.log("findSuggestToBuyByFarmerName - Farmer's name of Suggest To Buy: ", farmerName);
    const response = await axios.get(`${REQUEST_URL}/suggest-to-buy/farmer`, {
      params: { farmerName: farmerName, idTrader: idTrader },
    });
    // console.log("findSuggestToBuyByFarmerName - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log(
      "findSuggestToBuyByFarmerName - Can't find Suggest To Buy by Farmer's name: ",
      {
        err: JSON.stringify(err),
      }
    );
    throw err;
  }
};

export default findSuggestToBuyByFarmerName;
