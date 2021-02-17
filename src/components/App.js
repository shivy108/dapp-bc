import React, { Component } from "react";
import "./App.css";
import {
  loadAccount,
  loadExchange,
  loadToken,
  loadWeb3,
} from "../store/interactions";
import { connect } from "react-redux";
import { contractsLoadedSelector } from "../store/selectors";
import NavBar from "./NavBar";
import Content from "./Content";

class App extends Component {
  componentWillMount() {
    // this.l
    this.getData(this.props.dispatch);
  }

  getData = async (dispatch) => {
    const web3 = await loadWeb3(dispatch);
    const networkId = await web3.eth.net.getId();
    await window.ethereum.enable();
    await loadAccount(web3, dispatch);
    await loadToken(web3, networkId, dispatch);
    // if (token) {
    //   window.alert(
    //     "Token smart contract not detected on the current network. Please select another network on metemask"
    //   );
    // }
    await loadExchange(web3, networkId, dispatch);
    // if (exchange) {
    //   window.alert(
    //     "Exchange smart contract not detected on the current network. Please select another network on metemask"
    //   );
    // }
  };

  render() {
    return (
      <div>
        <NavBar />
        {this.props.contractsLoaded ? (
          <Content />
        ) : (
          <div className="content"></div>
        )}
        <Content />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contractsLoaded: contractsLoadedSelector(state),
  };
}

export default connect(mapStateToProps)(App);
