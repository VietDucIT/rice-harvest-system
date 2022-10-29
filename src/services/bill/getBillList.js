import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getBillList = async () => {
  try {
    const response = await axios.get(`${REQUEST_URL}/bill/list`);
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't get Bill List: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getBillList;
