import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const addUser = async (userData) => {
  try {
    console.log("User: ", userData);
    const response = await axios.post(`${REQUEST_URL}/user/`, userData);
    console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Error from server: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default addUser;
