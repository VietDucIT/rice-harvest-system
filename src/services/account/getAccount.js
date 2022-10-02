// Get Account data to modify if there is Modify Account feature.
import axios from "axios";

import REQUEST_URL from "../urlToBackend";

// id or username ???
const getAccount = (id) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.get(`${REQUEST_URL}/account/${id}`);
    // console.log('Data', data);
    // console.log('Status', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't get Account data.");
    }
  });
};

export default getAccount;
