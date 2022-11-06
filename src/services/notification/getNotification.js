import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getNotification = async (id) => {
  try {
    // console.log("ID Notification: ", id);
    const response = await axios.get(`${REQUEST_URL}/notification/${id}`);
    // console.log("getNotification - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Can't get Notification: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getNotification;
