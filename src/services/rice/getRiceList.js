import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getRiceList = async () => {
  try {
    const response = await axios.get(`${REQUEST_URL}/rice/`);
    // console.log("getRiceList - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("getRiceList - Can't get Rice List: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getRiceList;
