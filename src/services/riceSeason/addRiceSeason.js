import axios from "axios";

import REQUEST_URL from "../urlToBackend";

// For which farmer ???
const addRiceSeason = async (riceSeasonData) => {
  try {
    // console.log("Rice Season: ", riceSeasonData);
    const response = await axios.post(
      `${REQUEST_URL}/rice-season/`,
      riceSeasonData
    );
    // console.log("addRiceSeason - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't add Rice Season: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default addRiceSeason;
