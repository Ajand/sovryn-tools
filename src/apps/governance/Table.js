/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
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

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row, contract } = props;
  const [open, setOpen] = React.useState(false);
  const [additionalData, setAdditionalData] = useState(null);

  const theme = useTheme();

  const notOwnerParams = contract.params.filter(
    (param) => param.identifier !== "owner"
  );

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
              {formatAddress(contract.governor?.value)}
            </Link>
          ) : contract.governor?.loading ? (
            "Loading"
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell align="center">
          <Chip label={contract.categoryName} variant="outlined" />
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
        <Dialog onClose={() => setAdditionalData(null)} open={additionalData}>
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
                {[...additionalData.value].map((aD) => {
                  return (
                    <TableRow>
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
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable({
  governanceState,
  selectedCategories,
}) {
  const contracts = governanceState.categories.reduce((pV, cV) => {
    return [
      ...pV,
      ...cV.contracts.map((cont) => ({
        params: cont.getParams(),
        categoryName: cV.categoryName,
        ...cont,
      })),
    ];
  }, []);

  const allCategories = governanceState.categories.map(
    (cat) => cat.categoryName
  );

  const filterSelectedCategories =
    (allContracts) =>
    (categories = []) => {
      if (categories.length === 0) return allContracts;
      return allContracts.filter((cont) =>
        categories.includes(cont.categoryName)
      );
    };

  const filterBySearchString = (allContracts) => (searchStr) => {
    if (!searchStr) return allContracts;
    const result = new Set([]);
    allContracts
      .filter(
        (cont) =>
          cont.contractName.toLowerCase().indexOf(searchStr.toLowerCase()) > -1
      )
      .forEach((cont) => result.add(cont));
    allContracts
      .filter((cont) => {
        return cont.address.toLowerCase().indexOf(searchStr.toLowerCase()) > -1;
      })
      .forEach((cont) => result.add(cont));
    allContracts
      .filter((cont) => cont.governor?.value)
      .filter((cont) => {
        return (
          cont.governor?.value.toLowerCase().indexOf(searchStr.toLowerCase()) >
          -1
        );
      })
      .forEach((cont) => result.add(cont));
    return [...result];
  };

  const getContractName = (allContracts) => (contractAddress) => {
    return allContracts.find(
      (cont) => cont.address.toLowerCase() === contractAddress.toLowerCase()
    )?.contractName;
  };

  const renderableContracts = utils.filterSelectedCategories(
    utils.getContracts(governanceState)
  )(selectedCategories);

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
              row={rows[0]}
              contract={contract}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
