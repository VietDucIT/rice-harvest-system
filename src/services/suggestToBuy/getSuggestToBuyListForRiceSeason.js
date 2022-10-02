import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getSuggestToBuyListForRiceSeason = (idRiceSeason) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.get(
      `${REQUEST_URL}/suggest-to-buy/${idRiceSeason}/list-for-rice-season`
    );
    // console.log('Data', data);
    // console.log('Status', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't get Suggest To Buy list for Rice Season.");
    }
  });
};

export default getSuggestToBuyListForRiceSeason;
