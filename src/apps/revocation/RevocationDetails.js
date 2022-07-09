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
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import PlaceholderLoading from "react-placeholder-loading";
import useRevoke from "../utils/hooks/useRevoke";

const RevocationDetails = ({ tac, row, open, token }) => {
  const { account } = useWeb3React();

  const revoke = useRevoke();

  const [allowance, setAllowance] = useState(new Map());

  useEffect(() => {
    if (hasAllowances(tac, row.contract_address) && token) {
      tacArray(tac, row.contract_address).forEach((target) => {
        token
          .allowance(account, target)
          .then(async (r) => {
            const decimals = await token.decimals();
            const currAllowance = new Map(allowance);
            currAllowance.set(
              target,
              ethers.utils.formatUnits(String(r), decimals)
            );
            setAllowance(currAllowance);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }, [token]);

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
                  <TableCell align="center">Amount</TableCell>
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
                        <TableCell align="center">
                          {allowance.get(contractAddress) ? (
                            allowance.get(contractAddress)
                          ) : (
                            <PlaceholderLoading
                              shape="rect"
                              width={60}
                              height={16}
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={async () => {
                              await revoke({
                                tokenAddress: token.address,
                                target: contractAddress,
                                amount: 40,
                              });
                            }}
                          >
                            Revoke
                          </Button>
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
