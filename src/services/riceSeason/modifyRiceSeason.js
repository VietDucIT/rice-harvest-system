import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifyRiceSeason = async (riceSeasonData) => {
  try {
    // console.log("modifyRiceSeason - Rice Season: ", riceSeasonData);
    const response = await axios.put(
      `${REQUEST_URL}/rice-season/${riceSeasonData._id}`,
      riceSeasonData
    );
    // console.log("modifyRiceSeason - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("modifyRiceSeason - Can't modify Rice Season: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default modifyRiceSeason;
