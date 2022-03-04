import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { hexToNumber, fromWei, Units } from "@harmony-js/utils";
import { Axios, Canceler } from "../../../core/axios";
import * as actions from "../../actions";
import Auction from "../../../abi/NFTAuction.json";

const BN = require("bn.js");

const { Harmony } = require("@harmony-js/core");
const { ChainID, ChainType } = require("@harmony-js/utils");
const hmy = new Harmony("https://api.s0.b.hmny.io", {
  chainType: ChainType.Harmony,
  chainId: ChainID.HmyTestnet,
});

export const getWalletInfo = () => async (dispatch, getState) => {
  //access the state
  const state = getState();

  dispatch(actions.getWalletInfo.request(Canceler.cancel));

  try {
    const provider = await detectEthereumProvider();
    if (provider !== window.ethereum) {
      console.error("Do you have multiple wallets installed?");
    }
    if (!provider) {
      console.error("Metamask not found");
      return;
    }
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x6357d2e0" }],
      });
    } catch (error) {
      console.log("switch network error", error);
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "Harmony Testnet",
                nativeCurrency: { name: "ONE", symbol: "ONE", decimals: 18 },
                chainId: "0x" + Number(1666700000).toString(16),
                rpcUrls: [`https://api.s0.b.hmny.io`],
                blockExplorerUrls: ["https://explorer.pops.one/"],
              },
            ],
          });
        } catch (addError) {
          console.error("add network error", addError);
          return false;
        }
      }
      console.error("Failed to setup the network in Metamask:", error);
      return false;
    }
    
    if (!window.web3) {
      window.alert("No metamask found! Please install!");
      return;
    }
    
    const web3 = new Web3(window.web3.currentProvider);
    var accounts = await web3.eth.getAccounts();
    
    if (!accounts[0]) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      accounts = await web3.eth.getAccounts();
    }
    
    const account = accounts[0];
    const response = await hmy.blockchain.getBalance({
      address: account,
    });

    const contractAddress = Auction.networks["1666700000"].address;
    const abi = Auction.abi;
    const auctionContract = new web3.eth.Contract(abi, contractAddress);
    const manager = await auctionContract.methods.manager().call();

    const balance =
      Math.round(100 * fromWei(hexToNumber(response.result), Units.one)) / 100;
    const data={account, balance, manager}
    dispatch(actions.getWalletInfo.success(data));
  } catch (err) {
    dispatch(actions.getWalletInfo.failure(err));
  }
};
