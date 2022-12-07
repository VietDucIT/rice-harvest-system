import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getRiceSeasonList = async (idFarmer) => {
  try {
    // console.log("Farmer: ", idFarmer);
    const response = await axios.get(
      `${REQUEST_URL}/rice-season/farmer/${idFarmer}`
    );
    // console.log("getRiceSeasonList - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get Rice Season list: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getRiceSeasonList;
