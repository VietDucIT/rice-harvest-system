import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const addBill = async (billData) => {
  try {
    // console.log("addBill - Bill: ", billData);
    const response = await axios.post(`${REQUEST_URL}/bill/`, billData);
    // console.log("addBill - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("addBill - Can't add Bill: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default addBill;
