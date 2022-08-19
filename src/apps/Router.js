import { useEffect, useState } from "react";
import Header from "./common/Header";
import Revocation from "./revocation";
import Governance from "./governance/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GovernanceData from "sovryn-governance-data";
const governanceData = new GovernanceData(
  localStorage,
  process.env.REACT_APP_RSK_RPC_URL,
  process.env.REACT_APP_ETH_RPC_URL,
  process.env.REACT_APP_BSC_RPC_URL
);

const Router = () => {
  const [governanceState, setGovernanceState] = useState(
    governanceData.getData()
  );
  useEffect(() => {
    governanceData.onChange((currentData) => {
      setGovernanceState(currentData);
    });
  }, []);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={<Governance governanceState={governanceState} />}
        />
        <Route
          path="/revocation"
          element={<Revocation governanceState={governanceState} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
