import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getRiceFieldList = (idFarmer) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.get(
      `${REQUEST_URL}/rice-field/${idFarmer}/list`
    );
    // console.log('Data getRiceFieldList: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't get Rice Field list.");
    }
  });
};

export default getRiceFieldList;
