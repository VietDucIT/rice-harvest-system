import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const checkNewestRicePrice = () => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.get(`${REQUEST_URL}/rice-price/check`);
    // console.log("Data checkNewestRicePrice: ", data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't get Check Newest Rice Price.");
    }
  });
};

export default checkNewestRicePrice;
