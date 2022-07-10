/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TableHeader from "./TableHeader";
import Table from "./Table";
import { Paper, TableContainer, useTheme } from "@mui/material";
import { useState } from "react";

const Dashboard = ({ governanceState }) => {
  const theme = useTheme();

  const [searchString, setSearchString] = useState("");

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
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <TableContainer component={Paper}>
        <Table
          governanceState={governanceState}
          selectedCategories={[...selectedCategories]}
          searchString={searchString}
        />
      </TableContainer>
    </div>
  );
};

export default Dashboard;
