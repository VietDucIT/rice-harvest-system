import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getConnection = async (id) => {
  try {
    // console.log("ID Connection: ", id);
    const response = await axios.get(`${REQUEST_URL}/connection/${id}`);
    // console.log("getConnection - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get Connection: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getConnection;
