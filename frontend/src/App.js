import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Producer from "./pages/Producer";
import Dashboard from "./pages/Dashboard";
import CreateProduct from "./pages/CreateProduct";
import  Ipfs from "./pages/Ipfs";


import abis from "./abi/abis";
import addresses from "./abi/addresses";
import useContract from "./hooks/useContract";
import useAccount from "./hooks/useAccount";
import useProvider from "./hooks/useProvider";




function App() {

  return (
    <Router>
      <div className="container">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/producer" element={<Producer />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/newproduct" element={<CreateProduct />} />
          <Route path="/ipfs" element={<Ipfs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
