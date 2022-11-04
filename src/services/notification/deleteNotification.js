import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const deleteNotification = async (id) => {
  try {
    // console.log("ID Notification: ", id);
    const response = await axios.delete(`${REQUEST_URL}/notification/${id}`);
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't delete Notification: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default deleteNotification;