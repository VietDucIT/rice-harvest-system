import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getRiceList = () => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.get(`${REQUEST_URL}/rice/list`);
    // console.log('Data getRiceList: ', data);
    // console.log('Status: ', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't get Rice list.");
    }
  });
};

export default getRiceList;
