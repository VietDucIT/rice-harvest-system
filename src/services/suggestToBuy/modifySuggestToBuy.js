import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifySuggestToBuy = async (suggestToBuyData) => {
  try {
    // console.log("modifySuggestToBuy - Suggest To Buy: ", suggestToBuyData);
    const response = await axios.put(
      `${REQUEST_URL}/suggest-to-buy/${suggestToBuyData._id}`,
      suggestToBuyData
    );
    // console.log("modifySuggestToBuy - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("modifySuggestToBuy - Can't modify Suggest To Buy: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default modifySuggestToBuy;
