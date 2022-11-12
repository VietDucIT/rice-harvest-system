import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const findRiceBuyingAreaByName = async (name, idTrader) => {
  try {
    // console.log("Rice Buying Area name: ", name);
    const response = await axios.get(
      `${REQUEST_URL}/rice-buying-area/find-by-name`,
      {
        params: { name: name, idTrader: idTrader },
      }
    );
    // console.log("findRiceBuyingAreaByName - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't find Rice Buying Area by Name: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default findRiceBuyingAreaByName;
