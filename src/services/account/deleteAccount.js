import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const deleteAccount = (id) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.delete(`${REQUEST_URL}/account/${id}`);
    // console.log('Data deleteAccount: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't delete Account.");
    }
  });
};

export default deleteAccount;
