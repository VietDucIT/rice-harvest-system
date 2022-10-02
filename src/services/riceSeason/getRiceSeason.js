import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getRiceSeason = (id) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.get(
      `${REQUEST_URL}/rice-season/${id}`
    );
    // console.log('Data getRiceSeason: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't get Rice Season data.");
    }
  });
};

export default getRiceSeason;
