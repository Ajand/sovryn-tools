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

const Revocation = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const address = "0x4A87a2A017Be7feA0F37f03F3379d43665486Ff8";

  const [balances, setBalances] = useState(null);
  const [tac, setTac] = useState(null);

  useEffect(() => {
    getAllEventsForAnAddress(address)
      .then((r) => {
        setTac(findApprovalAddresses(address)(r.data.items));
      })
      .catch((err) => {
        console.log(err);
      });

    getAddressBalances(address)
      .then((r) => setBalances(r))
      .catch((err) => console.log(err));
  }, []);

  console.log(active);

  return (
    <div
      css={css`
        margin: 2em;
      `}
    >
      {active ? (
        <RevocationTable balances={balances} tac={tac} />
      ) : (
        <ConnectFirst />
      )}
    </div>
  );
};

export default Revocation;
