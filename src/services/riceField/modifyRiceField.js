import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifyRiceField = async (riceFieldData) => {
  try {
    // console.log("Rice Field: ", riceFieldData);
    const response = await axios.put(
      `${REQUEST_URL}/rice-field/${riceFieldData._id}`,
      riceFieldData
    );
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't modify Rice Field: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default modifyRiceField;
