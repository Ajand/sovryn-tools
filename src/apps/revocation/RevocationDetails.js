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
  TextField,
} from "@mui/material";
import { hasAllowances, tacArray } from "../utils/helpers";
import { useState, useEffect, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import PlaceholderLoading from "react-placeholder-loading";
import useRevoke from "../utils/hooks/useRevoke";
import { utils } from "sovryn-governance-data";

const RevocationDetails = ({ tac, row, open, token, governanceState }) => {
  const [editTarget, setEditTarget] = useState(null);
  const [editAmount, setEditAmount] = useState(null);
  const { account } = useWeb3React();

  const revoke = useRevoke();

  const refrenceAllowances = useMemo(() => new Map(), []);

  const [allowance, setAllowance] = useState(new Map());

  useEffect(() => {
    if (hasAllowances(tac, row.contract_address) && token) {
      const getAllowances = () =>
        tacArray(tac, row.contract_address).forEach((target) => {
          token
            .allowance(account, target)
            .then(async (r) => {
              const decimals = await token.decimals();
              refrenceAllowances.set(
                target,
                ethers.utils.formatUnits(String(r), decimals)
              );
              setAllowance(new Map(refrenceAllowances));
            })
            .catch((err) => {
              console.log(err);
            });
        });
      getAllowances();
      setInterval(() => {
        getAllowances();
      }, 30 * 1000);
    }
  }, [token, refrenceAllowances, account, tac, row.contract_address]);

  const getContractName = utils.getContractName(
    utils.getContracts(governanceState)
  );

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
                          {getContractName(contractAddress)
                            ? getContractName(contractAddress)
                            : contractAddress}
                        </TableCell>
                        <TableCell align="center">
                          {allowance.get(contractAddress) ? (
                            editTarget === contractAddress ? (
                              <TextField
                                variant="outlined"
                                label="Allowance Amount"
                                value={editAmount}
                                onChange={(e) => {
                                  setEditTarget(contractAddress);
                                  setEditAmount(e.target.value);
                                }}
                                size="small"
                              />
                            ) : (
                              allowance.get(contractAddress)
                            )
                          ) : (
                            <PlaceholderLoading
                              shape="rect"
                              width={60}
                              height={16}
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {editTarget !== contractAddress ? (
                            <>
                              <Button
                                size="small"
                                onClick={() => {
                                  setEditTarget(contractAddress);
                                  setEditAmount(allowance.get(contractAddress));
                                }}
                                disabled={!allowance.get(contractAddress)}
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={async () => {
                                  await revoke({
                                    tokenAddress: token.address,
                                    target: contractAddress,
                                  });
                                }}
                                css={css`
                                  margin-left: 0.5em;
                                `}
                                size="small"
                              >
                                Revoke
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                onClick={() => {
                                  setEditTarget(null);

                                  setEditAmount(null);
                                }}
                                size="small"
                              >
                                Cancel
                              </Button>
                              <Button
                                css={css`
                                  margin-left: 0.5em;
                                `}
                                variant="contained"
                                size="small"
                                disabled={isNaN(editAmount)}
                                onClick={async () => {
                                  await revoke({
                                    tokenAddress: token.address,
                                    target: contractAddress,
                                    amount: editAmount,
                                  });
                                  setEditAmount(null);
                                  setEditTarget(null);
                                  // TODO, should create an alert about processes is on going
                                }}
                              >
                                Change
                              </Button>
                            </>
                          )}
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
