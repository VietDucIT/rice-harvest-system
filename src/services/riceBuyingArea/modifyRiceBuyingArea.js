import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifyRiceBuyingArea = (riceBuyingAreaData) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.put(
      `${REQUEST_URL}/rice-buying-area/${riceBuyingAreaData._id}`,
      riceBuyingAreaData
    );
    // console.log('Data modifyRiceBuyingArea: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't modify Rice Buying Area.");
    }
  });
};

export default modifyRiceBuyingArea;
