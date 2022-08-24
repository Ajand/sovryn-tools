/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, Fragment, useMemo } from "react";
import {
  IconButton,
  TableCell,
  TableRow,
  Link,
  Avatar,
  Button,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import erc20 from "../utils/contracts/erc20";
import useRevoke from "../utils/hooks/useRevoke";

import RevocationDetails from "./RevocationDetails";

const RevocationRow = ({ row, tac, governanceState }) => {
  const [open, setOpen] = useState(false);

  const { library } = useWeb3React();

  const revoke = useRevoke();

  const token = useMemo(
    () => new ethers.Contract(row.contract_address, erc20, library),
    [library, row]
  );

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
        <TableCell align="center">
          {haveContractsWithAllowances && (
            <Button
              variant="outlined"
              onClick={async () => {
                const revokeRecur = async (targetArray) => {
                  if (targetArray.length === 0) return;
                  await revoke({
                    tokenAddress: token.address,
                    target: targetArray[0],
                  });
                  return revokeRecur(targetArray.slice(1, targetArray.length));
                };

                revokeRecur([...tac.get(row.contract_address)]);
              }}
            >
              Revoke All
            </Button>
          )}
        </TableCell>
      </TableRow>
      <RevocationDetails governanceState={governanceState} tac={tac} row={row} open={open} token={token} />
    </Fragment>
  );
};

export default RevocationRow;
