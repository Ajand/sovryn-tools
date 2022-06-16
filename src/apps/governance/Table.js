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
import { Chip } from "@mui/material";
import { useTheme } from "@mui/material";

import GovernanceData from "sovryn-governance-data";

const governanceData = new GovernanceData(localStorage);

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

  const theme = useTheme();

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
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
        <TableCell align="center">{contract.address}</TableCell>
        <TableCell align="center">{contract.governor?.value}</TableCell>
        <TableCell align="center">
          <Chip
            color="primary"
            label={contract.categoryName}
            variant="outlined"
          />
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
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell align="center" component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.customerId}
                      </TableCell>
                      <TableCell align="center">{historyRow.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
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

export default function CollapsibleTable() {
  const [governanceState, setGovernanceState] = useState(
    governanceData.getData()
  );

  useEffect(() => {
    governanceData.onChange((currentData) => {
      setGovernanceState(currentData);
    });
  }, []);

  const contracts = governanceState.categories.reduce((pV, cV) => {
    return [
      ...pV,
      ...cV.contracts.map((cont) => ({
        categoryName: cV.categoryName,
        ...cont,
      })),
    ];
  }, []);

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
          {contracts.map((contract) => (
            <Row key={contract.address} row={rows[0]} contract={contract} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
