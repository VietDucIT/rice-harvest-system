import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const deleteRiceField = async (id) => {
  try {
    // console.log("deleteRiceField - ID Rice Field: ", id);
    const response = await axios.delete(`${REQUEST_URL}/rice-field/${id}`);
    // console.log("deleteRiceField - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("deleteRiceField - Can't delete Rice Field: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default deleteRiceField;
