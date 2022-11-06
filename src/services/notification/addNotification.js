import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const addNotification = async (notificationData) => {
  try {
    // console.log("Notification: ", notificationData);
    const response = await axios.post(
      `${REQUEST_URL}/notification/`,
      notificationData
    );
    // console.log("addNotification - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't add Notification: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default addNotification;
