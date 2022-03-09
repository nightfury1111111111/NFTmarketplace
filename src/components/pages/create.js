import React, { useState, useEffect } from "react";
import ipfs from "../../utils/ipfsApi";
import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import * as selectors from "../../store/selectors";
// import Clock from "../components/Clock";
import Footer from "../components/footer";

import LuvNFT from "../../abi/LuvNFT.json";
import Auction from "../../abi/NFTAuction.json";

// const APIKEY = process.env.REACT_APP_NFTSTORAGE_API_KEY;
// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
// const client = create('https://ipfs.infura.io:5001/api/v0');
const nftContractAddress = process.env.REACT_APP_NFTCONTRACT_ADDERSS;
const auctionContractAddress = process.env.REACT_APP_AUCTIONCONTRACT_ADDRESS;

const CreatePage = () => {
  const [thumbnail, setThumbnail] = useState();
  const [thumbnailURL, setThumbnailURL] = useState([]);
  const [original, setOriginal] = useState();
  const [originalURL, setOriginalURL] = useState([]);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState(0);
  const [fee, setFee] = useState(0);
  const [longitude, setLongitude] = useState(0.0);
  const [latitude, setLatitude] = useState(0.0);
  const [price, setPrice] = useState(0);
  const [tokenURI, setTokenURI] = useState();
  const [uploadedImage, setUploadedImage] = useState();
  const [currentFee, setCurrentFee] = useState(0);

  const accountInfo = useSelector(selectors.accountState);

  useEffect(() => {
    console.log("thumbnail", thumbnail);
    console.log("original", original);
  }, [thumbnail, original]);

  useEffect(() => {
    // setIsAdmin(accountInfo.data.manager === accountInfo.data.account);
    accountInfo.data && setCurrentFee(accountInfo.data.fee);
  }, [accountInfo]);

  const handleThumbnailUpload = (event) => {
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file); // Read bufffered file
    reader.onloadend = () => {
      setThumbnail(Buffer(reader.result));
    };
  };

  const handleOriginalUpload = (event) => {
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file); // Read bufffered file
    reader.onloadend = () => {
      setOriginal(Buffer(reader.result));
    };
  };

  const uploadThumbnailToIpfs = async () => {
    console.log("uploading thumbnail");
    ipfs.files.add(thumbnail, (error, result) => {
      // In case of fail to upload to IPFS
      if (error) {
        console.error(error);
        return;
      }
      const url = `https://ipfs.io/ipfs/${result[0].hash}`;
      setUploadedImage(url);
      const tmpThumbnailUrl = thumbnailURL;
      tmpThumbnailUrl.push(url);
      console.log(tmpThumbnailUrl);
      setThumbnailURL(tmpThumbnailUrl);
    });
  };

  const uploadOriginalToIpfs = async () => {
    console.log("uploading original");
    ipfs.files.add(original, (error, result) => {
      // In case of fail to upload to IPFS
      if (error) {
        console.error(error);
        return;
      }
      const url = `https://ipfs.io/ipfs/${result[0].hash}`;
      setUploadedImage(url);
      const tmpOriginalUrl = originalURL;
      tmpOriginalUrl.push(url);
      console.log(tmpOriginalUrl);
      setOriginalURL(tmpOriginalUrl);
    });
  };

  const mintNFTToken = async (event) => {
    event.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const connectedContract = new ethers.Contract(
      nftContractAddress,
      LuvNFT.abi,
      provider.getSigner()
    );
    const id = await connectedContract.nextId();
    // setTokenId(id);
    const images = [];
    if (thumbnailURL.length != originalURL.length) {
      alert("amount of thumbnail must be the same as original");
      return;
    }
    for (let i = 0; i < thumbnailURL.length; i++) {
      images.push({
        original: originalURL[i],
        thumbnail: thumbnailURL[i],
      });
    }
    const nftInfo = {
      type: "Feature",
      properties: {
        id: `item-${Number(id)}`,
        title,
        address,
        description,
        images,
        type,
        rooms,
        // rent:0,
        // donation:0,
      },
      geometry: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    };
    setTokenURI(JSON.stringify(nftInfo));

    try {
      const mintNFTTx = await connectedContract.mint(JSON.stringify(nftInfo));
      setThumbnailURL([]);
      setOriginalURL([]);
      return mintNFTTx;
    } catch (error) {
      console.log(error);
    }
  };

  const setManagerFee = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const connectedContract = new ethers.Contract(
      auctionContractAddress,
      Auction.abi,
      provider.getSigner()
    );
    // const fee = await connectedContract.managerFee();
    // const manager = await connectedContract.manager();
    // console.log("manager", manager);
    // console.log("fee", fee);
    const previousFee = await connectedContract.managerFee();
    console.log("previousFee", previousFee);
    connectedContract.setManagerFee(fee);
  };

  const setNftPrice = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const connectedNftContract = new ethers.Contract(
      nftContractAddress,
      LuvNFT.abi,
      provider.getSigner()
    );
    let tokenId = await connectedNftContract.nextId();
    tokenId = tokenId - 1;
    // let priceToWei = toWei(price, Units.one);
    // console.log(price, priceToWei)

    const connectedAuctionContract = new ethers.Contract(
      auctionContractAddress,
      Auction.abi,
      provider.getSigner()
    );
    const previousFee = await connectedAuctionContract.managerFee();
    const manager = await connectedAuctionContract.manager();
    const zeroAddress = "0x0000000000000000000000000000000000000000";
    const result = await connectedAuctionContract.createSale(
      tokenId,
      zeroAddress,
      price,
      // priceToWei,
      [manager],
      [previousFee]
    );
    console.log("result", result);
  };

  return (
    <div>
      <section
        className="jumbotron breadcumb no-bg"
        style={{
          backgroundImage: `url("img/gallery/6.jpg")`,
        }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1
                  className="text-center"
                  style={{ fontFamily: "Archivo Black" }}
                >
                  Create
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        style={{
          backgroundColor: "#242325",
        }}
      >
        <section className="container">
          <div className="row reverseContainer">
            <div className="col-lg-7 offset-lg-1 mb-5">
              <form id="form-create-item" className="form-border" action="#">
                <div className="field-set" style={{ fontFamily: "Poppins" }}>
                  {/* <div className="imageUpload">
                    <div>
                      <div className="thumbnailImage">
                        <h5>Upload thumbnail image</h5>
                        <div className="d-create-file">
                          <p id="file_name">
                            PNG, JPG, GIF, WEBP or MP4. Max 200mb.
                          </p>
                          {thumbnail && <p>Thumbnail selected</p>}
                          <div className="browse">
                            <input
                              type="button"
                              id="get_file"
                              className="btn-main"
                              value="Browse"
                            />
                            <input
                              id="upload_file"
                              type="file"
                              onChange={handleThumbnailUpload}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <input
                          type="button"
                          className="btn-main uploadBtn"
                          value="Upload"
                          onClick={uploadThumbnailToIpfs}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="originalImage">
                        <h5>Upload original image</h5>
                        <div className="d-create-file">
                          <p id="file_name">
                            PNG, JPG, GIF, WEBP or MP4. Max 200mb.
                          </p>
                          {original && <p>Original selected</p>}
                          <div className="browse">
                            <input
                              type="button"
                              id="get_file"
                              className="btn-main"
                              value="Browse"
                            />
                            <input
                              id="upload_file"
                              type="file"
                              onChange={handleOriginalUpload}
                            />
                          </div>
                        </div>
                        <div>
                          <input
                            type="button"
                            className="btn-main uploadBtn"
                            value="Upload"
                            onClick={uploadOriginalToIpfs}
                          />
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="spacer-single"></div>

                  <h5>Title</h5>
                  <input
                    type="text"
                    name="item_title"
                    id="item_title"
                    className="form-control"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    value={title}
                  />

                  <div className="spacer-10"></div>

                  <h5>Address</h5>
                  <input
                    type="text"
                    name="item_title"
                    id="item_title"
                    className="form-control"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    value={address}
                  />

                  <div className="spacer-10"></div>

                  <h5>Description</h5>
                  <textarea
                    data-autoresize
                    name="item_desc"
                    id="item_desc"
                    className="form-control"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    value={description}
                  ></textarea>

                  <div className="spacer-10"></div>

                  <h5>Type</h5>
                  <input
                    type="text"
                    name="item_price"
                    id="item_price"
                    className="form-control"
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    value={type}
                  />

                  <div className="spacer-10"></div>

                  <h5>Rooms</h5>
                  <input
                    type="number"
                    name="item_royalties"
                    id="item_royalties"
                    className="form-control"
                    onChange={(e) => {
                      setRooms(e.target.value);
                    }}
                    value={rooms}
                  />

                  <div className="spacer-10"></div>

                  <h5>Longitude</h5>
                  <input
                    type="number"
                    name="item_royalties"
                    id="item_royalties"
                    className="form-control"
                    onChange={(e) => {
                      setLongitude(e.target.value);
                    }}
                    value={longitude}
                  />

                  <div className="spacer-10"></div>

                  <h5>Latitude</h5>
                  <input
                    type="number"
                    name="item_royalties"
                    id="item_royalties"
                    className="form-control"
                    onChange={(e) => {
                      setLatitude(e.target.value);
                    }}
                    value={latitude}
                  />

                  <div className="spacer-10"></div>

                  <input
                    type="button"
                    id="submit"
                    className="btn-main"
                    value="Mint new NFT"
                    onClick={mintNFTToken}
                  />

                  <div className="spacer-10"></div>

                  <h5>TokenURI</h5>
                  <textarea
                    data-autoresize
                    name="item_desc"
                    id="item_desc"
                    className="form-control"
                    onChange={(e) => {
                      setTokenURI(e.target.value);
                    }}
                    value={tokenURI}
                  ></textarea>
                  <hr />
                  <p
                    style={{
                      color: "white",
                      fontSize: "30px",
                      fontFamily: "Archivo Black",
                    }}
                  >
                    Set fee & price
                  </p>
                  <hr />
                  <h5>Price</h5>
                  <input
                    type="number"
                    name="item_royalties"
                    id="item_royalties"
                    className="form-control"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    value={price}
                  />
                  <input
                    type="button"
                    id="submit"
                    className="btn-main mobileBtn"
                    value="Set Price"
                    onClick={setNftPrice}
                  />

                  <div className="spacer-10"></div>

                  <div className="feeDiv">
                    <h5>Fee</h5>
                    <h5>current fee - {currentFee}</h5>
                  </div>
                  <input
                    type="number"
                    name="item_royalties"
                    id="item_royalties"
                    className="form-control"
                    onChange={(e) => {
                      setFee(e.target.value);
                    }}
                    value={fee}
                  />
                  <input
                    type="button"
                    id="submit"
                    className="btn-main mobileBtn"
                    value="Set Fee"
                    onClick={setManagerFee}
                  />
                </div>
              </form>
            </div>

            {/*   <div className="col-lg-3 col-sm-6 col-xs-12 previewImage">
              <h5>Preview picture</h5>
              <div className="nft__item m-0">
                <div className="de_countdown">
                  <Clock deadline="December, 30, 2022" />
                </div> */}
            {/* <div className="author_list_pp">
                  <span>
                    <img
                      className="lazy"
                      src="./img/author/author-1.jpg"
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </span>
                </div> */}
            {/* <div className="nft__item_wrap">
                  <span>
                    <img
                      // src="./img/collections/coll-item-3.jpg"
                      src={uploadedImage}
                      id="get_file_2"
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </span>
                </div>
                <div className="nft__item_info">
                  <span>
                    <h4>
                      You can check if the image is upload to IPFS correctly.
                    </h4>
                  </span>
                  {/* <div className="nft__item_price">
                    0.08 ETH<span>1/20</span>
                  </div>
                  <div className="nft__item_action">
                    <span>Place a bid</span>
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>50</span>
                  </div> 
                </div>
              </div>
            </div> */}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default CreatePage;
