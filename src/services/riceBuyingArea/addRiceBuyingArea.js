import axios from "axios";

import REQUEST_URL from "../urlToBackend";

// For which trader ???
const addRiceBuyingArea = async (riceBuyingAreaData) => {
  try {
    // console.log("Rice Buying Area: ", riceBuyingAreaData);
    const response = await axios.post(
      `${REQUEST_URL}/rice-buying-area/`,
      riceBuyingAreaData
    );
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't add Rice Buying Area: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default addRiceBuyingArea;
