import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getConnectionList = async () => {
  try {
    const response = await axios.get(`${REQUEST_URL}/connection/list`);
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't get Connection List: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getConnectionList;
