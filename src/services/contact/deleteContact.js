import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const deleteContact = async (id) => {
  try {
    // console.log("deleteContact - ID Contact: ", id);
    const response = await axios.delete(`${REQUEST_URL}/contact/${id}`);
    // console.log("deleteContact - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("deleteContact - Can't delete Contact: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default deleteContact;
