import axios from "axios";

import API_KEY from "./apiKey";

const REQUEST_URL = "https://api.openweathermap.org/data/3.0";

const getWeatherByCoord = async (lon, lat) => {
  try {
    console.log(`Coordinate: (${lat}, ${lon})`);
    const response = await axios.get(`${REQUEST_URL}/onecall`, {
      params: { lat: lat, lon: lon, appid: `${API_KEY}` },
    });
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't get weather data by coordinate: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getWeatherByCoord;
