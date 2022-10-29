import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const logIn = async (user) => {
  try {
    // console.log("Data Login: ", user);
    const response = await axios.post(`${REQUEST_URL}/user/login`, user);
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't Log in: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default logIn;
