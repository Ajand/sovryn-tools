/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import getAllEventsForAnAddress from "./getAllEventsForAnAddress";
import findApprovalAddresses from "./findApprovalAddresses";
import getAddressBalances from "./getAddressBalances";

import { useWeb3React } from "@web3-react/core";

import RevocationTable from "./RevocationTable";
import ConnectFirst from "./ConnectFirst";

const Revocation = ({ governanceState }) => {
  const { active, account, library, connector, activate, deactivate, chainId } =
    useWeb3React();

  const address = account;

  const [balances, setBalances] = useState(null);
  const [tac, setTac] = useState(null);

  useEffect(() => {
    if (address) {
      getAllEventsForAnAddress(chainId)(address)
        .then((r) => {
          setTac(findApprovalAddresses(address)(r.data.items));
        })
        .catch((err) => {
          console.log(err);
        });

      getAddressBalances(chainId)(address)
        .then((r) => {
          setBalances(r);
        })
        .catch((err) => console.log(err));
    }
  }, [account, chainId]);

  return (
    <div
      css={css`
        margin: 2em;
      `}
    >
      {active ? (
        <RevocationTable
          governanceState={governanceState}
          balances={balances}
          tac={tac}
        />
      ) : (
        <ConnectFirst />
      )}
    </div>
  );
};

export default Revocation;
