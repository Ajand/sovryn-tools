/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Paper, IconButton, TextField, Chip } from "@mui/material";
import { FilterList, FilterListOff } from "@mui/icons-material";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import { utils } from "sovryn-governance-data";

const TableHeader = ({
  governanceState,
  selectedCategories,
  selectCategories,
  setSelectedCategories,
}) => {
  const categoryLists = utils.getAllCategories(governanceState);

  const [selectFilter, setSelectFilter] = useState(false);

  const changeSelectFilter = () => setSelectFilter(!selectFilter);

  return (
    <Paper
      css={css`
        padding: 1em;
        margin-bottom: 1em;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            display: inline-block;
          `}
        >
          <IconButton onClick={changeSelectFilter}>
            {selectFilter ? <FilterListOff /> : <FilterList />}
          </IconButton>
        </div>
        <div
          css={css`
            display: inline-block;
            width: calc(100% - 60px);
          `}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Search By Contract Name, Address, Parameter or  Governer Address"
          />
        </div>
      </div>

      <Collapse in={selectFilter} timeout="auto" unmountOnExit>
        <div
          css={css`
            margin-top: 0.5em;
          `}
        >
          <Chip
            css={css`
              padding: 0.25em;
              margin-right: 0.25em;
              margin-top: 0.5em;
            `}
            color="primary"
            variant={selectedCategories.size === 0 ? "filled" : "outlined"}
            label="All"
            onClick={() => {
              setSelectedCategories(new Set([]));
            }}
          />
          {categoryLists.map((category) => (
            <Chip
              css={css`
                padding: 0.25em;
                margin-right: 0.25em;
                margin-top: 0.5em;
              `}
              key={category}
              variant={selectedCategories.has(category) ? "filled" : "outlined"}
              label={category}
              onClick={() => {
                selectCategories(category);
              }}
            />
          ))}
        </div>
      </Collapse>
    </Paper>
  );
};

export default TableHeader;
