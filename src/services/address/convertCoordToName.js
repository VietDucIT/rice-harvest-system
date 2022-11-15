import axios from "axios";

import API_KEY from "../weather/apiKey";

const REQUEST_URL = "http://api.openweathermap.org/geo/1.0/reverse";

const convertCoordToName = async (lat, lon) => {
  try {
    // console.log("convertCoordToName - Coord: (" + lat + ", " + lon + ")");
    const response = await axios.get(`${REQUEST_URL}`, {
      params: { lat: lat, lon: lon, appid: `${API_KEY}` },
    });
    // console.log("convertCoordToName - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't convert Coordinate to Province's name: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default convertCoordToName;
