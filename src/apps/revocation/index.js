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

import RevocationTable from "./RevocationTable";

const Revocation = () => {
  const address = "0x1996a1c4597721edafa2ffe433b0c26b25494ec9";

  const [balances, setBalances] = useState(null);
  const [tac, setTac] = useState(null);

  useEffect(() => {
    getAllEventsForAnAddress(address)
      .then((r) => {
        setTac(
          findApprovalAddresses("0x1996a1c4597721edafa2ffe433b0c26b25494ec9")(
            r.data.items
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });

    getAddressBalances(address)
      .then((r) => setBalances(r))
      .catch((err) => console.log(err));
  }, []);

  console.log(tac)

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
