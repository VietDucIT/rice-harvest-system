import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const findRiceFieldByName = async (name, idFarmer) => {
  try {
    // console.log("Rice Field name: ", name);
    const response = await axios.get(`${REQUEST_URL}/rice-field/find-by-name`, {
      params: { name: name, idFarmer: idFarmer },
    });
    // console.log("findRiceFieldByName - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't find Rice Field by Name: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default findRiceFieldByName;
