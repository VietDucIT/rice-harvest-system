import axios from "axios";

import REQUEST_URL from "../urlToBackend";

const deleteSuggestToBuy = (id) => {
  return new Promise(async (resolve, reject) => {
    const { data, status } = await axios.post(
      `${REQUEST_URL}/suggest-to-buy/${id}/delete`
    );
    // console.log('Data', data);
    // console.log('Status', status);

    if (status === 200) {
      resolve(data);
    } else {
      reject("Can't delete Suggest To Buy.");
    }
  });
};

export default deleteSuggestToBuy;
