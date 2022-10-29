import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const addSuggestToBuy = async (suggestToBuyData) => {
  try {
    // console.log("Suggest To Buy: ", suggestToBuyData);
    const response = await axios.post(
      `${REQUEST_URL}/suggest-to-buy/`,
      suggestToBuyData
    );
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't add Suggest To Buy: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default addSuggestToBuy;
