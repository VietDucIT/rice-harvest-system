import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const addAccount = (accountData) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.post(
      `${REQUEST_URL}/account/`,
      accountData
    );
    // console.log('Data addAccount: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't add Account.");
    }
  });
};

export default addAccount;
