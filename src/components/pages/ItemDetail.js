import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
// import { useLocation } from "react-router-dom";
import Clock from "../components/Clock";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import * as selectors from "../../store/selectors";
import { fetchNftDetail } from "../../store/actions/thunks";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #242325;
  }
  .subtitle{
    font-family:"Archivo Black";
    font-size:25px;
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
        case "apartment":
          return "/img/Element_5.png";
        case "house":
          return "/img/Element_2.png";
        case "hotel":
          return "/img/Element_3.png";
        case "stadium":
          return "/img/Element_4.png";
        case "store":
          return "/img/Element_6.png";
        default:
          return;
      }
    }}),
    url(${(props) => props.bgPath});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 50%, 100% 100%;
  cursor: pointer;
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
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [nftDetail, setNftDetail] = React.useState();

  // let { id } = useLocation();
  //get param;; don't know the way to get params so use this way. don't use this if possible
  const paramPos = window.location.href.toString().indexOf("nft");
  const param = Number(window.location.href.toString().slice(paramPos + 4));

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
  };

  const dispatch = useDispatch();
  const nftDetailState = useSelector(selectors.nftDetailState);
  // const nftDetail = useSelector(selectors.nftDetail);
  const nft = nftDetailState.data ? nftDetailState.data : [];

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
                  <div className="cardTitle">{nftDetail.title}</div>
                  {nftDetail.isOwned && (
                    <AnimatedDiv>Owned by you.</AnimatedDiv>
                  )}
                  {nftDetail.isOwned ? (
                    <div style={{ marginTop: "40%" }}>
                      📍lat: {Number(nftDetail.latitude).toFixed(4)} N, long:
                      {Number(nftDetail.longitude).toFixed(4)} E
                    </div>
                  ) : (
                    <div style={{ marginTop: "49%" }}>
                      📍lat: {Number(nftDetail.latitude).toFixed(4)} N, long:
                      {Number(nftDetail.longitude).toFixed(4)} E
                    </div>
                  )}
                  <div>🆔ID: {nftDetail.id}</div>
                  <div>💙NFT ESTATE: {nftDetail.type}</div>
                </NFTCardWrapper>
              </div>
              <div className="col-md-6">
                {/* <div className="nftTitle">{nftDetail.title}</div>
                <div className="row">
                  <div className="col-md-6">
                    <p>🏁 {nftDetail.address}</p>
                    <p>💙 NFT ESTATE: {nftDetail.type}</p>
                    <p>💼 Status: {nftDetail.status}</p>
                    <p>💿 One :</p>
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
                    <Clock deadline={nft.item_deadline} />
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
                    <p>💿 One : </p>
                    <p>💵 USD : </p>
                    <p>
                      {nftDetail.description} LUV NFTs are unique SPL tokens on
                      Solana Blockchain, that bring multi-utility benefits to
                      their holders. Our LUV NFT Estate platform uses ERC-721
                      tokens created on Ethereum blockchain by way of
                      Harmony.One. Think of a LUV NFT as a crypto gift card with
                      an interest rate better than your bank.
                    </p>
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
                  <div className="de_tab">
                    <ul className="de_nav">
                      <li id="Mainbtn" className="active">
                        <span onClick={handleBtnClick}>Bids</span>
                      </li>
                      <li id="Mainbtn1" className="">
                        <span onClick={handleBtnClick1}>History</span>
                      </li>
                    </ul>

                    {/* <div className="de_tab_content">
                      {openMenu && (
                        <div className="tab-1 onStep fadeIn">
                          {nft.bids &&
                            nft.bids.map((bid, index) => (
                              <div className="p_list" key={index}>
                                <div className="p_list_pp">
                                  <span>
                                    <img
                                      className="lazy"
                                      src={bid.avatar}
                                      alt=""
                                    />
                                    <i className="fa fa-check"></i>
                                  </span>
                                </div>
                                <div className="p_list_info">
                                  Bid {bid.is_author && "accepted"}{" "}
                                  <b>{bid.value} ETH</b>
                                  <span>
                                    by <b>{bid.username}</b> at {bid.timestamp}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}

                      {openMenu1 && (
                        <div className="tab-2 onStep fadeIn">
                          {nft.history &&
                            nft.history.map((bid, index) => (
                              <div className="p_list" key={index}>
                                <div className="p_list_pp">
                                  <span>
                                    <img
                                      className="lazy"
                                      src={bid.avatar}
                                      alt=""
                                    />
                                    <i className="fa fa-check"></i>
                                  </span>
                                </div>
                                <div className="p_list_info">
                                  Bid {bid.is_author && "accepted"}{" "}
                                  <b>{bid.value} ETH</b>
                                  <span>
                                    by <b>{bid.username}</b> at {bid.timestamp}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div> */}
                  </div>
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
