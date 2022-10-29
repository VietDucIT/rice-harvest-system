import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const deleteConnection = async (id) => {
  try {
    // console.log("ID Connection: ", id);
    const response = await axios.delete(`${REQUEST_URL}/connection/${id}`);
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't delete Connection: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default deleteConnection;
