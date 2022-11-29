import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const addContact = async (idUser) => {
  try {
    // console.log("User: ", idUser);
    const response = await axios.post(`${REQUEST_URL}/contact/`, idUser);
    // console.log("addContact - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't add Contact: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default addContact;
