import axios from "axios";
const getAllEventsForAnAddress = () => {
  return new Promise((resolve, reject) => {
    const pageSize = 100000;
    const address = "0x1996a1c4597721edafa2ffe433b0c26b25494ec9";
    const key = "ckey_c9c5be34b110429bab5387c7873";
    const chainId = 30;
    const baseUri = "https://api.covalenthq.com/v1";

    var config = {
      method: "get",
      url: `${baseUri}/${chainId}/address/${address}/transactions_v2/?key=${key}&page-size=${pageSize}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        return resolve(response.data);
      })
      .catch(function (error) {
        return reject(error);
      });
  });
};

export default getAllEventsForAnAddress;
