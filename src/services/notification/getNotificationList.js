import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const getNotificationList = async (idUser) => {
  try {
    const response = await axios.get(
      `${REQUEST_URL}/notification/user/${idUser}`
    );
    // console.log("getNotificationList - Response from server: ", response.data);
    return response.data;
  } catch (err) {
    console.log("getNotificationList - Can't get Notification List: ", {
      err: JSON.stringify(err),
    });
    throw err;
  }
};

export default getNotificationList;
