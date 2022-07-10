/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Chip, Link, Button, Dialog, DialogTitle } from "@mui/material";
import { useTheme } from "@mui/material";
import formatAddress from "../../utils/formatAddress";

import { utils } from "sovryn-governance-data";

const Row = ({ contract, getContractName }) => {
  const [open, setOpen] = React.useState(false);
  const [additionalData, setAdditionalData] = useState(null);

  const theme = useTheme();

  const notOwnerParams = contract.params.filter(
    (param) => param.identifier !== "owner"
  );

  if (additionalData) {
    console.log(additionalData);
  }

  let targetCategoryName = contract.categoryName;
  if (targetCategoryName === "Marginal Trading Protocol") {
    targetCategoryName = "Margin Trading Protocol";
  }
  if (targetCategoryName === "Aggeregators") {
    targetCategoryName = "Aggregators";
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="center">
          {!!notOwnerParams.length && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell
          css={css`
            color: ${theme.palette.primary.main};
          `}
          align="center"
          component="th"
          scope="row"
        >
          {contract.contractName}
        </TableCell>
        <TableCell align="center">
          <Link
            target="_blank"
            href={`https://explorer.rsk.co/address/${contract.address}`}
          >
            {formatAddress(contract.contract.address)}
          </Link>
        </TableCell>
        <TableCell align="center">
          {contract.governor.value ? (
            <Link
              target="_blank"
              href={`https://explorer.rsk.co/address/${contract.governor?.value}`}
            >
              {getContractName(contract.governor.value)
                ? getContractName(contract.governor.value)
                : formatAddress(contract.governor?.value)}
            </Link>
          ) : contract.governor?.loading ? (
            "Loading"
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell align="center">
          <Chip label={targetCategoryName} variant="outlined" />
        </TableCell>
      </TableRow>
      <TableRow
        css={css`
          background: ${theme.palette.action.hover};
        `}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Parameters
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Identifier</TableCell>
                    <TableCell align="center">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notOwnerParams.map((param) => (
                    <TableRow
                      key={`${notOwnerParams.identifier}:${param?.name}`}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {param?.name}
                      </TableCell>
                      <TableCell align="center">{param.identifier}</TableCell>
                      <TableCell align="center">
                        {param?.value instanceof Map ? (
                          <Button
                            onClick={() => setAdditionalData(param)}
                            size="small"
                          >
                            Show Details
                          </Button>
                        ) : param.value ? (
                          String(param.value)
                        ) : param.loading ? (
                          "Loading"
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {additionalData && (
        <Dialog onClose={() => setAdditionalData(null)} open={!!additionalData}>
          <DialogTitle>{additionalData?.name}</DialogTitle>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Key</TableCell>
                  <TableCell align="center">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...additionalData.value].map((aD, i) => {
                  return (
                    <TableRow key={`${String(aD[0])}:${i}`}>
                      <TableCell align="center">{String(aD[0])}</TableCell>
                      <TableCell align="center">{aD[1].toString()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default function CollapsibleTable({
  governanceState,
  selectedCategories,
  searchString,
}) {
  const renderableContracts = utils.filterBySearchString(
    utils.filterSelectedCategories(utils.getContracts(governanceState))(
      selectedCategories
    )
  )(searchString);

  const getContractName = utils.getContractName(
    utils.getContracts(governanceState)
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">Contract Name</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Governor</TableCell>
            <TableCell align="center">Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderableContracts.map((contract, i) => (
            <Row
              key={`${contract.address}:${i}`}
              contract={contract}
              getContractName={getContractName}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
