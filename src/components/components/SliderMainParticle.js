import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const slidermainparticle = () => (
  <div className="container bannerText">
    <div className="row align-items-center justify-content-center">
      <div className="col-md-9">
        <div className="spacer-single"></div>
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={300}
          duration={900}
          triggerOnce
        >
          <div
            className="bannerTitle"
            style={{
              fontFamily: "Archivo Black",
              textShadow: "0 2px 10px #f38aff",
            }}
          >
            <span>LUV</span>
            <span> NFT</span>
            <span className='gradientText'> ESTATE</span>
          </div>
        </Reveal>
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={600}
          duration={900}
          triggerOnce
        >
          <div className='bannerDesc'>
            Donate, trade, collect and sell virtual properties based on
            real-world addresses.
          </div>
        </Reveal>
      </div>
    </div>
  </div>
);
export default slidermainparticle;