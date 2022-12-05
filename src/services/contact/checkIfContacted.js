import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const checkIfContacted = async (idUser, idUser2) => {
  try {
    const response = await axios.get(`${REQUEST_URL}/contact/check/${idUser}`, {
      params: { idUser2: idUser2 },
    });
    // console.log("checkIfContacted - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't check Contact: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default checkIfContacted;
