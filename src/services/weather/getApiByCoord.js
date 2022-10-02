import axios from "axios";

import ApiKey from "./apiKey";

const REQUEST_URL = "https://api.openweathermap.org/data/3.0";
const APP_ID = ApiKey;

const getWeatherByCoord = (lon, lat) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios(`${REQUEST_URL}/onecall`, {
      params: { lat: lat, lon: lon, appid: `${APP_ID}` },
    });
    // console.log('status', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't get weather data by coordinate of this city.");
    }
  });
};

export default getWeatherByCoord;
