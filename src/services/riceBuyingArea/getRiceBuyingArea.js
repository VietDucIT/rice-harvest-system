import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getRiceBuyingArea = (id) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.get(
      `${REQUEST_URL}/rice-buying-area/${id}`
    );
    // console.log('Data', data);
    // console.log('Status', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't get Rice Buying Area data.");
    }
  });
};

export default getRiceBuyingArea;
