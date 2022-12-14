import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const addRiceBuyingArea = async (riceBuyingAreaData) => {
  try {
    // console.log("addRiceBuyingArea - Rice Buying Area: ", riceBuyingAreaData);
    const response = await axios.post(
      `${REQUEST_URL}/rice-buying-area/`,
      riceBuyingAreaData
    );
    // console.log("addRiceBuyingArea - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("addRiceBuyingArea - Can't add Rice Buying Area: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default addRiceBuyingArea;
