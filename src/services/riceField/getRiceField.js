import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getRiceField = async (id) => {
  try {
    // console.log("getRiceField - ID Rice Field: ", id);
    const response = await axios.get(`${REQUEST_URL}/rice-field/${id}`);
    // console.log("getRiceField - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("getRiceField - Can't get Rice Field: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getRiceField;
