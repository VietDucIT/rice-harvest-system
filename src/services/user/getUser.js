import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getUser = async (id) => {
  try {
    // console.log("ID User: ", id);
    const response = await axios.get(`${REQUEST_URL}/user/${id}`);
    // console.log("getUser - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get User data: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getUser;
