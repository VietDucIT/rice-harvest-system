import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getRiceSeason = async (id) => {
  try {
    // console.log("getRiceSeason - ID Rice Season: ", id);
    const response = await axios.get(`${REQUEST_URL}/rice-season/${id}`);
    // console.log("getRiceSeason - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get Rice Season: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getRiceSeason;
