import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const addContact = async (contactData) => {
  try {
    // console.log("addContact - Contact: ", contactData);
    const response = await axios.post(`${REQUEST_URL}/contact/`, contactData);
    // console.log("addContact - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("addContact - Can't add Contact: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default addContact;
