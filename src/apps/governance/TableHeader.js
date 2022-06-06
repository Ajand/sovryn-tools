/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Paper, IconButton, TextField, Chip } from "@mui/material";
import { FilterList, FilterListOff } from "@mui/icons-material";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";

const categoryLists = [
  "Glover Teixeira",
  "Jiri Prochazka",
  "Tactical Breakdown",
  "Hardy Breakdown",
  "getting himself",
  "training and nutrition",
  "Starting to see",
  "that fought Dom",
  "like an executioner",
  "against Jiri",
  "light heavyweight",
  "title on the line",
  "Hardy takes an in",
  "against a very tough",
  "round bouts",
];

const TableHeader = () => {
  const [selectFilter, setSelectFilter] = useState(false);
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
