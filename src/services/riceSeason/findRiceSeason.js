import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const findRiceSeason = async (idFarmer, name) => {
  try {
    // console.log("Farmer: ", idFarmer);
    const response = await axios.get(
      `${REQUEST_URL}/rice-season/find/${idFarmer}`,
      { params: { name: name } }
    );
    // console.log("findRiceSeason - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't find Rice Season List by Name: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default findRiceSeason;
