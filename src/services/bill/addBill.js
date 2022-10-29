import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const addBill = async (billData) => {
  try {
    // console.log("Bill: ", billData);
    const response = await axios.post(`${REQUEST_URL}/bill/`, billData);
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't add Bill: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default addBill;
