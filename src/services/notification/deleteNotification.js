import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const deleteNotification = async (id) => {
  try {
    // console.log("deleteNotification - ID Notification: ", id);
    const response = await axios.delete(`${REQUEST_URL}/notification/${id}`);
    // console.log("deleteNotification - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("deleteNotification - Can't delete Notification: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default deleteNotification;
