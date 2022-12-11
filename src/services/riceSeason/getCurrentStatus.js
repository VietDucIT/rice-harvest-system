import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getCurrentStatus = async (riceFieldId) => {
  try {
    // console.log("getCurrentStatus - ID Rice Field: ", riceFieldId);
    const response = await axios.get(
      `${REQUEST_URL}/rice-season/current-status/${riceFieldId}`
    );
    // console.log("getCurrentStatus - Response from server: ", response.data);
    return response.data; // return currentState of the newest Rice Season
  } catch (err) {
    console.log("Can't get current status of Rice Field: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getCurrentStatus;
