import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const checkExistedPhone = async (phone) => {
  try {
    // console.log("Phone: ", phone);
    const response = await axios.get(
      `${REQUEST_URL}/user/check-existed-phone`,
      {
        params: { phone: phone },
      }
    );
    // console.log("checkExistedPhone - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't Check Existed Phone: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default checkExistedPhone;
