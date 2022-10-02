import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getFarmerListByName = (name) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.get(
      `${REQUEST_URL}/farmer/list-by-name`,
      { params: name }
    );
    // console.log('Data getFarmerListByName: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't get Farmer list by name.");
    }
  });
};

export default getFarmerListByName;
