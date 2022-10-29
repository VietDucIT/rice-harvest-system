import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getRiceFieldList = async (idFarmer) => {
  try {
    // console.log("ID Farmer: ", idFarmer);
    const response = await axios.get(
      `${REQUEST_URL}/rice-field/${idFarmer}/list`
    );
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't get Rice Field list: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getRiceFieldList;
