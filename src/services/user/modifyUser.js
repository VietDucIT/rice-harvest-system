import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifyUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.put(
      `${REQUEST_URL}/user/${userData._id}`,
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
