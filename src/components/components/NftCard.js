import React, { memo } from "react";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import { Link } from "@reach/router";
import Clock from "./Clock";

// const Outer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-content: center;
//   align-items: center;
//   overflow: hidden;
//   border-radius: 8px;
// `;

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
          return "img/Element_1.png";
        case "monument":
          return "img/Element_5.png";
        case "house":
          return "img/Element_2.png";
        case "hotel":
          return "img/Element_3.png";
        case "stadium":
          return "img/Element_4.png";
        case "store":
          return "img/Element_6.png";
        case "apartment":
          return "img/Element_7.png";
        default:
          return;
      }
    }}),
    url(${(props) => props.bgPath});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 37%, 100% 100%;
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

//react functional component
const NftCard = ({
  nft,
  className = "d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 tooltipCard",
  clockTop = true,
  height,
  onImgLoad,
}) => {
  //   const navigate = useNavigate();
  //   const routeToDetail = (id) => {
  //       console.log(navigate);
  //     navigate("/");
  //   };

  return (
    <div className={className}>
      <div className="nftGradientCard">
        <Link to={"/nft/" + nft.id} style={{ textDecoration: "none" }}>
          <NFTCardWrapper bgPath={nft.svgData} type={nft.type}>
            <div className="cardTitle">{nft.title}</div>
            {nft.isOwned && <AnimatedDiv>OWNED BY YOU</AnimatedDiv>}
            {nft.isOwned ? (
              <div style={{ marginTop: "40%" }}>
                📍LAT: {Number(nft.latitude).toFixed(4)} N, LONG:
                {Number(nft.longitude).toFixed(4)} E
              </div>
            ) : (
              <div style={{ marginTop: "47%" }}>
                📍LAT: {Number(nft.latitude).toFixed(4)} N, LONG:
                {Number(nft.longitude).toFixed(4)} E
              </div>
            )}
            <div>🆔ID: {nft.id}</div>
            <div>💙NFT ESTATE: {nft.type}</div>
          </NFTCardWrapper>
        </Link>
      </div>
    </div>
  );
};

export default memo(NftCard);
