// RESET STATUS TO READ/UNREAD
import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const modifyNotification = async (notificationData) => {
  try {
    // console.log("modifyNotification - Notification: ", notificationData);
    const response = await axios.put(
      `${REQUEST_URL}/notification/${notificationData._id}`,
      notificationData
    );
    // console.log("modifyNotification - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("modifyNotification - Can't modify Notification: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default modifyNotification;
