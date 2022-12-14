import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const logIn = async (user) => {
  try {
    // console.log("logIn - Login as: ", user);
    const response = await axios.post(`${REQUEST_URL}/user/login`, user);
    // console.log("logIn - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("logIn - Can't Log in: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default logIn;
