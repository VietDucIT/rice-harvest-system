import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getRiceFieldList = async (idFarmer) => {
  try {
    // console.log("Farmer: ", idFarmer);
    const response = await axios.get(
      `${REQUEST_URL}/rice-field/farmer/${idFarmer}`
    );
    // console.log("getRiceFieldList - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get Rice Field list: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getRiceFieldList;
