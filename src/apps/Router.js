import Header from "./common/Header";
import Revocation from "./revocation";
//import Governance from './governance/Dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
      {/*  <Route path="/" element={<Governance />} /> */}
        <Route path="/revocation" element={<Revocation />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
