import React from "react";
import Footer from "../components/footer";
import { Link } from "@reach/router";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  .navbar {
    border-bottom: solid 1px rgba(255, 255, 255, .1) !important;
  }
`;

const logintwo = () => (
  <div>
    <section
      className="jumbotron breadcumb no-bg"
      style={{
        fontFamily: "Archivo Black",
        // backgroundImage: `url("img/news/news-2.jpg")`,
        backgroundSize: "100% 100%",
        zIndex: 5,
      }}
    >
      <div className="mainbreadcumb">
        <div className="container">
          <div className="row m-10-hor">
            <div className="col-12">
              <h1 className="text-center">About us</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      className="container"
      style={{
        height: "80vh",
        color: "white",
        textAlign: "center",
        fontSize: "30px",
        paddingTop: "50px",
      }}
    >
      Coming soon ...
    </section>

    <Footer />
  </div>
);
export default logintwo;
