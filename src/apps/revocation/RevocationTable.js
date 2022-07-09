/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import PlaceholderLoading from "react-placeholder-loading";
import RevocationRow from "./RevocationRow";

const RevocationTable = ({ balances, tac }) => {
  const loading = balances ? false : true;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Token Name</TableCell>
            <TableCell align="center">Token Symbol</TableCell>
            <TableCell align="center">Contracts With Allowance</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? [1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i}>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">
                    <PlaceholderLoading shape="circle" width={40} height={40} />
                  </TableCell>
                  <TableCell align="center">
                    <PlaceholderLoading shape="rect" width={120} height={16} />
                  </TableCell>
                  <TableCell align="center">
                    <PlaceholderLoading shape="rect" width={60} height={16} />
                  </TableCell>
                  <TableCell align="center">
                    <PlaceholderLoading shape="rect" width={120} height={16} />
                  </TableCell>
                </TableRow>
              ))
            : balances.data.items.map((row, i) => (
                <RevocationRow key={i} row={row} tac={tac} />
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RevocationTable;
