import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const updateRicePrice = () => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.put(
      `${REQUEST_URL}/rice-price/update`
    );
    // console.log("Data updateRicePrice: ", data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't update Rice Price.");
    }
  });
};

export default updateRicePrice;
