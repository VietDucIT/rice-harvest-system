import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const logIn = (user) => {
  return new Promise(async (resolve, reject) => {
    console.log("Data logIn: ", user);
    const { data, status } = await axios.post(
      `${REQUEST_URL}/user/login`,
      user
    );
    console.log("Data logIn: ", data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't Log in.");
    }
  });
};

export default logIn;
