import axios from "axios";

const getAddressAPIData = async () => {
  try {
    const response = await axios.get(
      "https://provinces.open-api.vn/api/?depth=3"
    );
    console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't get Address data: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getAddressAPIData;
