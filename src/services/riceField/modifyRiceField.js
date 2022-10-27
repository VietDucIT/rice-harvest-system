import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifyRiceField = (riceFieldData) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.post(
      `${REQUEST_URL}/rice-field/${riceFieldData._id}/modify`,
      riceFieldData
    );
    // console.log('Data modifyRiceField: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't modify Rice Field.");
    }
  });
};

export default modifyRiceField;
