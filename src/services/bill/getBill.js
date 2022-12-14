import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getBill = async (id) => {
  try {
    // console.log("getBill - ID Bill: ", id);
    const response = await axios.get(`${REQUEST_URL}/bill/${id}`);
    // console.log("getBill - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("getBill - Can't get Bill: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getBill;
