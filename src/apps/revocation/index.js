/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import getAllEventsForAnAddress from "./getAllEventsForAnAddress";
import filterApprovalEvents from "./filterApprovalEvents";
import findApprovalAddresses from "./findApprovalAddresses";
import getAddressBalances from "./getAddressBalances";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";

import RevocationTable from "./RevocationTable";

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

  return (
    <div
      css={css`
        margin: 2em;
      `}
    >
      <RevocationTable balances={balances} tac={tac} />
    </div>
  );
};

export default Revocation;
