import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

import erc20 from "../contracts/erc20";

const useRevoke = () => {
  const { library, account } = useWeb3React();

  const signer = library.getSigner();

  const revoke = async ({ tokenAddress, target, amount }) => {
    const token = new ethers.Contract(tokenAddress, erc20, signer);

    const targetAmount = amount
      ? ethers.utils.parseUnits(String(amount), await token.decimals())
      : 0;

    if (targetAmount === 0 && (await token.allowance(account, target)).eq(0)) {
      return true;
    }

    return await token.approve(target, targetAmount);
  };

  return revoke;
};

export default useRevoke;
