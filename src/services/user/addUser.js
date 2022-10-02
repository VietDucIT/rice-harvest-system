import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const addUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.post(`${REQUEST_URL}/user/`, userData);
    // console.log('Data addUser: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't add User.");
    }
  });
};

export default addUser;
