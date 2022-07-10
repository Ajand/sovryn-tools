/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { injected, portis, ledger, trezor } from "./connectors";
import { useNavigate, useLocation } from "react-router-dom";

export default function ButtonAppBar() {
  const [openConnection, setOpenConnect] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  useEffect(() => {
    if (window.ethereum) {
      const changeChain = (chainId) => {
        if (chainId !== "0x1f" && chainId !== "0x1e") {
          window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x1e",
                chainName: "RSK Mainnet",
                nativeCurrency: {
                  name: "RSK Bitcoin",
                  symbol: "RBTC",
                  decimals: 18,
                },
                rpcUrls: ["https://public-node.rsk.co"],
                blockExplorerUrls: ["https://explorer.rsk.co"],
              },
            ],
          });
        }
      };

      window.ethereum.on("connect", ({ chainId }) => changeChain(chainId));
    }

    //window.ethereum.on("chainChanged", (_chainId) => changeChain(_chainId));
  }, []);

  const connect = async (walletType) => {
    try {
      await activate(walletType);
      setOpenConnect(false);
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
    <>
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
                    setOpenConnect(true);
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
      <Dialog onClose={() => setOpenConnect(false)} open={openConnection}>
        <DialogTitle>Set backup account</DialogTitle>
        <DialogContent>
          <Button
            css={css`
              margin-right: 1em;
            `}
            onClick={async () => connect(portis)}
            variant="text"
          >
            Portis
          </Button>
          <Button
            css={css`
              margin-right: 1em;
            `}
            onClick={async () => {
              connect(injected);
            }}
            variant="text"
          >
            Metamask
          </Button>
          <Button
            css={css`
              margin-right: 1em;
            `}
            onClick={async () => connect(trezor)}
            variant="text"
          >
            Trezor
          </Button>
          <Button
            css={css`
              margin-right: 1em;
            `}
            onClick={async () => connect(ledger)}
            variant="text"
          >
            Ledger
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
