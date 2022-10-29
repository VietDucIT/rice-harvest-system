import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getSuggestToBuyListForRiceSeason = async (idRiceSeason) => {
  try {
    // console.log("ID Rice Season: ", idRiceSeason);
    const response = await axios.get(
      `${REQUEST_URL}/suggest-to-buy/${idRiceSeason}/list-for-rice-season`
    );
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't get Suggest To Buy list for Rice Season: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getSuggestToBuyListForRiceSeason;
