import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useWeb3React } from "@web3-react/core";
import { injected } from "./connectors";

export default function ButtonAppBar() {
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SOVRYN.Tools
          </Typography>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
