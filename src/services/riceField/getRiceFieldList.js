import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getRiceFieldList = async (idFarmer) => {
  try {
    // console.log("getRiceFieldList - Farmer: ", idFarmer);
    const response = await axios.get(
      `${REQUEST_URL}/rice-field/farmer/${idFarmer}`
    );
    // console.log("getRiceFieldList - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("getRiceFieldList - Can't get Rice Field List: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getRiceFieldList;
