import { ethers } from "ethers";

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
  console.log(state);

  dispatch(actions.getNftBreakdown.request(Canceler.cancel));

  try {
    // const { data } = await Axios.get("/mock_data/nfts.json", {
    //   cancelToken: Canceler.token,
    //   params: {},
    // });

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
      const owner = await connectedNftContract.ownerOf(i);
      const currentAccount = 1;
      // const currentAccount =
      //   state &&
      //   state.account &&
      //   state.account.currentAccount &&
      //   state.account.currentAccount.data.account;
      console.log("sdfsdf", currentAccount);
      const isOwned = owner === currentAccount;
      const coordinates = JSON.parse(nftInfo).geometry.coordinates;
      const type = JSON.parse(nftInfo).properties.type;
      const title = JSON.parse(nftInfo).properties.title;
      const svgData = await connectedAuctionContract.getSVG(
        i,
        coordinates[0],
        coordinates[0],
        title
      );
      const nftData = {
        id: i,
        isOwned,
        type,
        longitude: coordinates[0],
        latitude: coordinates[1],
        title,
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

export const fetchNftDetail = () => async (dispatch) => {
  dispatch(actions.getNftDetail.request(Canceler.cancel));

  try {
    const { data } = await Axios.get("/mock_data/nft_detail.json", {
      cancelToken: Canceler.token,
      params: {},
    });

    dispatch(actions.getNftDetail.success(data));
  } catch (err) {
    dispatch(actions.getNftDetail.failure(err));
  }
};
