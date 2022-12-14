import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const addSuggestToBuy = async (suggestToBuyData) => {
  try {
    // console.log("addSuggestToBuy - Suggest To Buy: ", suggestToBuyData);
    const response = await axios.post(
      `${REQUEST_URL}/suggest-to-buy/`,
      suggestToBuyData
    );
    // console.log("addSuggestToBuy - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("addSuggestToBuy - Can't add Suggest To Buy: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default addSuggestToBuy;
