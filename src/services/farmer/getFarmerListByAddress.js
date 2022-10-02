import axios from "axios";

import REQUEST_URL from "../urlToBackend";

// Which is Address type, string or object ???
const getFarmerListByAddress = (address) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.get(
      `${REQUEST_URL}/farmer/list-by-address`,
      { params: address }
    );
    // console.log('Data getFarmerListByAddress: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't get Farmer list by address.");
    }
  });
};

export default getFarmerListByAddress;
