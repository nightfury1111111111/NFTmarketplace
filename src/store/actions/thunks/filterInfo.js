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

export const setFilterInfo = (data) => async (dispatch, getState) => {
  //access the state
  const state = getState();
  dispatch(actions.setFilterInfo.request(Canceler.cancel));

  try {
    dispatch(actions.setFilterInfo.success(data));
  } catch (err) {
    dispatch(actions.setFilterInfo.failure(err));
  }
};

export const clearFilterInfo = () => async (dispatch, getState) => {
  //access the state
  dispatch(actions.clearFilter());
};
