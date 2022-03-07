import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Particle from "../components/Particle";
import * as selectors from "../../store/selectors";
import * as actions from "../../store/actions/thunks";
import { clearNfts } from "../../store/actions";
import NftCard from "./NftCard";
import { shuffleArray } from "../../store/utils";

//react functional component
const ColumnNewRedux = ({ showLoadMore = true, shuffle = false }) => {
  const [nfts, setNfts] = useState([]);
  const [nftShowList, setNftShowList] = useState([]);

  const dispatch = useDispatch();
  const nftsState = useSelector(selectors.nftBreakdownState);
  const filter = useSelector(selectors.filterStatus);

  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  useEffect(() => {
    dispatch(actions.fetchNftsBreakdown());
  }, [dispatch]);

  useEffect(() => {
    const newNfts = nftsState.data
      ? shuffle
        ? shuffleArray(nftsState.data)
        : nftsState.data
      : [];
    setNfts(newNfts);
  }, [nftsState]);

  useEffect(() => {
    if (filter.data == null) return;
    const {
      selectedSearchKey,
      selectedMinPrice,
      selectedMaxPrice,
      selectedCategory,
      selectedStatus,
      selectedSort,
    } = filter.data;

    let categoryTmpList = [];
    let priceTmpList = [];
    let statusTmpList = [];
    let searchTmpList = [];

    if (
      selectedCategory &&
      selectedCategory != "" &&
      selectedCategory != "all"
    ) {
      nfts.map((nft) => {
        if (nft.type == selectedCategory) categoryTmpList.push(nft);
      });
    } else {
      categoryTmpList.push(...nfts);
    }

    if (selectedMaxPrice != 9999999999 || selectedMinPrice != 0) {
      categoryTmpList.map((nft) => {
        if (nft.price >= selectedMinPrice && nft.price <= selectedMaxPrice)
          priceTmpList.push(nft);
      });
    } else if (selectedMaxPrice == 9999999999 && selectedMinPrice == 0) {
      priceTmpList.push(...categoryTmpList);
    }

    if (selectedStatus == "BuyNow") {
      priceTmpList.map((nft) => {
        if (nft.price > 0 && nft.auctionEndTime == 99999999999) {
          statusTmpList.push(nft);
        }
      });
    } else if (selectedStatus == "OnAuction") {
      priceTmpList.map((nft) => {
        if (nft.auctionEndTime < Date.now() / 1000) {
          statusTmpList.push(nft);
        }
      });
    } else if (selectedStatus == "HasOffers") {
      priceTmpList.map((nft) => {
        if (
          nft.price > 0 &&
          nft.auctionEndTime > Date.now() / 1000 &&
          nft.auctionEndTime != 99999999999
        ) {
          statusTmpList.push(nft);
        }
      });
    } else if (selectedStatus == "NotForSale") {
      priceTmpList.map((nft) => {
        if (nft.price == 0) {
          statusTmpList.push(nft);
        }
      });
    } else {
      statusTmpList.push(...priceTmpList);
    }

    if (selectedSearchKey) {
      statusTmpList.map((nft) => {
        if (
          nft.title.toLowerCase().indexOf(selectedSearchKey.toLowerCase()) > -1
        )
          searchTmpList.push(nft);
      });
    } else {
      searchTmpList.push(...statusTmpList);
    }
    if (selectedSort == "RecentlyAdded") {
      searchTmpList.sort((a, b) => {
        return b.tokenId - a.tokenId;
      });
    }
    if (selectedSort == "LowToHigh") {
      searchTmpList.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (selectedSort == "HighToLow") {
      searchTmpList.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (selectedSort == "EndingSoon") {
      searchTmpList.sort((a, b) => {
        return a.auctionEndTime - b.auctionEndTime;
      });
    }
    setNftShowList(searchTmpList);
  }, [filter, nfts]);

  //will run when component unmounted
  useEffect(() => {
    return () => {
      dispatch(clearNfts());
    };
  }, [dispatch]);

  const loadMore = () => {
    dispatch(actions.fetchNftsBreakdown());
  };

  return (
    <div className="row" style={{ paddingBottom: "25px" }}>
      <Particle />
      {nftShowList.length == 0 ? <div style={{ height: "70vh" }} /> : <></>}
      {nftShowList &&
        nftShowList.map((nft, index) => (
          <NftCard
            nft={nft}
            key={index}
            onImgLoad={onImgLoad}
            height={height}
          />
        ))}
      {showLoadMore && nftShowList.length <= 20 && (
        <div className="col-lg-12" style={{ zIndex: 10 }}>
          <div className="spacer-single"></div>
          <span onClick={loadMore} className="btn-main lead m-auto">
            Load More
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(ColumnNewRedux);
