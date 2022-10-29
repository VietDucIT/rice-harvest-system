import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getRiceBuyingArea = async (id) => {
  try {
    // console.log("ID Rice Buying Area: ", id);
    const response = await axios.get(`${REQUEST_URL}/rice-buying-area/${id}`);
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't get Rice Buying Area: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getRiceBuyingArea;
