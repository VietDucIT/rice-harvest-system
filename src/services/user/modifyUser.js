import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifyUser = async (userData) => {
  try {
    // console.log("User: ", userData);
    const response = await axios.put(
      `${REQUEST_URL}/user/${userData._id}`,
      userData
    );
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't modify User: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default modifyUser;
