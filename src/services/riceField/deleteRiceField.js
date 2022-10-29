import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const deleteRiceField = async (id) => {
  try {
    // console.log("ID Rice Field: ", id);
    const response = await axios.delete(`${REQUEST_URL}/rice-field/${id}`);
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't delete Rice Field: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default deleteRiceField;
