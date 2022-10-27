import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifyRiceSeason = (riceSeasonData) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.post(
      `${REQUEST_URL}/rice-season/${riceSeasonData._id}/modify`,
      riceSeasonData
    );
    // console.log('Data modifyRiceSeason: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't modify Rice Season.");
    }
  });
};

export default modifyRiceSeason;
