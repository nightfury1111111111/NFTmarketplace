import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { ethers } from "ethers";
// import { useLocation } from "react-router-dom";
import Clock from "../components/Clock";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import * as selectors from "../../store/selectors";
import { fetchNftDetail } from "../../store/actions/thunks";

import LuvNFT from "../../abi/LuvNFT.json";
import Auction from "../../abi/NFTAuction.json";

const nftContractAddress = process.env.REACT_APP_NFTCONTRACT_ADDERSS;
const auctionContractAddress = process.env.REACT_APP_AUCTIONCONTRACT_ADDRESS;
const zeroAddress = "0x0000000000000000000000000000000000000000";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const auctionContract = new ethers.Contract(
  auctionContractAddress,
  Auction.abi,
  provider.getSigner()
);
const nftContract = new ethers.Contract(
  nftContractAddress,
  LuvNFT.abi,
  provider.getSigner()
);

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #242325;
  }
  .subtitle{
    font-family:"Archivo Black";
    font-size:25px;
  }
  div, p {
    font-family:"Poppins";
  }
`;

const NFTCardWrapper = styled.div`
  width: 100%;
  height: 310px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  color: white;
  text-align: center;
  font-family: "Poppins";
  background-image: url(${(props) => {
      switch (props.type) {
        case "land":
          return "/img/Element_1.png";
        case "monument":
          return "/img/Element_5.png";
        case "house":
          return "/img/Element_2.png";
        case "hotel":
          return "/img/Element_3.png";
        case "stadium":
          return "/img/Element_4.png";
        case "store":
          return "/img/Element_6.png";
        case "office":
          return "/img/Element_7.png";
        case "bank":
          return "/img/Element_8.png";
        case "car":
          return "/img/Element_9.png";
        case "restaurant":
          return "/img/Element_10.png";
        case "taxi":
          return "/img/Element_11.png";
        case "yacht":
          return "/img/Element_12.png";
        case "boat":
          return "/img/Element_13.png";
        case "service":
          return "/img/Element_14.png";
        default:
          return;
      }
    }}),
    url(${(props) => props.bgPath});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 37%, 100% 100%;
  position: relative;
`;

const AnimatedDiv = styled.div`
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: red;
  animation-name: exam;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  @keyframes exam {
    0% {
      color: red;
      // background-color: red;
    }
    50% {
      color: green;
      // background-color: blue;
    }
    100% {
      color: red;
      // background-color: red;
    }
  }
`;

const ItemDetail = () => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [nftDetail, setNftDetail] = React.useState();
  const [salePrice, setSalePrice] = useState("");
  const [auctionMinPrice, setAuctionMinPrice] = useState("");
  const [auctionBuyNowPrice, setAuctionBuyNowPrice] = useState("");
  const [auctionPeriod, setAuctionPeriod] = useState("");
  const [auctionBidIncrease, setAuctionBidIncrease] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [rentPeriod, setRentPeriod] = useState("");

  // let { id } = useLocation();
  //get param;; don't know the way to get params so use this way. don't use this if possible
  const paramPos = window.location.href.toString().indexOf("nft");
  const param = Number(window.location.href.toString().slice(paramPos + 4));

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu2(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu2(false);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
    setOpenMenu1(false);
    setOpenMenu(false);
    document.getElementById("Mainbtn2").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };

  const dispatch = useDispatch();
  // const nftDetailState = useSelector(selectors.nftDetailState);
  // const nftDetail = useSelector(selectors.nftDetail);
  // const nft = nftDetailState.data ? nftDetailState.data : [];

  const nftState = useSelector(selectors.nftBreakdownState);

  useEffect(() => {
    if (nftState.data && nftState.data.length)
      setNftDetail(nftState.data[param]);
  }, [nftState]);

  console.log(nftDetail);

  useEffect(() => {
    dispatch(fetchNftDetail(param));
  }, [dispatch]);

  const getCompressed = (addr) => {
    const len = addr.length;
    return addr.substring(0, 5) + "..." + addr.substring(len - 3, len);
  };

  //integrate with smart contract
  const createAuction = async () => {
    // let priceToWei = toWei(price, Units.one);
    // console.log(price, priceToWei)

    const previousFee = await auctionContract.managerFee();
    const manager = await auctionContract.manager();
    const result = await auctionContract.createNewNftAuction(
      nftDetail.id,
      zeroAddress,
      auctionMinPrice,
      auctionBuyNowPrice,
      auctionPeriod * 3600,
      auctionBidIncrease,
      // priceToWei,
      [manager],
      [previousFee]
    );
    console.log("result", result);
  };

  const createSale = async () => {
    // let priceToWei = toWei(price, Units.one);
    // console.log(price, priceToWei)

    const previousFee = await auctionContract.managerFee();
    const manager = await auctionContract.manager();
    const result = await auctionContract.createSale(
      nftDetail.id,
      zeroAddress,
      salePrice,
      // priceToWei,
      [manager],
      [previousFee]
    );
    console.log("result", result);
  };
  const createRent = async () => {
    // let priceToWei = toWei(price, Units.one);
    // console.log(price, priceToWei)
    const result = await auctionContract.lend(
      nftDetail.id,
      rentPeriod * 3600,
      0,
      rentPrice,
      0
    );
    console.log("result", result);
  };

  return (
    <div>
      <GlobalStyles />
      {!nftDetail ? (
        <div style={{ height: "90vh", backgroundColor: "#242325" }} />
      ) : (
        <></>
      )}
      {nftDetail && (
        <div
          style={{
            backgroundColor: "#242325",
            paddingTop: "50px",
            minHeight: "90vh",
          }}
        >
          <section className="container" style={{ color: "white" }}>
            <div className="row mt-md-5 pt-md-4">
              <div className="col-md-6 text-center">
                {/* <img
                  src="../img/items/big-1.jpg"
                  className="img-fluid img-rounded mb-sm-30"
                  alt=""
                /> */}
                <NFTCardWrapper
                  bgPath={nftDetail.svgData}
                  type={nftDetail.type}
                >
                  <div className="cardTitle">
                    {nftDetail.title.toUpperCase()}
                  </div>
                  {nftDetail.isOwned && <AnimatedDiv>OWNED BY YOU</AnimatedDiv>}
                  <div className="cardInfo">
                    <div>🆔ID: {nftDetail.id}</div>
                    <div>
                      📍lat: {Number(nftDetail.latitude).toFixed(4)} N, long:
                      {Number(nftDetail.longitude).toFixed(4)} E
                    </div>
                    <div>💙NFT ESTATE: {nftDetail.type}</div>
                  </div>
                </NFTCardWrapper>
              </div>
              <div className="col-md-6">
                {/* <div className="nftTitle">{nftDetail.title}</div>
                <div className="row">
                  <div className="col-md-6">
                    <p>🏁 {nftDetail.address}</p>
                    <p>💙 NFT ESTATE: {nftDetail.type}</p>
                    <p>💼 Status: {nftDetail.status}</p>
                    <p>🪙 One :</p>
                    <p>⏰ Auction Ends:</p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      📍 LAT: {Number(nftDetail.latitude).toFixed(4)} N, LONG:{" "}
                      {Number(nftDetail.longitude).toFixed(4)} E
                    </p>
                    <p>🆔 ID: {nftDetail.id}</p>
                    <p>💰 Owned by: {getCompressed(nftDetail.owner)}</p>
                    <p>💸 Highest Bid:</p>
                    <p>💵 USD: </p>
                  </div>
                </div>
                <div>sdfsdf</div> */}
                <div className="item_info">
                  ⏰ Auctions ends in
                  <div className="de_countdown">
                    <Clock deadline="December, 30, 2022" />
                  </div>
                  <div className="nftTitle">{nftDetail.title}</div>
                  <div className="item_info_counts">
                    <div className="item_info_type">
                      {/* <i className="fa fa-image"></i> */}
                      💙 {nftDetail.type}
                    </div>
                    {/* <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nft.item_views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nft.item_likes}
                    </div> */}
                  </div>
                  <p>🏁 {nftDetail.address}</p>
                  <div className="item_author">
                    <p>💼 Status : {nftDetail.status}</p>
                    <p>💰 Owned by : {getCompressed(nftDetail.owner)}</p>
                    <p>
                      <span>
                        <img src="/img/coin.png" className="emojiPng" />{" "}
                      </span>
                      <span> One : </span>
                    </p>
                    <p>💵 USD : </p>
                    <p>{nftDetail.description}</p>
                    <p>💸 Latest Bid : </p>
                    <p>🤑 Latest Bidder : </p>
                    {/* <div className="author_list_pp">
                      <span>
                        <img
                          className="lazy"
                          src={nft.author && nft.author.avatar}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </span>
                    </div>
                    <div className="author_list_info">
                      <span>{nftDetail.status}</span>
                    </div> */}
                  </div>
                  <div className="spacer-40"></div>
                  {nftDetail.status === "NotForSale" ? (
                    nftDetail.isOwned ? (
                      <div className="de_tab">
                        <ul className="de_nav">
                          <li id="Mainbtn" className="active">
                            <span onClick={handleBtnClick}>SALE</span>
                          </li>
                          <li id="Mainbtn1" className="">
                            <span onClick={handleBtnClick1}>AUCTION</span>
                          </li>
                          <li id="Mainbtn2" className="">
                            <span onClick={handleBtnClick2}>RENT</span>
                          </li>
                        </ul>

                        <div className="de_tab_content">
                          {openMenu && (
                            <div
                              className="tab-1 onStep fadeIn"
                              style={{ paddingBottom: "25px" }}
                            >
                              <div className="spacer-single"></div>
                              <h5>PRICE</h5>
                              <input
                                type="number"
                                name="item_title"
                                id="item_title"
                                className="form-control"
                                onChange={(e) => {
                                  setSalePrice(e.target.value);
                                }}
                                value={salePrice}
                              />
                              <div className="spacer-10"></div>
                              <input
                                type="button"
                                id="submit"
                                className="btn-main"
                                value="CREATE SALE"
                                onClick={createSale}
                              />
                            </div>
                          )}

                          {openMenu1 && (
                            <div
                              className="tab-2 onStep fadeIn"
                              style={{ paddingBottom: "25px" }}
                            >
                              <div className="spacer-single"></div>
                              <h5>MIN PRICE</h5>
                              <input
                                type="number"
                                name="item_title"
                                id="item_title"
                                className="form-control"
                                onChange={(e) => {
                                  setAuctionMinPrice(e.target.value);
                                }}
                                value={auctionMinPrice}
                              />
                              <div className="spacer-10"></div>
                              <h5>BUY NOW PRICE</h5>
                              <input
                                type="number"
                                name="item_title"
                                id="item_title"
                                className="form-control"
                                onChange={(e) => {
                                  setAuctionBuyNowPrice(e.target.value);
                                }}
                                value={auctionBuyNowPrice}
                              />
                              <div className="spacer-10"></div>
                              <h5>BID PERIOD (hour)</h5>
                              <input
                                type="number"
                                name="item_title"
                                id="item_title"
                                className="form-control"
                                onChange={(e) => {
                                  setAuctionPeriod(e.target.value);
                                }}
                                value={auctionPeriod}
                              />
                              <div className="spacer-10"></div>
                              <h5>BID INCREASE PERCENTAGE (* 0.01%)</h5>
                              <input
                                type="number"
                                name="item_title"
                                id="item_title"
                                className="form-control"
                                onChange={(e) => {
                                  setAuctionBidIncrease(e.target.value);
                                }}
                                value={auctionBidIncrease}
                              />
                              <div className="spacer-10"></div>
                              <input
                                type="button"
                                id="submit"
                                className="btn-main"
                                value="CREATE AUCTION"
                                onClick={createAuction}
                              />
                            </div>
                          )}

                          {openMenu2 && (
                            <div
                              className="tab-2 onStep fadeIn"
                              style={{ paddingBottom: "25px" }}
                            >
                              <div className="spacer-single"></div>
                              <h5>PRICE</h5>
                              <input
                                type="number"
                                name="item_title"
                                id="item_title"
                                className="form-control"
                                onChange={(e) => {
                                  setRentPrice(e.target.value);
                                }}
                                value={rentPrice}
                              />
                              <div className="spacer-10"></div>
                              <h5>PERIOD (hour)</h5>
                              <input
                                type="number"
                                name="item_title"
                                id="item_title"
                                className="form-control"
                                onChange={(e) => {
                                  setRentPeriod(e.target.value);
                                }}
                                value={rentPeriod}
                              />
                              <div className="spacer-10"></div>
                              <input
                                type="button"
                                id="submit"
                                className="btn-main"
                                value="CREATE RENT"
                                onClick={createRent}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="row mt-md-5 pt-md-4">
              <div className="col-md-6">
                <div className="subtitle">Description</div>
                <p>{nftDetail.description}</p>
              </div>
              <div className="col-md-6">
                <div className="subtitle">Bids</div>
              </div>
            </div> */}
          </section>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default memo(ItemDetail);
