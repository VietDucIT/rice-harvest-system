import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const findConnection = async (idUser, name) => {
  try {
    const response = await axios.get(
      `${REQUEST_URL}/connection/find/${idUser}`,
      {
        params: { name: name },
      }
    );
    // console.log("findConnection - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't find Connection by Name: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default findConnection;
