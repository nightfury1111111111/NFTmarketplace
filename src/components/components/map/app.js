import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import styled, { createGlobalStyle } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
// import { getAppUrl } from "../../utils/getAppUrl";
import * as selectors from "../../../store/selectors";

import Search from "./search";
// import Tour from "./tour";
// import Page from "./page";

import "./app.css";
import "./map.css";

import LuvNFT from "../../../abi/LuvNFT.json";
import Auction from "../../../abi/NFTAuction.json";

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

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const GlobalStyles = createGlobalStyle`
  .navbar {
    display: none;
  }
  div {
    font-family: "Poppins";
  }
  h6, h5 {
    color: black;
  }
  .modalBackgroundStyle {
    width: 100vw;
    height:100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modalBackground {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #69E4AD;
    opacity: 0.6;
    z-index: 999;
  }
  .modalBody {
    background-color: white;
    width: 690px;
    height: fit-content;
    z-index: 2000;
    opacity: 1;
    min-width: 320px;
    border-radius: 8px;
    padding: 10px;
    padding-bottom: 20px;
    overflow: auto;
  }
  .modalTitle {
    height: fit-content;
    border-bottom: 1px solid #B18FCF;
    font-size: 24px;
    font-family: Archivo Black;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    color: black;
  }
  .modalSection {
    display: flex;
    flex-direction: row;
  }
  .modalCard {
    width: 50%;
  }
  .modalInfo {
    width: 50%;
    margin-left: 20px;
  }
  .blackDiv {
    width: 100%;
    background: black;
    padding: 7px 18px;
    border-radius: 10px;
    color: white;
  }
  .whiteDiv {
    width: 100%;
    padding: 7px 18px;
    border-radius: 10px;
    background: white;
    color: black;
  }
  .blackBtn {
    margin-top: 10px;
    background: black;
    border-radius: 7px;
    padding: 7px 18px;
    text-align: center;
    color: white;
    font-size: 25px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    font-weight: bold;
  }

  @media only screen and (max-width: 600px) {
    .modalBody {
      width: 90%;
      height: 90vh;
      min-width: 350px;
    }
    .modalSection {
      flex-direction: column;
    }
    .modalInfo {
      width: 100%;
      margin-top: 20px;
      margin-left: 0;
    }
    .modalCard {
      width: 100%;
    }
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

const Map = () => {
  const mapContainerRef = useRef(null);
  // const baseUrl = getAppUrl();

  const [openModal, setOpenModal] = useState(false);
  const [myGeoJson, setMyGeoJson] = useState([]);
  const [nftData, setNftData] = useState();
  const [newGeoJson, setNewGeoJson] = useState([]);
  const [types, setTypes] = useState([
    { slug: "land", name: "🗺LAND", checked: true },
    { slug: "services", name: "💈SERVICES", checked: true },
    { slug: "house", name: "🏠HAUS", checked: true },
    { slug: "hotel", name: "🏩HOTEL", checked: true },
    { slug: "restaurant", name: "🍔RESTAURANT", checked: true },
    { slug: "office", name: "🏢OFFICE", checked: true },
    { slug: "monument", name: "🗽MONUMENT", checked: true },
    { slug: "car", name: "🚗CAR", checked: true },
    { slug: "taxi", name: "🚕TAXI", checked: true },
    { slug: "stadium", name: "🏟STADIUM", checked: true },
    { slug: "bank", name: "🏦BANK", checked: true },
    { slug: "store", name: "🏬STORE", checked: true },
    { slug: "boat", name: "⛵️BOAT", checked: true },
    { slug: "yacht", name: "🛥YACHT", checked: true },
  ]);
  const [rooms, setRooms] = useState([
    { slug: "one", name: "ONE", checked: false },
    { slug: "two", name: "TWO", checked: false },
    { slug: "more", name: "MORE", checked: false },
    { slug: "any", name: "ANY", checked: true },
  ]);
  const [areas, setAreas] = useState({
    from: 30,
    to: 150,
  });
  const [rents, setRents] = useState({
    from: 5000,
    to: 20000,
  });
  const [deposits, setDeposits] = useState({
    from: 10000,
    to: 100000,
  });
  // const [places, setPlaces] = useState({
  //   type: "FeatureCollection",
  //   features: [],
  // });
  const [slideOpen, setSlideOpen] = useState(true);
  // const [tourActive, setTourActive] = useState(false);
  // const [tourIndex, setTourIndex] = useState(0);
  const [pageVisible, setPageVisible] = useState(false);
  // const [page, setPage] = useState({});
  const [nfts, setNfts] = useState([]);

  const nftState = useSelector(selectors.nftBreakdownState);

  useEffect(() => {
    if (nftState.data && nftState.data.length) setNfts(nftState.data);
  }, [nftState]);

  useEffect(() => {
    if (nfts.length) {
      let tmpGeoJson = [];
      nfts.map((nft) => {
        let tmpData = {
          type: "Feature",
          properties: {
            id: nft.id,
            title: nft.title,
            address: nft.address,
            description: nft.description,
            type: nft.type,
            rooms: nft.rooms,
            area: nft.area,
            rent: nft.rent,
            deposit: nft.minPrice ? nft.minPrice : nft.buyNowPrice,
            svgData: nft.svgData,
          },
          geometry: {
            type: "Point",
            coordinates: [nft.longitude, nft.latitude],
          },
        };
        tmpGeoJson.push(tmpData);
      });
      setMyGeoJson(tmpGeoJson);
    }
  }, [nfts]);

  let map;

  // Initialize map when component mounts
  useEffect(() => {
    // setMyGeoJson([
    //   {
    //     type: "Feature",
    //     properties: {
    //       id: 0,
    //       title: "Suspendisse gravida turpis",
    //       address:
    //         "Orci varius natoque penatibus et magnis dis parturient montes.",
    //       description:
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus in ornare quam viverra orci sagittis eu volutpat. Diam ut venenatis tellus in metus vulputate eu. Quam quisque id diam vel quam elementum pulvinar etiam. Imperdiet massa tincidunt nunc pulvinar. Velit aliquet sagittis id consectetur purus ut. Libero enim sed faucibus turpis in eu mi bibendum. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc.",
    //       images: [
    //         {
    //           original: "/assets/images/original/dorm/1/1.jpg",
    //           thumbnail: "/assets/images/thumbnail/dorm/1/1.jpg",
    //         },
    //         {
    //           original: "/assets/images/original/dorm/1/2.jpg",
    //           thumbnail: "/assets/images/thumbnail/dorm/1/2.jpg",
    //         },
    //         {
    //           original: "/assets/images/original/dorm/1/3.jpg",
    //           thumbnail: "/assets/images/thumbnail/dorm/1/3.jpg",
    //         },
    //       ],
    //       type: "bank",
    //       rooms: 1,
    //       area: 70,
    //       rent: 14500,
    //       deposit: 43000,
    //     },
    //     geometry: {
    //       type: "Point",
    //       coordinates: [5.334720611572266, 60.38396261348399],
    //     },
    //   },
    // ]);

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    handleGeoJson();
  }, [myGeoJson]);

  useEffect(() => {
    console.log(nftData);
    if (nftData) {
      setOpenModal(true);
      setSlideOpen(false);
    }
  }, [nftData]);

  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [5, 60],
      zoom: 5,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.on("load", () => {
      // Load an image from an external URL.
      map.loadImage(`img/mapimage/icon-house.png`, (error, image) => {
        if (error) throw error;
        map.addImage("house", image);

        map.loadImage(`img/mapimage/icon-office.png`, (error, image) => {
          if (error) throw error;
          map.addImage("office", image);

          map.loadImage(`img/mapimage/icon-bank.png`, (error, image) => {
            if (error) throw error;
            map.addImage("bank", image);

            map.loadImage(`img/mapimage/icon-boat.png`, (error, image) => {
              if (error) throw error;
              map.addImage("boat", image);

              map.loadImage(`img/mapimage/icon-car.png`, (error, image) => {
                if (error) throw error;
                map.addImage("car", image);

                map.loadImage(`img/mapimage/icon-hotel.png`, (error, image) => {
                  if (error) throw error;
                  map.addImage("hotel", image);

                  map.loadImage(
                    `img/mapimage/icon-land.png`,
                    (error, image) => {
                      if (error) throw error;
                      map.addImage("land", image);

                      map.loadImage(
                        `img/mapimage/icon-monument.png`,
                        (error, image) => {
                          if (error) throw error;
                          map.addImage("monument", image);

                          map.loadImage(
                            `img/mapimage/icon-restaurant.png`,
                            (error, image) => {
                              if (error) throw error;
                              map.addImage("restaurant", image);

                              map.loadImage(
                                `img/mapimage/icon-service.png`,
                                (error, image) => {
                                  if (error) throw error;
                                  map.addImage("service", image);

                                  map.loadImage(
                                    `img/mapimage/icon-stadium.png`,
                                    (error, image) => {
                                      if (error) throw error;
                                      map.addImage("stadium", image);

                                      map.loadImage(
                                        `img/mapimage/icon-store.png`,
                                        (error, image) => {
                                          if (error) throw error;
                                          map.addImage("store", image);
                                          map.loadImage(
                                            `img/mapimage/icon-taxi.png`,
                                            (error, image) => {
                                              if (error) throw error;
                                              map.addImage("taxi", image);
                                              map.loadImage(
                                                `img/mapimage/icon-yacht.png`,
                                                (error, image) => {
                                                  if (error) throw error;
                                                  map.addImage("yacht", image);

                                                  // Add a data source containing one point feature.
                                                  map.addSource("point", {
                                                    type: "geojson",
                                                    data: {
                                                      type: "FeatureCollection",
                                                      features: newGeoJson,
                                                    },
                                                  });

                                                  // Add a layer to use the image to represent the data.
                                                  map.addLayer({
                                                    id: "points",
                                                    type: "symbol",
                                                    source: "point", // reference the data source
                                                    layout: {
                                                      "icon-image": [
                                                        "get",
                                                        "type",
                                                      ],
                                                      "icon-size": 1,
                                                    },
                                                  });
                                                }
                                              );
                                            }
                                          );
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                });
              });
            });
          });
        });
      });
    });

    map.on("click", "points", (event) => {
      // Copy coordinates array.
      let { id } = event.features[0].properties;
      console.log("sdf", id);
      console.log("sdf", nfts[id]);
      setNftData(nfts[id]);

      // let coordinates = event.features[0].geometry.coordinates.slice();

      // console.log(coordinates);

      // // Ensure that if the map is zoomed out such that multiple
      // // copies of the feature are visible, the popup appears
      // // over the copy being pointed to.
      // while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
      //   coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
      // }

      // // if (typeof properties.images !== "object")
      // //   properties.images = JSON.parse(properties.images);

      // properties.typeName = types.filter(
      //   (t) => t.slug === properties.type
      // )[0].name;
      // // <img src="${images[0].thumbnail}" class="app-page-trigger" />;

      // let {
      //   title,
      //   address,
      //   typeName,
      //   rooms,
      //   area,
      //   rent,
      //   deposit,
      //   svgData,
      //   type,
      // } = properties;
      // let pageInfo = { ...properties };
      // pageInfo.coordinates = coordinates;

      // setOpenModal(true);

      //   let html = `<div class="sc-card sc-borderless">
      //   <div class="sc-card-header">
      //     <h5 class="app-page-trigger">${title}</h5>
      //   </div>

      //   <div class="sc-card-body">
      //     <div>
      //     </div>

      //     <div>
      //       <table class="sc-table">
      //         <tbody>
      //           <tr style="background-color:black; color:white;">
      //             <td>${address}</td>
      //           </tr>

      //           <tr>
      //             <td>📍LAT: ${Number(coordinates[0]).toFixed(4)} N, ${Number(
      //     coordinates[1]
      //   ).toFixed(4)} E</td>
      //           </tr>

      //           <tr style="background-color:black; color:white;">
      //             <td>💙NFT ESTATE: ${typeName}</td>
      //           </tr>

      //           <tr>
      //             <td>💼STATUS:</td>
      //           </tr>

      //           <tr style="background-color:black; color:white;">
      //             <td>Owned by </td>
      //           </tr>
      //         </tbody>
      //       </table>
      //     </div>
      //   </div>

      //   <div class="sc-card-footer">
      //     <table class="sc-table">
      //       <tbody>
      //           <tr style="background-color:black; color:white;">
      //             <td>⚾️ONE: 555 💵USD:$2000</td>
      //           </tr>
      //       </tbody>
      //     </table>
      //   </div>
      // </div>`;

      //   new mapboxgl.Popup().setLngLat(coordinates).setHTML(html).addTo(map);

      // let pageInfo = { ...properties };
      // pageInfo.coordinates = coordinates;

      // document.querySelectorAll(".app-page-trigger").forEach((element) => {
      //   element.addEventListener("click", () => {
      //     handleChangePage(true);
      //     setPage(pageInfo);
      //   });
      // });
    });

    map.on("mouseenter", "points", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "points", () => {
      map.getCanvas().style.cursor = "";
    });

    if (newGeoJson.length > 2) {
      let bound = [];
      newGeoJson.map((place) => bound.push(place.geometry.coordinates));
      map.fitBounds(bound);
    }
  }, [newGeoJson]);

  const getSlideClasses = () => {
    // let classes = "sc-slide mapSearch";
    let classes = "sc-slide mapSearch";
    if (slideOpen) classes += " sc-is-open";
    return classes;
  };

  const handleChangeSlide = (slideOpen) => {
    setSlideOpen(slideOpen);
  };

  const handleChangePage = (pageVisible) => {
    setPageVisible(pageVisible);
  };

  const getPageOverlayClasses = () => {
    let classes = "app-page-overlay";

    if (pageVisible) classes += " is-visible";

    return classes;
  };

  const getPlacesCount = () => {
    return newGeoJson.length ? newGeoJson.length : "No";
  };

  const handleGeoJson = () => {
    let selectedTypes = types
      .filter((type) => type.checked)
      .map((type) => type.slug);

    let selectedRooms = rooms
      .filter((room) => room.checked)
      .map((room) => room.slug);

    let features = myGeoJson.filter((feature) => {
      let { type, rooms, area, rent, deposit } = feature.properties;

      if (
        selectedTypes.includes(type) &&
        area >= areas.from &&
        area <= areas.to &&
        rent >= rents.from &&
        rent <= rents.to &&
        deposit >= deposits.from &&
        deposit <= deposits.to
      ) {
        if (
          (rooms === 1 && selectedRooms.includes("one")) ||
          (rooms === 2 && selectedRooms.includes("two")) ||
          (rooms > 2 && selectedRooms.includes("more")) ||
          selectedRooms.includes("any")
        ) {
          return true;
        }
      }

      return false;
    });

    console.log(myGeoJson);
    // setNewGeoJson(features);
    setNewGeoJson(myGeoJson);
    // if (myGeoJson.length)
    //   this.mapcraft.fitBounds({
    //     geoJson: places,
    //   });
  };

  const handleChangeType = (event) => {
    let slug = event.target.getAttribute("data-type");
    let newTypes = types.map((type) => {
      if (type.slug === slug) type.checked = event.target.checked;

      return type;
    });

    setTypes(newTypes);
    handleGeoJson();
  };

  const handleChangeRoom = (event) => {
    let slug = event.target.getAttribute("data-room");
    let newRooms = rooms.map((room) => {
      room.checked = room.slug === slug ? true : false;

      return room;
    });

    setRooms(newRooms);
    handleGeoJson();
  };

  const handleChangeArea = (value) => {
    areas.from = value.min;
    areas.to = value.max;

    setAreas(areas);
    handleGeoJson();
  };

  const handleChangeRent = (value) => {
    rents.from = value.min;
    rents.to = value.max;

    setRents(rents);
    handleGeoJson();
  };

  const handleChangeDeposit = (value) => {
    deposits.from = value.min;
    deposits.to = value.max;

    setDeposits(deposits);
    handleGeoJson();
  };

  const getCompressed = (addr) => {
    const len = addr.length;
    return addr.substring(0, 5) + "..." + addr.substring(len - 3, len);
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {openModal && (
        <div
          className="modalBackgroundStyle"
          onClick={() => {
            setOpenModal(false);
            setNftData(null);
            // setSlideOpen(true);
          }}
        >
          <div className="modalBackground" />
          <div
            className="modalBody"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="modalTitle">
              <span>{nftData.title.toUpperCase()}</span>
              <span
                onClick={() => {
                  setOpenModal(false);
                  setNftData(null);
                }}
                style={{ cursor: "pointer" }}
              >
                ✗
              </span>
            </div>
            <div className="modalSection">
              <div className="modalCard">
                <NFTCardWrapper bgPath={nftData.svgData} type={nftData.type}>
                  <div className="cardTitle">{nftData.title.toUpperCase()}</div>
                  {nftData.isOwned && <AnimatedDiv>OWNED BY YOU</AnimatedDiv>}
                  <div className="cardInfo">
                    <div>🆔ID: {nftData.id}</div>
                    <div>
                      📍lat: {Number(nftData.latitude).toFixed(4)} N, long:
                      {Number(nftData.longitude).toFixed(4)} E
                    </div>
                    <div>💙NFT ESTATE: {nftData.type}</div>
                  </div>
                </NFTCardWrapper>
              </div>
              <div className="modalInfo">
                <div className="blackDiv">🏁 {nftData.address}</div>
                <div className="whiteDiv" style={{ marginTop: "10px" }}>
                  📍 lat: {Number(nftData.latitude).toFixed(4)} N, long:
                  {Number(nftData.longitude).toFixed(4)} E
                </div>
                <div className="blackDiv" style={{ marginTop: "10px" }}>
                  💙 NFT ESTATE: {nftData.type}
                </div>
                <div className="whiteDiv" style={{ marginTop: "10px" }}>
                  💼 STATUS : {nftData.status}
                </div>
                <div className="blackDiv" style={{ marginTop: "10px" }}>
                  💰 Owned by : {getCompressed(nftData.owner)}
                </div>
                <div className="blackDiv" style={{ marginTop: "10px" }}>
                  <span>
                    <img src="/img/coin.png" className="emojiPng"/>{" "}
                  </span>
                  <span> One : 💵 USD:</span>
                </div>
                <div className="blackBtn" style={{ marginTop: "10px" }}>
                  BUY
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <GlobalStyles />
      <div
        ref={mapContainerRef}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <div className={getSlideClasses()}>
        <Search
          types={types}
          rooms={rooms}
          areas={areas}
          rents={rents}
          deposits={deposits}
          slideOpen={slideOpen}
          onChangeSlide={handleChangeSlide}
          onChangeType={handleChangeType}
          onChangeRoom={handleChangeRoom}
          onChangeArea={handleChangeArea}
          onChangeRent={handleChangeRent}
          onChangeDeposit={handleChangeDeposit}
          getPlacesCount={getPlacesCount}
        />
      </div>
      {/* <div
        className={getPageOverlayClasses()}
        onClick={() => {
          handleChangePage(false);
        }}
      >
        <Page page={page} onChangePage={handleChangePage} />
      </div> */}
    </div>
  );
};

export default Map;
