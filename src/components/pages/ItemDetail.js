import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";
import Clock from "../components/Clock";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import * as selectors from "../../store/selectors";
import { fetchNftDetail } from "../../store/actions/thunks";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
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
      {nftDetail && (
        <div
          style={{
            backgroundColor: "darkslategrey",
            paddingTop: "50px",
          }}
        >
          <section className="container">
            <div className="row mt-md-5 pt-md-4">
              <div className="col-md-4 text-center">
                <img
                  src="../img/items/big-1.jpg"
                  className="img-fluid img-rounded mb-sm-30"
                  alt=""
                />
              </div>
              <div className="col-md-8" style={{ color: "white" }}>
                <h2 style={{ fontFamily: "Archivo Black" }}>
                  {nftDetail.title}
                </h2>
                <div className="row">
                  <div className="col-md-6">
                    <p>🏁 {nftDetail.excert}</p>
                    <p>💙 NFT ESTATE: {nftDetail.type}</p>
                    <p>💼 STtatus: {nftDetail.status}</p>
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
                  </div>
                </div>
                {/* <div className="item_info">
                  Auctions ends in
                  <div className="de_countdown">
                    <Clock deadline={nft.item_deadline} />
                  </div>
                  <div className="item_info_counts">
                    <div className="item_info_type">
                      <i className="fa fa-image"></i>
                      {nftDetail.type}
                    </div>
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nft.item_views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nft.item_likes}
                    </div>
                  </div>
                  <p>{nftDetail.description}</p>
                  <h6>Creator</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
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
                      <span>{nft.author && nft.author.username}</span>
                    </div>
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

                    <div className="de_tab_content">
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
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </section>
          <section></section>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default memo(ItemDetail);
