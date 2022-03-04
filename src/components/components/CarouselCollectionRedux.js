import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { carouselCollection } from "./constants";
import CustomSlide from "./CustomSlide";
import * as selectors from '../../store/selectors';
import { fetchHotCollections } from "../../store/actions/thunks";

const CarouselCollectionRedux = () => {

  const dispatch = useDispatch();
  const hotCollectionsState = useSelector(selectors.hotCollectionsState);
  const hotCollections = hotCollectionsState.data ? hotCollectionsState.data : [];

  useEffect(() => {
    dispatch(fetchHotCollections());
}, [dispatch]);

  return (
      <div className='nft'>
        <Slider {...carouselCollection}>
          { hotCollections && hotCollections.map((item, index) => (
            <CustomSlide
              key={index}
              index={index + 1}
              avatar={item.avatar}
              banner={item.banner}
              username={item.username}
              uniqueId={item.unique_id}
            />
          ))}
        </Slider>
      </div>
  );
}

export default memo(CarouselCollectionRedux);
