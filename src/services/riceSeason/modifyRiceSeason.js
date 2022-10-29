import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifyRiceSeason = async (riceSeasonData) => {
  try {
    // console.log("Rice Season: ", riceSeasonData);
    const response = await axios.put(
      `${REQUEST_URL}/rice-season/${riceSeasonData._id}`,
      riceSeasonData
    );
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't modify Rice Season: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default modifyRiceSeason;
