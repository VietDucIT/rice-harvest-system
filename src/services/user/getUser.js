import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getUser = (id) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.get(`${REQUEST_URL}/user/${id}`);
    // console.log('Data getUser: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't get User data.");
    }
  });
};

export default getUser;
