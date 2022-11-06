import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getNotificationList = async () => {
  try {
    const response = await axios.get(`${REQUEST_URL}/notification/list`);
    // console.log("getNotificationList - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get Notification list: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getNotificationList;
