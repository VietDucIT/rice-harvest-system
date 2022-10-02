import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const deleteRiceSeason = (id) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.post(
      `${REQUEST_URL}/rice-season/${id}/delete`
    );
    // console.log('Data deleteRiceSeason: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't delete Rice Season.");
    }
  });
};

export default deleteRiceSeason;
