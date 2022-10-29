import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.delete(`${REQUEST_URL}/user/${id}`);
    // console.log('Data deleteUser: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't delete User.");
    }
  });
};

export default deleteUser;
