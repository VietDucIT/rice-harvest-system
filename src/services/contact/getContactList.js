import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getContactList = async (idUser) => {
  try {
    const response = await axios.get(`${REQUEST_URL}/contact/user/${idUser}`);
    // console.log("getContactList - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("getContactList - Can't get Contact List: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getContactList;
