import React, { useState, useEffect, Component } from "react";
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom"; 
import getWeb3 from "./getWeb3";
import FactoryContract from "./contracts/FundraiserFactory.json";
import "./App.css";

import Home from "./Home.js";
import NewFundraiser from "./NewFundraiser.js";

import {makeStyles} from '@material-ui/core';
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const App = () => {
  const [state, setState] = useState({web3: null, accounts: null, contract: null});
  const [storageValue, setStorageValue] = useState(0);

  useEffect(() => {
    const init = async() => {
      try{
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FactoryContract.networks[networkId];
        const instance = new web3.eth.Contract(FactoryContract.abi, deployedNetwork && deployedNetwork.address);

        setState({web3, accounts, contract: instance});
      } catch(error){
        alert(`Failed to load web3, accounts, or contract. Check console for details.`);
        console.error(error);
      }
    }

    init();
  }, []);

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

  const classes = useStyles();

  const runExample = async() => {
    const {accounts, contract} = state;
  };

  return(
    <div className="App">
      <Router>
        <div>
          <AppBar position="static" color='default'>
            <Toolbar>
              <Typography variant="h6" color="inherit">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </Typography>
              <NavLink className="nav-link" to="/new/">New Fundraiser</NavLink>
            </Toolbar>
          </AppBar>

          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/new/" element={<NewFundraiser/>}/>
          </Routes>

        </div>
      </Router>
    </div>
  );
}
export default App;