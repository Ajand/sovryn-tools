import { useEffect, useState } from "react";
import Router from "./apps/Router";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers, Web3 } from "ethers";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FEC004",
    },
    secondary: {
      main: "#E8E8E8",
    },
    text: {
      primary: "#E8E8E8",
    },
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

function getLibrary(provider) {
  const target = new ethers.providers.Web3Provider(provider);
  return target;
}

function App() {
  return (
    <div>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>{" "}
      </Web3ReactProvider>
    </div>
  );
}

export default App;
