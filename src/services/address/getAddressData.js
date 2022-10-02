import axios from "axios";

const getAddressData = () => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.get(
      "https://provinces.open-api.vn/api/?depth=3"
    );
    // console.log('Data', data);
    // console.log('Status', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't get Address data.");
    }
  });
};

export default getAddressData;
