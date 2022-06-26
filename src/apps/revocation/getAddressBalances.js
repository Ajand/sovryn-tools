import axios from "axios";
const getAddressBalances = (address) => {
  return new Promise((resolve, reject) => {
    const key = "ckey_c9c5be34b110429bab5387c7873";
    const chainId = 30;
    const baseUri = "https://api.covalenthq.com/v1";

    var config = {
      method: "get",
      url: `${baseUri}/${chainId}/address/${address}/balances_v2/?key=${key}`,
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

export default getAddressBalances;
