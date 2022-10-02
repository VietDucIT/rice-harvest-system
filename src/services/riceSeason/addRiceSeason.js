import axios from "axios";

import REQUEST_URL from "../urlToBackend";

// For which farmer ???
const addRiceSeason = (riceSeasonData) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.post(
      `${REQUEST_URL}/rice-season/`,
      riceSeasonData
    );
    // console.log('Data addRiceSeason: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't add Rice Season.");
    }
  });
};

export default addRiceSeason;
