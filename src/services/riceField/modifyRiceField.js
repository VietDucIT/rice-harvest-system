import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifyRiceField = async (riceFieldData) => {
  try {
    // console.log("modifyRiceField - Rice Field: ", riceFieldData);
    const response = await axios.put(
      `${REQUEST_URL}/rice-field/${riceFieldData._id}`,
      riceFieldData
    );
    // console.log("modifyRiceField - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("modifyRiceField - Can't modify Rice Field: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default modifyRiceField;
