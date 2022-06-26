import { ethers } from "ethers";
import { useEffect } from "react";
import getAllEventsForAnAddress from "./getAllEventsForAnAddress";

const Revocation = () => {
  useEffect(() => {
    getAllEventsForAnAddress()
      .then((r) => {
        console.log(r);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>This is the Revocation part</div>;
};

export default Revocation;
