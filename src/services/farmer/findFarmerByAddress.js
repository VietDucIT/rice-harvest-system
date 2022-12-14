import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const findFarmerByAddress = async (province, town, commune, village) => {
  try {
    // console.log("findFarmerByAddress - Address: ", province, town, commune, village);
    const response = await axios.get(`${REQUEST_URL}/farmer/find-by-address`, {
      params: {
        province: province,
        town: town,
        commune: commune,
        village: village,
      },
    });
    // console.log("findFarmerByAddress - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("findFarmerByAddress - Can't find Farmer by Address: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default findFarmerByAddress;
