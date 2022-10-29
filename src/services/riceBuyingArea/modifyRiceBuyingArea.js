import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifyRiceBuyingArea = async (riceBuyingAreaData) => {
  try {
    // console.log("Rice Buying Area: ", riceBuyingAreaData);
    const response = await axios.put(
      `${REQUEST_URL}/rice-buying-area/${riceBuyingAreaData._id}`,
      riceBuyingAreaData
    );
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't modify Rice Buying Area: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default modifyRiceBuyingArea;
