import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getSuggestToBuyListForRiceSeason = async (idRiceSeason) => {
  try {
    // console.log("ID Rice Season: ", idRiceSeason);
    const response = await axios.get(
      `${REQUEST_URL}/suggest-to-buy/season/${idRiceSeason}`
    );
    // console.log("getSuggestToBuyListForRiceSeason - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get Suggest To Buy list for Rice Season: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getSuggestToBuyListForRiceSeason;
