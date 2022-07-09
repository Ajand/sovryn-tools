/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import { hasAllowances, tacArray } from "../utils/helpers";

const RevocationDetails = ({ tac, revoke, row, open }) => {
  return (
    <TableRow>
      <TableCell
        css={css`
          background: #303030;
        `}
        style={{ paddingBottom: 0, paddingTop: 0 }}
        colSpan={6}
      >
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Allowances
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Contract Address</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hasAllowances(tac, row.contract_address) &&
                  tacArray(tac, row.contract_address).map(
                    (contractAddress, i) => (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          {contractAddress}
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell align="center">
                          <Button onClick={() => revoke()}>Revoke</Button>
                        </TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default RevocationDetails;
