import axios from "axios";

const REQUEST_URL = "https://api.openweathermap.org/data/3.0";
const APP_ID = "bb9bbd0e67532f3f8e965fe6fba10ece";

const getWeatherByName = (city) => {
  // console.log("From getApiByName.js: city = ", city)
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios(`${REQUEST_URL}/weather`, {
      params: { q: city, appid: `${APP_ID}` },
    });
    // console.log("From getApiByName.js: current = ", data);

    if (status === 200) {
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const { data: fullData, status: fullStatus } = await axios(
        `${REQUEST_URL}/onecall`,
        { params: { lat: lat, lon: lon, appid: `${APP_ID}` } }
      );
      // console.log("From getApiByName.js: fullData = ", fullData);
      // console.log('fullStatus', fullStatus);

      if (fullStatus === 200) {
        resolve(fullData);
      } else {
        reject("Can't get coordinate of this city.");
      }
    } else {
      reject("Can't find this city.");
    }
  });
};

export default getWeatherByName;
