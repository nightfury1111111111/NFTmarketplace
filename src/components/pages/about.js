// import React from "react";
// import Footer from "../components/footer";
// import { Link } from "@reach/router";
// import { createGlobalStyle } from "styled-components";

// const GlobalStyles = createGlobalStyle`
//   .navbar {
//     border-bottom: solid 1px rgba(255, 255, 255, .1) !important;
//   }
// `;

// const logintwo = () => (
//   <div>
//     <section
//       className="jumbotron breadcumb no-bg"
//       style={{
//         fontFamily: "Archivo Black",
//         // backgroundImage: `url("img/news/news-2.jpg")`,
//         backgroundSize: "100% 100%",
//         zIndex: 5,
//       }}
//     >
//       <div className="mainbreadcumb">
//         <div className="container">
//           <div className="row m-10-hor">
//             <div className="col-12">
//               <h1 className="text-center">About us</h1>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>

//     <section
//       className="container"
//       style={{
//         height: "80vh",
//         color: "white",
//         textAlign: "center",
//         fontSize: "30px",
//         paddingTop: "50px",
//       }}
//     >
//       Coming soon ...
//     </section>

//     <Footer />
//   </div>
// );
// export default logintwo;

import React from "react";
import Footer from "../components/footer";
import { Link } from "@reach/router";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  .navbar {
    // border-bottom: solid 1px rgba(255, 255, 255, .1) !important;
  }
`;

const logintwo = () => (
  <div style={{ fontFamily: "Poppins", color: "white", background: "#FAE1DF" }}>
    <GlobalStyles />

    <section className="jumbotron breadcumb no-bg">
      <div className="mainbreadcumb">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2 text-center">
              <h1 className="titleFont">Help Center</h1>
              <div className="spacer-20"></div>
              <form className="row" id="form_sb" name="myForm">
                <div className="col text-center">
                  <input
                    className="form-control"
                    id="name_1"
                    name="name_1"
                    placeholder="type your question here"
                    type="text"
                  />{" "}
                  <button id="btn-submit">
                    <i className="arrow_right"></i>
                  </button>
                </div>
              </form>
              <div className="spacer-20"></div>

              <p className="mt-0">eg. create item, create wallet.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      className="container"
      style={{ paddingTop: "25px", fontFamily: "Poppins" }}
    >
      <div className="row">
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
            <div className="text">
              <h4 className="titleFont">Getting Started</h4>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam.
              </p>
              <Link to="" className="btn-main m-auto">
                Read more
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
            <div className="text">
              <h4 className="titleFont">Buying</h4>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam.
              </p>
              <Link to="" className="btn-main m-auto">
                Read more
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
            <div className="text">
              <h4 className="titleFont">Selling</h4>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam.
              </p>
              <Link to="" className="btn-main m-auto">
                Read more
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
            <div className="text">
              <h4 className="titleFont">Creating</h4>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam.
              </p>
              <Link to="" className="btn-main m-auto">
                Read more
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
            <div className="text">
              <h4 className="titleFont">Partners</h4>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam.
              </p>
              <Link to="" className="btn-main m-auto">
                Read more
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
            <div className="text">
              <h4 className="titleFont">Developers</h4>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam.
              </p>
              <Link to="" className="btn-main m-auto">
                Read more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);
export default logintwo;
