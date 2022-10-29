import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getBill = async (id) => {
  try {
    // console.log("ID Bill: ", id);
    const response = await axios.get(`${REQUEST_URL}/bill/${id}`);
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't get Bill: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getBill;
