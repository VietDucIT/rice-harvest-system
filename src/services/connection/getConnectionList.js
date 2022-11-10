import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getConnectionList = async (idUser) => {
  try {
    const response = await axios.get(
      `${REQUEST_URL}/connection/user/${idUser}`
    );
    // console.log("getConnectionList - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get Connection List: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getConnectionList;
