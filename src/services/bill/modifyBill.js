import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifyBill = async (billData) => {
  try {
    // console.log("Bill: ", billData);
    const response = await axios.put(
      `${REQUEST_URL}/${billData._id}`,
      billData
    );
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't modify Bill: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default modifyBill;
