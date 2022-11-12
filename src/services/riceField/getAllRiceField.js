import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getAllRiceField = async () => {
  try {
    const response = await axios.get(`${REQUEST_URL}/rice-field/`);
    // console.log("getAllRiceField - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get all Rice Field: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getAllRiceField;
