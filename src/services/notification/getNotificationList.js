import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getNotificationList = async () => {
  try {
    const response = await axios.get(`${REQUEST_URL}/notification/list`);
    // console.log("Response from server: ", response);
    return response.data;
  } catch (err) {
    console.log("Can't get Notification List: ", { err: JSON.stringify(err) });
    throw err;
  }
};

export default getNotificationList;
