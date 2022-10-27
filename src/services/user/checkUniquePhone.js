import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const checkUniquePhone = async (phone) => {
  try {
    console.log("Phone: ", phone);
    const response = await axios.get(`${REQUEST_URL}/user/checkUniquePhone`);
    console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't Check Unique Phone.", { err: JSON.stringify(err) });
    throw err;
  }
};

export default checkUniquePhone;
