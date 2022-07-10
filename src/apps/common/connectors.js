import { InjectedConnector } from "@web3-react/injected-connector";
import { PortisConnector } from "@web3-react/portis-connector";
import { LedgerConnector } from "@web3-react/ledger-connector";
import { TrezorConnector } from "@web3-react/trezor-connector";

const POLLING_INTERVAL = 12000;

export const injected = new InjectedConnector({
  supportedChainIds: [30, 31],
});

export const portis = new PortisConnector({
  dAppId: process.env.REACT_APP_PORTIS_DAPP_ID,
  networks: [30, 31],
});

export const ledger = new LedgerConnector({
  chainId: 30,
  url: process.env.REACT_APP_RSK_RPC_URL,
  pollingInterval: POLLING_INTERVAL,
});

export const trezor = new TrezorConnector({
  chainId: 30,
  url: process.env.REACT_APP_RSK_RPC_URL,
  pollingInterval: POLLING_INTERVAL,
  manifestEmail: "dummy@abc.xyz",
  manifestAppUrl: "http://localhost:1234",
});
