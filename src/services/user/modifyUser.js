import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifyUser = (id, userData) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.post(
      `${REQUEST_URL}/user/${id}/modify`,
      userData
    );
    // console.log('Data modifyUser: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't modify User.");
    }
  });
};

export default modifyUser;
