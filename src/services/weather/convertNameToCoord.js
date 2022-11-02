import axios from "axios";

import API_KEY from "./apiKey";

const REQUEST_URL = "http://api.openweathermap.org/geo/1.0/direct";

const convertNameToCoord = async (name) => {
  try {
    console.log("Province's name: ", name);
    const response = await axios.get(`${REQUEST_URL}`, {
      params: { q: name + ",VN", appid: `${API_KEY}` },
    });
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't convert Province's name to Coordinate: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default convertNameToCoord;
