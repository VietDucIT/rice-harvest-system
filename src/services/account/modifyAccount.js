// If there is Modify Account feature.
import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifyAccount = (id, accountData) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.post(
      `${REQUEST_URL}/account/${id}/modify`,
      accountData
    );
    // console.log('Data', data);
    // console.log('Status', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't modify Account.");
    }
  });
};

export default modifyAccount;
