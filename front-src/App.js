import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Manage } from "./component/Manage/Manage";
import { List } from "./component/List/List";
import { Test } from "./component/test";
//import { BuyNsureNetwork } from "./component/NsureNetwork/buy";
//import { BuyNsureNetwork } from "./component/NsureNetwork/buy_cn";
import { BuyNsureNetwork } from "./component/NsureNetwork/buyFromNsure";
import { NexusSign } from "./component/Nexus/quoteSignData";
import { Web3Test } from "./component/web3Test";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/manage" component={Manage}></Route>
          <Route path="/list" component={List}></Route>
          <Route path="/buy" component={BuyNsureNetwork}></Route>
          <Route path="/nexusSign" component={NexusSign}></Route>
          <Route path="/test" component={Web3Test}></Route>
        </Switch>
      </Router>
    </>
  );
};
export default App;
