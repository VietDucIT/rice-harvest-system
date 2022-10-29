import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const deleteRiceBuyingArea = (id) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.delete(
      `${REQUEST_URL}/rice-buying-area/${id}`
    );
    // console.log('Data deleteRiceBuyingArea: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't delete Rice Buying Area.");
    }
  });
};

export default deleteRiceBuyingArea;
