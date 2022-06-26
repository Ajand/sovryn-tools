import { ethers } from "ethers";
import { useEffect } from "react";
import getAllEventsForAnAddress from "./getAllEventsForAnAddress";
import filterApprovalEvents from "./filterApprovalEvents";
import findApprovalAddresses from "./findApprovalAddresses";
import getAddressBalances from "./getAddressBalances";

const Revocation = () => {

  const address = "0x1996a1c4597721edafa2ffe433b0c26b25494ec9";

  useEffect(() => {
    getAllEventsForAnAddress(address)
      .then((r) => {
        console.log(
          findApprovalAddresses("0x1996a1c4597721edafa2ffe433b0c26b25494ec9")(
            r.data.items
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });

    getAddressBalances(address)
      .then((r) => console.log(r))
      .catch((err) => console.log(err));
  }, []);
  return <div>This is the Revocation part</div>;
};

export default Revocation;
