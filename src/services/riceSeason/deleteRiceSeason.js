import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const deleteRiceSeason = async (id) => {
  try {
    // console.log("deleteRiceSeason - ID Rice Season: ", id);
    const response = await axios.delete(`${REQUEST_URL}/rice-season/${id}`);
    // console.log("deleteRiceSeason - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("deleteRiceSeason - Can't delete Rice Season: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default deleteRiceSeason;
