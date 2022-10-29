import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const deleteUser = async (id) => {
  try {
    // console.log("ID User: ", id);
    const response = await axios.delete(`${REQUEST_URL}/user/${id}`);
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't delete User: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default deleteUser;
