import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const addConnection = async (connectionData) => {
  try {
    // console.log("Connection: ", connectionData);
    const response = await axios.post(
      `${REQUEST_URL}/connection/`,
      connectionData
    );
    // console.log("addConnection - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't add Connection: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default addConnection;
