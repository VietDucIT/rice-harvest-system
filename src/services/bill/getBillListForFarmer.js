import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getBillListForFarmer = async (idFarmer) => {
  try {
    const response = await axios.get(`${REQUEST_URL}/bill/farmer/${idFarmer}`);
    // console.log("getBillListForFarmer - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get Bill List: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getBillListForFarmer;
