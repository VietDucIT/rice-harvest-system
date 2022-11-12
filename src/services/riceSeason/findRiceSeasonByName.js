import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const findRiceSeasonByName = async (name, idFarmer) => {
  try {
    // console.log("Rice Season name: ", name);
    const response = await axios.get(
      `${REQUEST_URL}/rice-season/find-by-name`,
      { params: { name: name, idFarmer: idFarmer } }
    );
    // console.log("findRiceSeasonByName - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't find Rice Season by Name: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default findRiceSeasonByName;
