import axios from "axios";

import REQUEST_URL from "../urlToBackend";

// For which trader ???
const addRiceBuyingArea = (riceBuyingAreaData) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.post(
      `${REQUEST_URL}/rice-buying-area/`,
      riceBuyingAreaData
    );
    // console.log('Data', data);
    // console.log('Status', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't add Rice Buying Area.");
    }
  });
};

export default addRiceBuyingArea;
