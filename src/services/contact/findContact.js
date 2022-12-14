import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const findContact = async (idUser, name) => {
  try {
    const response = await axios.get(`${REQUEST_URL}/contact/find/${idUser}`, {
      params: { name: name },
    });
    // console.log("findContact - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("findContact - Can't find Contact by Name: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default findContact;
