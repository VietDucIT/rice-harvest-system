import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getRiceBuyingArea = async (id) => {
  try {
    // console.log("getRiceBuyingArea - ID Rice Buying Area: ", id);
    const response = await axios.get(`${REQUEST_URL}/rice-buying-area/${id}`);
    // console.log("getRiceBuyingArea - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("getRiceBuyingArea - Can't get Rice Buying Area: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getRiceBuyingArea;
