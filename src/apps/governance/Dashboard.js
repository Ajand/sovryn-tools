/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TableHeader from "./TableHeader";
import Table from "./Table";
import { Paper, TableContainer, useTheme } from "@mui/material";
import GovernanceData from "sovryn-governance-data";
import { useEffect, useState } from "react";

const governanceData = new GovernanceData(
  localStorage,
  "https://mainnet.sovryn.app/"
);

const Dashboard = () => {
  const theme = useTheme();
  const [governanceState, setGovernanceState] = useState(
    governanceData.getData()
  );

  const [selectedCategories, setSelectedCategories] = useState(new Set());

  const selectCategories = (category) => {
    const nS = new Set([...selectedCategories]);
    if (nS.has(category)) {
      nS.delete(category);
    } else {
      nS.add(category);
    }
    setSelectedCategories(nS);
  };

  useEffect(() => {
    governanceData.onChange((currentData) => {
      setGovernanceState(currentData);
    });
  }, []);

  return (
    <div
      css={css`
        margin: 2em;
      `}
    >
      <TableHeader
        selectedCategories={selectedCategories}
        selectCategories={selectCategories}
        setSelectedCategories={setSelectedCategories}
        governanceState={governanceState}
      />
      <TableContainer component={Paper}>
        <Table
          governanceState={governanceState}
          selectedCategories={[...selectedCategories]}
        />
      </TableContainer>
    </div>
  );
};

export default Dashboard;
