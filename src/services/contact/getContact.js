import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getContact = async (id) => {
  try {
    // console.log("getContact - ID Contact: ", id);
    const response = await axios.get(`${REQUEST_URL}/contact/${id}`);
    // console.log("getContact - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("getContact - Can't get Contact: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getContact;
