import axios from "axios";

import REQUEST_URL from "../urlToBackend";

// const getRiceSeasonList = (idFarmer) => {
//   return new Promise(async (resolve, reject) => {
//     const { data, status } = await axios.get(
//       `${REQUEST_URL}/rice-season/${idFarmer}/list`
//     );
//     // console.log('Data getRiceSeasonList: ', data);
//     // console.log('Status: ', status);

//     if (status === 200) {
//       resolve(data);
//     } else {
//       reject("Can't get Rice Season list.");
//     }
//   });
// };
const getRiceSeasonList = () => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.get(
      `${REQUEST_URL}/rice-season/123/list`
    );

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't get Rice Season list.");
    }
  });
};

export default getRiceSeasonList;
