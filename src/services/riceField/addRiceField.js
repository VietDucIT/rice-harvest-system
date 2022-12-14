import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const addRiceField = async (riceFieldData) => {
  try {
    // console.log("addRiceField - Rice Field: ", riceFieldData);
    const response = await axios.post(
      `${REQUEST_URL}/rice-field/`,
      riceFieldData
    );
    // console.log("addRiceField - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("addRiceField - Can't add Rice Field: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default addRiceField;
