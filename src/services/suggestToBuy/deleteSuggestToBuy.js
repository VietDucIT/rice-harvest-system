import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const deleteSuggestToBuy = async (id) => {
  try {
    // console.log("ID Suggest To Buy: ", id);
    const response = await axios.delete(`${REQUEST_URL}/suggest-to-buy/${id}`);
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't delete Suggest To Buy: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default deleteSuggestToBuy;
