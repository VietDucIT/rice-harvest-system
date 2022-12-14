import axios from "axios";

const getAddressAPIData = async () => {
  try {
    const response = await axios.get(
      "https://provinces.open-api.vn/api/?depth=3"
    );
    // console.log("getAddressAPIData - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("getAddressAPIData - Can't get Address API data: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getAddressAPIData;
