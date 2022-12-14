import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const deleteUser = async (id) => {
  try {
    // console.log("deleteUser - ID User: ", id);
    const response = await axios.delete(`${REQUEST_URL}/user/${id}`);
    // console.log("deleteUser - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("deleteUser - Can't delete User: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default deleteUser;
