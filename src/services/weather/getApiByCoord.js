import axios from "axios";

import API_KEY from "./apiKey";

const REQUEST_URL = "https://api.openweathermap.org/data/3.0";

const getWeatherByCoord = async (lon, lat) => {
  try {
    console.log(`getWeatherByCoord - Coordinate: (${lat}, ${lon})`);
    const response = await axios.get(`${REQUEST_URL}/onecall`, {
      params: { lat: lat, lon: lon, appid: `${API_KEY}` },
    });
    // console.log("getWeatherByCoord - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("getWeatherByCoord - Can't get Weather data by Coordinate: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getWeatherByCoord;
