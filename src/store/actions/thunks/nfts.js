import { ethers } from "ethers";
import Web3 from "web3";

import { extractJSONFromURI } from "../../../utils/extractJSONFromURI";
import { Axios, Canceler } from "../../../core/axios";
import * as actions from "../../actions";

import LuvNFT from "../../../abi/LuvNFT.json";
import Auction from "../../../abi/NFTAuction.json";

const nftContractAddress = process.env.REACT_APP_NFTCONTRACT_ADDERSS;
const auctionContractAddress = process.env.REACT_APP_AUCTIONCONTRACT_ADDRESS;

export const fetchNftsBreakdown = () => async (dispatch, getState) => {
  //access the state
  const state = await getState();

  dispatch(actions.getNftBreakdown.request(Canceler.cancel));

  try {
    // const { data } = await Axios.get("/mock_data/nfts.json", {
    //   cancelToken: Canceler.token,
    //   params: {},
    // });
    const web3 = new Web3(window.web3.currentProvider);
    var accounts = await web3.eth.getAccounts();
    if (!accounts[0]) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      accounts = await web3.eth.getAccounts();
    }
    const currentAccount = accounts[0];

    let data = [];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const connectedNftContract = new ethers.Contract(
      nftContractAddress,
      LuvNFT.abi,
      provider.getSigner()
    );

    const connectedAuctionContract = new ethers.Contract(
      auctionContractAddress,
      Auction.abi,
      provider.getSigner()
    );
    let nftCount = await connectedNftContract.nextId();
    for (let i = 0; i < nftCount; i++) {
      const nftInfo = await connectedNftContract.tokenURI(i);
      // console.log(JSON.parse(nftInfo));
      const owner = await connectedNftContract.ownerOf(i);
      const auctionInfo = await connectedAuctionContract.getAuctionInfo(i);
      const {
        bidIncreasePercentage,
        auctionBidPeriod,
        auctionEnd,
        minPrice,
        buyNowPrice,
        nftHighestBid,
        nftHighestBidder,
        nftSeller,
        nftRecipient,
        ERC20Token,
        feeRecipients,
        feePercentages,
      } = auctionInfo;
      const rentInfo = await connectedAuctionContract.rentNfts(i);
      const { lender, borrower, period, price, collateral, extraPay, rentEnd } =
        rentInfo;
      const isOwned = currentAccount === owner;
      const coordinates = JSON.parse(nftInfo).geometry.coordinates;
      const type = JSON.parse(nftInfo).properties.type;
      const excert = JSON.parse(nftInfo).properties.excert;
      const rooms = JSON.parse(nftInfo).properties.rooms;
      const images = JSON.parse(nftInfo).properties.images;
      const description = JSON.parse(nftInfo).properties.description;
      const title = JSON.parse(nftInfo).properties.title;
      const svgData = await connectedAuctionContract.getSVG(
        i,
        coordinates[0],
        coordinates[0],
        title
      );
      const nftData = {
        id: i,
        owner,
        isOwned,
        description,
        excert,
        images,
        rooms,
        type,
        longitude: coordinates[0],
        latitude: coordinates[1],
        title,
        //auctionInfo
        bidIncreasePercentage,
        auctionBidPeriod,
        auctionEnd,
        minPrice,
        buyNowPrice,
        nftHighestBid,
        nftHighestBidder,
        nftSeller,
        nftRecipient,
        ERC20Token,
        feeRecipients,
        feePercentages,
        //rentInfo
        lender,
        borrower,
        rentPeriod: period,
        rentPrice: price,
        collateral,
        extraPay,
        rentEnd,
        // price:2000,
        svgData: extractJSONFromURI(svgData).image,
      };
      data.push(nftData);
    }

    dispatch(actions.getNftBreakdown.success(data));
  } catch (err) {
    console.log("Error", err);
    dispatch(actions.getNftBreakdown.failure(err));
  }
};

export const fetchNftShowcase = () => async (dispatch) => {
  dispatch(actions.getNftShowcase.request(Canceler.cancel));

  try {
    const { data } = await Axios.get("/mock_data/nft_showcase.json", {
      cancelToken: Canceler.token,
      params: {},
    });

    dispatch(actions.getNftShowcase.success(data));
  } catch (err) {
    dispatch(actions.getNftShowcase.failure(err));
  }
};

export const fetchNftDetail = (param) => async (dispatch) => {
  dispatch(actions.getNftDetail.request(Canceler.cancel));

  try {
    const { data } = await Axios.get("/mock_data/nft_detail.json", {
      cancelToken: Canceler.token,
      params: {},
    });

    console.log(param);
    dispatch(actions.getNftDetail.success(data));
  } catch (err) {
    dispatch(actions.getNftDetail.failure(err));
  }
};
