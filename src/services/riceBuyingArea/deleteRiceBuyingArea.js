import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const deleteRiceBuyingArea = async (id) => {
  try {
    // console.log("ID Rice Buying Area: ", id);
    const response = await axios.delete(
      `${REQUEST_URL}/rice-buying-area/${id}`
    );
    // console.log("deleteRiceBuyingArea - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't delete Rice Buying Area: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default deleteRiceBuyingArea;
