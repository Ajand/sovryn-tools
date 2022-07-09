/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, Fragment } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Link,
  Avatar,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import erc20 from "../utils/contracts/erc20";

import RevocationDetails from "./RevocationDetails";

const RevocationRow = ({ row, tac }) => {
  const [open, setOpen] = useState(false);

  const { library, account, provider } = useWeb3React();

  let token;
  if (library) {
    token = new ethers.Contract(row.contract_address, erc20, library);
    token
      .allowance(
        "0x4A87a2A017Be7feA0F37f03F3379d43665486Ff8",
        "0x61172b53423e205a399640e5283e51fe60ec2256"
      )
      .then(async (r) => {
        const decimals = await token.decimals();
        console.log(ethers.utils.formatUnits(String(r), decimals));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const revoke = () => {
    if (library) {
      const signer = library.getSigner();
      console.log(signer);

      token = new ethers.Contract(row.contract_address, erc20, signer);

      token
        .approve(
          "0x61172b53423e205a399640e5283e51fe60ec2256",
          ethers.utils.parseUnits("5", 18)
        )
        .then((r) => console.log(r))
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const haveContractsWithAllowances =
    tac &&
    tac.get(row.contract_address) &&
    [...tac.get(row.contract_address)].length;

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          {haveContractsWithAllowances ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          ) : null}
        </TableCell>
        <TableCell component="th" scope="row">
          <Avatar
            src={`${row.logo_url}`}
            css={css`
              width: 45px;
              height: 45px;
            `}
            alt={row.contract_name}
          />
        </TableCell>
        <TableCell align="center">
          <Link
            target="_blank"
            href={`https://explorer.rsk.co/address/${row.contract_address}`}
          >
            {row.contract_name}
          </Link>
        </TableCell>
        <TableCell align="center">{row.contract_ticker_symbol}</TableCell>
        <TableCell align="center">
          {tac
            ? tac.get(row.contract_address)
              ? [...tac.get(row.contract_address)].length
              : 0
            : "Loading"}
        </TableCell>
        <TableCell align="center">{row.protein}</TableCell>
      </TableRow>
      <RevocationDetails revoke={revoke} tac={tac} row={row} open={open} />
    </Fragment>
  );
};

export default RevocationRow;
