import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getRiceField = (id) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.get(`${REQUEST_URL}/rice-field/${id}`);
    // console.log("Data getRiceField: ", data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't get Rice Field data.");
    }
  });
};

export default getRiceField;
