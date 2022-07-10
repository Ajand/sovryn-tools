/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./connectors";
import { useNavigate, useLocation } from "react-router-dom";

export default function ButtonAppBar() {
  const location = useLocation();

  const navigate = useNavigate();

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);
    } catch (err) {
      console.log(err);
    }
  };

  const disconnect = async () => {
    try {
      await deactivate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <div
            css={css`
              display: flex;
            `}
          >
            <Typography variant="h6" component="div">
              SOVRYN.Tools
            </Typography>
            <Button
              round
              css={css`
                margin-left: 1.5em;
                border-radius: 0;
              `}
              style={
                location.pathname == "/"
                  ? { borderBottom: "2px solid #FEC004" }
                  : null
              }
              onClick={() => navigate("/")}
            >
              Governance Dashboard
            </Button>
            <Button
              onClick={() => navigate("/revocation")}
              css={css`
                margin-left: 0.5em;
                border-radius: 0;
              `}
              style={
                location.pathname == "/revocation"
                  ? { borderBottom: "2px solid #FEC004" }
                  : null
              }
            >
              Revocation Tool
            </Button>
          </div>
          <div>
            <Button
              onClick={async () => {
                if (!active) {
                  await connect();
                } else {
                  await disconnect();
                }
              }}
              color="inherit"
            >
              {active ? "Disconnect" : "Connect"}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
