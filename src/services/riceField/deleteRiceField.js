import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const deleteRiceField = (id) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.delete(
      `${REQUEST_URL}/rice-field/${id}`
    );
    // console.log('Data deleteRiceField: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't delete Rice Field.");
    }
  });
};

export default deleteRiceField;
