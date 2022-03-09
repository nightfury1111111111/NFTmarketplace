import React from "react";
import { Router, Location, Redirect } from "@reach/router";
import ScrollToTopBtn from "./menu/ScrollToTop";
import Header from "./menu/header";
import Home2 from "./pages/home2";
import Explore from "./pages/explore";
import NftDetail from "./pages/ItemDetail";
import Create from "./pages/create";
import About from "./pages/about.js";
import Map from "./components/map/app";

import { createGlobalStyle } from "styled-components";

import "stylecraft/dist/stylecraft.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "../assets/input-range.css";
import "../assets/hacks.css";
import "../assets/mapbox-hacks.css";

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location]);
  return children;
};

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id="routerhang">
        <div key={location.key}>
          <Router location={location}>{children}</Router>
        </div>
      </div>
    )}
  </Location>
);

const app = () => (
  <div className="wraper">
    <GlobalStyles />
    <Header />
    <PosedRouter>
      <ScrollTop path="/">
        <Home2 exact path="/">
          <Redirect to="/home2" />
        </Home2>
        <Explore path="/explore" />
        <Create path="/create" />
        <About path="/about" />
        <NftDetail path="/nft/:id" />
        <Map path="/world" />
      </ScrollTop>
    </PosedRouter>
    <ScrollToTopBtn />
  </div>
);
export default app;
