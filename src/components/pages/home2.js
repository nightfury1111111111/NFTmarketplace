import React, { useState } from "react";
import Particle from "../components/Particle";
import SliderMainParticle from "../components/SliderMainParticle";
import FeatureBox from "../components/FeatureBox";
import CarouselCollectionRedux from "../components/CarouselCollectionRedux";
import CarouselNewRedux from "../components/CarouselNewRedux";
import AuthorListRedux from "../components/AuthorListRedux";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  .navbar .mainside a{
    background: #8364e2;
    &:hover{
      box-shadow: 2px 2px 20px 0px #8364e2;
    }
  }
  .item-dropdown{
    .dropdown{
      a{
        &:hover{
          background: #8364e2;
        }
      }
    }
  }
  .btn-main{
    background: #8364e2;
    &:hover{
      box-shadow: 2px 2px 20px 0px #8364e2;
    }
  }
  p.lead{
    color: #a2a2a2;
  }
  .navbar .navbar-item .lines{
    border-bottom: 2px solid #8364e2;
  }
  .jumbotron.no-bg{
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
  #tsparticles{
    top: 0;
  }
  .text-uppercase.color{
    color: #8364e2;
  }
  .de_count h3 {
    font-size: 36px;
    margin-bottom: 0px;
  }
  .de_count h5{
    font-size: 14px;
    font-weight: 500;
  }
  h2 {
    font-size: 30px;
  }
  .box-url{
    text-align: center;
    h4{
      font-size: 16px;
    }
  }
  .de_countdown{
    border: solid 2px #8364e2;
  }
  .author_list_pp, .author_list_pp i, 
  .nft_coll_pp i, .feature-box.style-3 i, 
  footer.footer-light #form_subscribe #btn-subscribe i, 
  #scroll-to-top div{
    background: #69E4AD;
  }
  footer.footer-light .subfooter .social-icons span i{
    background: #403f83;
  }
  .author_list_pp:hover img{
    box-shadow: 0px 0px 0px 2px #8364e2;
  }
  .nft__item_action span{
    color: #8364e2;
  }
  .feature-box.style-3 i.wm{
    color: rgba(131,100,226, .1);
  }
  .sectionTwo {
    width: 100%;
    height: 100vh;
    background-color: #050814;
    display: flex;
    align-items: center;
  }
  .sectionTwoFirstPart{
    width: 100%;
    height: 410px;
    display: flex;
    justify-content: space-evenly;
  }
  .sectionTwoTitle{
    margin-top: 40px;
    width: 30%;
    height: 100%;
    color: white;
    font-size: 45px;
  }
  .sectionTwoVideo{
    width: 30%;
    height: 100%;
  }
  .sectionThree{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #050814;
    color: white;
  }
  .subtitle{
    width: 100%;
    height: 15%;
    font-size: 58px;
    font-family: "Archivo Black";
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sectionThreeVideo{
    margin-top: 40px;
    width: 80%;
    height: 100%;
  }
  .sectionFour{
    min-height: 700px;
    padding-top: 100px;
    padding-bottom: 16px;
    background-color: #050814;
  }
  .subtitleTwo{
    width: 100%;
    height: 100px;
    font-size: 50px;
    font-family: "Archivo Black";
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .cardContainer{
    margin-left: auto;
    margin-right: auto;
    padding-left: 20px;
    padding-right: 20px;
    width: 80%;
    height: 100%;
    margin-top: 220px;
    margin-bottom: 100px;
  }
  .gridCard{
    display: grid;
    grid-template-columns: auto auto auto;
    padding: 10px;
    grid-column-gap: 48px;
    grid-row-gap: 150px;
  }
  .gridItem{
    background-color: #13151c;
    border: 1px solid rgba(0, 0, 0, 0.8);
    padding: 20px;
    font-size: 30px;
    text-align: center;
    width: 100%;
    height: 550px;
    border-radius: 15px;
    position: relative;
  }
  .linkToMarket{
    position: absolute;
    top: -100px;
    padding-right: 30px;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-start;
  }
  .cardImage{
    max-height: 160px;
    margin-bottom: 15px;
  }
  .cardTitle{
    margin-bottom: 30px;
    color: #fff;
    font-family: "Archivo Black";
    font-size: 32px;
    font-weight: 700;
  }
  .cardContent{
    margin-top: 0px;
    margin-bottom: 10px;
    padding-left: 0;
    list-style: none;
    color: #c9c9c9;
    font-size: 16px;
    font-family: "Poppins";
  }
  .cardText{
    margin-bottom: 10px;
    text-align: left;
  }
  .faqQuestion{
    width: 100%;
    background-color: transparent;
    color: white;
    text-align: left;
    font-family: "Archivo Black";
    font-size: 25px;
    padding-top: 30px;
    border: 0;
    border-bottom: 2px solid;
    display: flex;
    justify-content: space-between;
  }
  .icon-plus{
    color: #5ec4cd;
    margin-right: 20px;
    font-size: 20px;
  }
  .faqanswer{
    font-size: 24px;
    font-family: "Poppins";
    padding-top: 15px;
    padding-bottom: 10px;
  }
  .hide{
    display: none;
  }

  @media only screen and (max-width: 1199px) {
    .navbar{
      
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
  @media only screen and (max-width: 600px){
    .sectionTwo {
      height: fit-content;
    }
    .sectionTwoFirstPart{
      flex-direction: column;
      height: fit-content;
      align-items: center;
    }
    .sectionTwoTitle{
      width: 100%;
      font-size: 30px;
      padding: 15px;
      text-align: center;
    }
    .sectionTwoVideo{
      width: fit-content;
      margin-bottom: 25px;
    }
    .subtitle{
      font-size: 35px;
    }
    .sectionThreeVideo{
      margin-bottom: 25px;
    }
    .subtitleTwo{
      font-size: 32px;
      text-align:center;
    }
    .cardContainer{
      margin-top: 150px;
      padding-left: 0;
      padding-right: 0;
      margin-bottom: 20px;
    }
    .gridCard{
      grid-template-columns: auto;
      padding:0;
    }
    .gridItem{
      height:580px;
    }
    .faqQuestion, .faqanswer {
      font-size: 15px;
    }
  }
`;

const Home = () => {
  const [faqOpenNum, setFaqOpenNum] = useState(0);

  const openAnswer = (num) => {
    if (faqOpenNum !== num) setFaqOpenNum(num);
    else setFaqOpenNum(0);
  };

  return (
    <div>
      <GlobalStyles />
      <section
        className="jumbotron no-bg"
        // style={{ backgroundImage: `url(${"./img/background/8.jpg"})` }}
      >
        <video
          style={{
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            // position: "absolute",
            margin: "auto",
            width: "100%",
            height: "100vh",
            right: "-100%",
            bottom: "-100%",
            top: "-100%",
            left: "-100%",
            objectFit: "cover",
            zIndex: "-100",
          }}
          muted
          autoPlay
          loop
        >
          <source
            src="rocket-psychedelic-animation-for-colorful-nft-2022-01-18-20-26-02-utc.webm"
            type="video/mp4"
          />
        </video>
        {/* <Particle /> */}
        <SliderMainParticle />
      </section>

      <section className="sectionTwo">
        <div className="sectionTwoFirstPart">
          <div className="sectionTwoTitle">
            <div
              style={{
                fontFamily: "Archivo Black",
                lineHeight: "1",
              }}
            >
              Donate to own a piece of the LUV Metaverse virtual real estate.
            </div>
            <div
              style={{
                fontFamily: "Poppins",
                fontSize: "16px",
                marginTop: "30px",
              }}
            >
              Experience true ownership with digital assets. Buy back the world.
            </div>
            <div
              style={{
                width: "200px",
                backgroundColor: "white",
                color: "black",
                fontSize: "16px",
                marginTop: "40px",
                fontFamily: "Poppins",
                marginLeft: "auto",
                marginRight: "auto",
                height: "40px",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <a
                href="https://app.pitch.com/app/presentation/e393f6a0-e52c-4b62-a8af-ea0aeafbd3dc/125d0833-c10b-4a3f-8c80-db75e6b3dc77"
                style={{ textDecoration: "none", color: "black" }}
              >
                Learn more
                {/* <ArrowRightIcon /> */}
              </a>
            </div>
          </div>
          <div className="sectionTwoVideo">
            <iframe
              src="https://discord.com/widget?id=910051231437819914&theme=dark"
              allowtransparency="true"
              frameBorder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              style={{ width: "300px", height: "400px" }}
            ></iframe>
          </div>
        </div>
      </section>

      <section className="sectionThree">
        <div className="subtitle">🌎 THE LNE GAME</div>
        <div className="sectionThreeVideo">
          <iframe
            src="https://www.youtube.com/embed/wTYi2W18REE?rel=0&amp;controls=1&amp;autoplay=0&amp;mute=0&amp;start=0"
            allowtransparency="true"
            frameBorder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            style={{ width: "100%", height: "100%" }}
          ></iframe>
        </div>
      </section>

      <section className="sectionFour">
        <div className="subtitleTwo">🏁 BUY BACK THE WORLD</div>
        <div className="cardContainer">
          <div className="gridCard">
            <div className="gridItem">
              <div className="linkToMarket">
                <img className="cardImage" src="img/Element_1.png" />
                <div className="cardTitle">🏁Land📍</div>
                <div className="cardContent">
                  <div className="cardText">
                    All 5️⃣D LUVRS have the right to own virtual real estate.
                  </div>
                  <div className="cardText">
                    💼 In 2021 Metaverse land increased in value 500%
                  </div>
                  <div className="cardText">
                    🌇 In 2021 $500 million worth of virtual real estate sold
                  </div>
                  <div className="cardText">
                    🎁 LUV NFT estate make a great gift
                  </div>
                </div>
              </div>
            </div>
            <div className="gridItem">
              <div className="linkToMarket">
                <img className="cardImage" src="img/Element_2.png" />
                <div className="cardTitle">💙Haus🔑</div>
                <div className="cardContent">
                  <div className="cardText">
                    🚪 If you own a Haus you can rent out a room to a 5️⃣D LUVR
                  </div>
                  <div className="cardText">
                    🪙 Sell your home attached to your LUV NFT Estate
                  </div>
                  <div className="cardText">🧸 Own your childhood home</div>
                </div>
              </div>
            </div>
            <div className="gridItem">
              <div className="linkToMarket">
                <img className="cardImage" src="img/Element_3.png" />
                <div className="cardTitle">🛏Hotel🛎</div>
                <div className="cardContent">
                  <div className="cardText">
                    Donate to own a virtual Hotel in your city. Verified hotel
                    owners can create NFT time share rooms
                  </div>
                  <div className="cardText">
                    🚪 Find a same day NFT auction room deal
                  </div>
                  <div className="cardText">
                    🍷 Barter a NFT drink at the bar for a real life drink
                  </div>
                  <div className="cardText">
                    🍤 Barter NFT food at a restaurant for real life food
                  </div>
                </div>
              </div>
            </div>
            <div className="gridItem">
              <div className="linkToMarket">
                <img className="cardImage" src="img/Element_4.png" />
                <div className="cardTitle">🏈Stadium⚽️</div>
                <div className="cardContent">
                  <div className="cardText">
                    Every true sports fan wants to own the stadium of their
                    favorite team. Anything is possible in LUV NFT Estate
                  </div>
                  <div className="cardText">
                    ⚾️ Donate to own a baseball, football or basketball stadium
                    in your city with no politics
                  </div>
                  <div className="cardText">
                    🏉 Add your shiny 5️⃣D LUVR to your social media profile
                    picture to let other's know you’re in the game
                  </div>
                </div>
              </div>
            </div>
            <div className="gridItem">
              <div className="linkToMarket">
                <img className="cardImage" src="img/Element_5.png" />
                <div className="cardTitle">🗿Landmark🗼</div>
                <div className="cardContent">
                  <div className="cardText">
                    Own a LUV NFT Estate Landmark in the Metaverse.
                  </div>
                  <div className="cardText">
                    🗼Own the Tokyo Tower is the second-tallest building in
                    Japan, located in Minato, Tokyo
                  </div>
                  <div className="cardText">
                    🗻Own Mount Fuji (called Fuji-san in Japan) is the largest
                    mountain in Japan
                  </div>
                  <div className="cardText">
                    🗿Own a moai, one of the famed, giant stone statues of human
                    figures on Easter Island
                  </div>
                </div>
              </div>
            </div>
            <div className="gridItem">
              <div className="linkToMarket">
                <img className="cardImage" src="img/Element_6.png" />
                <div className="cardTitle">🛍️Store🛒</div>
                <div className="cardContent">
                  <div className="cardText">
                    Boss up and own a NFT store that allows you to operate your
                    business in the LUV Metaverse
                  </div>
                  <div className="cardText">
                    🛍️ Put your store on the Metaverse business directory
                  </div>
                  <div className="cardText">🛒 Auction LUV NFT products</div>
                  <div className="cardText">
                    ⌛ Rent out your LUV NFT services and products by the hour
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="faq"
        style={{
          backgroundColor: "#050814",
          color: "white",
          zIndex: 10,
          paddingBottom: "20px",
          paddingLeft: "20%",
          paddingRight: "20%",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontFamily: "Archivo Black",
            fontSize: "50px",
            marginBottom: "35px",
          }}
        >
          <div className="text-center">FAQ</div>
        </div>
        <div>
          <div>
            <button
              className="faqQuestion"
              onClick={() => {
                openAnswer(1);
              }}
            >
              WHAT ARE LUV NFTs?
              <i className="icon-plus">+</i>
            </button>
            <div className={faqOpenNum === 1 ? "faqanswer" : "faqanswer hide"}>
              <p>
                LUV NFTs are unique SPL tokens on Solana Blockchain, that bring
                multi-utility benefits to their holders. Our LUV NFT Estate
                platform uses ERC-721 tokens created on Ethereum blockchain by
                way of Harmony.One. Think of a LUV NFT as a crypto gift card
                with an interest rate better than your bank.
              </p>
            </div>
          </div>
          <div>
            <button
              className="faqQuestion"
              onClick={() => {
                openAnswer(2);
              }}
            >
              WHEN CAN I BUY LUV NFTs?
              <i className="icon-plus">+</i>
            </button>
            <div className={faqOpenNum === 2 ? "faqanswer" : "faqanswer hide"}>
              <p>
                Now! Our market creates new drops according to the needs of our
                tribe.
              </p>
            </div>
          </div>
          <div>
            <button
              className="faqQuestion"
              onClick={() => {
                openAnswer(3);
              }}
            >
              WHO IS THE TEAM BEHIND LUV NFT?
              <i className="icon-plus">+</i>
            </button>
            <div className={faqOpenNum === 3 ? "faqanswer" : "faqanswer hide"}>
              <p>
                Hahz & Dr. Terry. Hahz is an NFT expert,{" "}
                <a href="https://nftnyc.medium.com/148-new-speakers-for-nft-nyc-in-person-nov-2-3-ba38ced79709">
                  NFT.NYC
                </a>
                lecturer and the first CNO (Chief NFT Officer) in blockchain.
                DR. Candy is the first person in blockchain with a PhD in
                Metaphysics.
              </p>
            </div>
          </div>
          <div>
            <button
              className="faqQuestion"
              onClick={() => {
                openAnswer(4);
              }}
            >
              WHERE CAN I BUY/MINT A LUV NFT?
              <i className="icon-plus">+</i>
            </button>
            <div className={faqOpenNum === 4 ? "faqanswer" : "faqanswer hide"}>
              <p>
                Minting will be directly on our website www.luvnft.com. You can
                also purchase a LUV NFT on Solesea{" "}
                <a href="https://solsea.io/creator/619344a9692d682a94d5eb20/nfts">
                  here
                </a>
                .
              </p>
            </div>
          </div>
          <div>
            <button
              className="faqQuestion"
              onClick={() => {
                openAnswer(5);
              }}
            >
              HOW DOES LUV NFT MARKET GIVE BACK TO IT’S TRIBE?
              <i className="icon-plus">+</i>
            </button>
            <div className={faqOpenNum === 5 ? "faqanswer" : "faqanswer hide"}>
              <p>
                Our blockchain nonprofit{" "}
                <a href="https//blkluv.org">BLK LUV [org]</a> developed LUV NFT
                Market game with no donations or investors to create a new P2D
                (Play to donate) blueprint that makes each player a franchise.
                Every LUV NFT Market donation is a 100% tax write off.
              </p>
            </div>
          </div>
          <div>
            <button
              className="faqQuestion"
              onClick={() => {
                openAnswer(6);
              }}
            >
              WHERE CAN I BARTER A LUV NFT FOR A SERVICE?
              <i className="icon-plus">+</i>
            </button>
            <div className={faqOpenNum === 6 ? "faqanswer" : "faqanswer hide"}>
              <p>
                Anywhere online or offline but specifically or market platform
                launching, our <a href="https://discord.gg/jvkK5TJ">Discord</a>{" "}
                #NFT-SERVICES channel or{" "}
                <a href="https://t.me/vipline5d">Telegram</a>.
              </p>
            </div>
          </div>
          <div>
            <button
              className="faqQuestion"
              onClick={() => {
                openAnswer(7);
              }}
            >
              WHERE CAN I BARTER A LUV NFT FOR A PRODUCT?
              <i className="icon-plus">+</i>
            </button>
            <div className={faqOpenNum === 7 ? "faqanswer" : "faqanswer hide"}>
              <p>
                Anywhere online or offline but specifically or market platform
                launching, our <a href="https://discord.gg/jvkK5TJY">Discord</a>{" "}
                #NFT-PRODUCTS channel or{" "}
                <a href="https://t.me/vipline5d">Telegram</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="container no-top no-bottom">
      <div className="row">
        <div className="spacer-double"></div>
        <div className="col-lg-12 mb-2">
          <h2>New Items</h2>
        </div>
      </div>
      <CarouselNewRedux />
    </section>

    <section className="container no-top no-bottom">
      <div className="row">
        <div className="spacer-double"></div>
        <div className="col-lg-12">
          <h2>Top Sellers</h2>
        </div>
        <div className="col-lg-12">
          <AuthorListRedux />
        </div>
      </div>
    </section>

    <section className="container no-top no-bottom">
      <div className="row">
        <div className="spacer-double"></div>
        <div className="col-lg-12 mb-2">
          <h2>Hot Collections</h2>
        </div>
        <div className="col-lg-12">
          <CarouselCollectionRedux />
        </div>
      </div>
    </section>

    <section className="container no-top">
      <div className="row">
        <div className="spacer-double"></div>
        <div className="col-lg-12 mb-3">
          <h2>Create and Sell Now</h2>
        </div>
        <FeatureBox />
      </div>
    </section> */}

      <Footer />
    </div>
  );
};
export default Home;
