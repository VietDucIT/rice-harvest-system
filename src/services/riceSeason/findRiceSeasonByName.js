import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const findRiceSeasonByName = async (name, year, idFarmer) => {
  try {
    // console.log("findRiceSeasonByName - Rice Season name: " + name + " " + year);
    const response = await axios.get(
      `${REQUEST_URL}/rice-season/find-by-name`,
      { params: { name: name, year: year, idFarmer: idFarmer } }
    );
    // console.log("findRiceSeasonByName - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("findRiceSeasonByName - Can't find Rice Season by Name: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default findRiceSeasonByName;
