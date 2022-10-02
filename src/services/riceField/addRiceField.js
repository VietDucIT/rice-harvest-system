import axios from "axios";

import REQUEST_URL from "../urlToBackend";

// For which farmer ???
const addRiceField = (riceFieldData) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.post(
      `${REQUEST_URL}/rice-field/`,
      riceFieldData
    );
    // console.log('Data', data);
    // console.log('Status', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't add Rice Field.");
    }
  });
};

export default addRiceField;
