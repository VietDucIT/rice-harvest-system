import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifyUser = async (userData) => {
  try {
    // console.log("modifyUser - User: ", userData);
    const response = await axios.put(
      `${REQUEST_URL}/user/${userData._id}`,
      userData
    );
    // console.log("modifyUser - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("modifyUser - Can't modify User: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default modifyUser;
