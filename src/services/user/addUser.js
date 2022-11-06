import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const addUser = async (userData) => {
  try {
    // console.log("User: ", userData);
    const response = await axios.post(`${REQUEST_URL}/user/`, userData);
    // console.log("addUser - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't add User: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default addUser;
