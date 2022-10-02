import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const logIn = (account) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.post(
      `${REQUEST_URL}/account/login`,
      account
    );
    // console.log('Data logIn: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't Log in.");
    }
  });
};

export default logIn;
