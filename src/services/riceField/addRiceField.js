import axios from "axios";

import REQUEST_URL from "../urlToBackend";

// For which farmer ???
const addRiceField = async (riceFieldData) => {
  try {
    console.log("Rice Field: ", riceFieldData);
    const response = await axios.post(
      `${REQUEST_URL}/rice-field/`,
      riceFieldData
    );
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't add Rice Field: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default addRiceField;
