import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getBillList = async (idUser) => {
  try {
    const response = await axios.get(`${REQUEST_URL}/bill/user/${idUser}`);
    // console.log("getBillList - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("getBillList - Can't get Bill List: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getBillList;
