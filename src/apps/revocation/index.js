import { ethers } from "ethers";
import { useEffect } from "react";
import getAllEventsForAnAddress from "./getAllEventsForAnAddress";
import filterApprovalEvents from "./filterApprovalEvents";
import findApprovalAddresses from "./findApprovalAddresses";

const Revocation = () => {
  useEffect(() => {
    getAllEventsForAnAddress()
      .then((r) => {
        console.log(findApprovalAddresses("0x1996a1c4597721edafa2ffe433b0c26b25494ec9")(r.data.items));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>This is the Revocation part</div>;
};

export default Revocation;
