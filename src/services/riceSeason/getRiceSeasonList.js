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
const getRiceSeasonList = async (idFarmer) => {
  try {
    // console.log("Farmer: ", idFarmer);
    const response = await axios.get(
      `${REQUEST_URL}/rice-season/${idFarmer}/list`
    );
    // console.log("getRiceSeasonList - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get Rice Season list: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getRiceSeasonList;
