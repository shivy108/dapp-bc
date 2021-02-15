import Web3 from "web3";
import Token from "../abis/Token.json";
import Exchange from "../abis/Exchange.json";
import {
  exchangeLoaded,
  tokenLoaded,
  web3AccountLoaded,
  web3Loaded,
} from "./actions";

export const loadWeb3 = (dispatch) => {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

  dispatch(web3Loaded(web3));
  return web3;
};

export const loadAccount = async (web3, dispatch) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  dispatch(web3AccountLoaded(account));
  return account;
};

export const loadToken = async (web3, networkId, dispatch) => {
  try {
    const token = new web3.eth.Contract(
      Token.abi,
      Token.networks[networkId].address
    );
    dispatch(tokenLoaded(token));
    return token;
  } catch (error) {
    console.log(error);
    window.alert("kkk");
    return null;
  }
};

export const loadExchange = async (web3, networkId, dispatch) => {
  try {
    const exchange = new web3.eth.Contract(
      Exchange.abi,
      Exchange.networks[networkId].address
    );
    dispatch(exchangeLoaded(exchange));
    return exchange;
  } catch (error) {
    console.log(error);
    window.alert("kkk");
    return null;
  }
};
