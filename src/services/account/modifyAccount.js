// If there is Modify Account feature.
import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifyAccount = (accountData) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.post(
      `${REQUEST_URL}/account/${accountData._id}/modify`,
      accountData
    );
    // console.log('Data modifyAccount: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't modify Account.");
    }
  });
};

export default modifyAccount;
