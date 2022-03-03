import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Clock from "../components/Clock";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import * as selectors from '../../store/selectors';
import { fetchNftDetail } from "../../store/actions/thunks";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
    border-bottom: solid 1px #dddddd;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const ItemDetailRedux = () => {

    const [openMenu, setOpenMenu] = React.useState(true);
    const [openMenu1, setOpenMenu1] = React.useState(false);
    const handleBtnClick = () => {
        setOpenMenu(!openMenu);
        setOpenMenu1(false);
        document.getElementById("Mainbtn").classList.add("active");
        document.getElementById("Mainbtn1").classList.remove("active");
    };
    const handleBtnClick1 = () => {
        setOpenMenu1(!openMenu1);
        setOpenMenu(false);
        document.getElementById("Mainbtn1").classList.add("active");
        document.getElementById("Mainbtn").classList.remove("active");
    };

    const dispatch = useDispatch();
    const nftDetailState = useSelector(selectors.nftDetailState);
    const nft = nftDetailState.data ? nftDetailState.data : [];

    useEffect(() => {
        dispatch(fetchNftDetail());
    }, [dispatch]);

    return (
        <div>
        <GlobalStyles/>
            <section className='container'>
                <div className='row mt-md-5 pt-md-4'>
                    <div className="col-md-6 text-center">
                        <img src="./img/items/big-1.jpg" className="img-fluid img-rounded mb-sm-30" alt=""/>
                    </div>
                    <div className="col-md-6">
                        <div className="item_info">
                            Auctions ends in 
                            <div className="de_countdown">
                                <Clock deadline={nft.item_deadline} />
                            </div>
                            <h2>{nft.item_title}</h2>
                            <div className="item_info_counts">
                                <div className="item_info_type"><i className="fa fa-image"></i>{nft.item_category}</div>
                                <div className="item_info_views"><i className="fa fa-eye"></i>{nft.item_views}</div>
                                <div className="item_info_like"><i className="fa fa-heart"></i>{nft.item_likes}</div>
                            </div>
                            <p>{nft.item_description}</p>

                            <h6>Creator</h6>
                            <div className="item_author">                                    
                                <div className="author_list_pp">
                                    <span>
                                        <img className="lazy" src={nft.author && nft.author.avatar} alt=""/>
                                        <i className="fa fa-check"></i>
                                    </span>
                                </div>                                    
                                <div className="author_list_info">
                                    <span>{nft.author && nft.author.username}</span>
                                </div>
                            </div>

                            <div className="spacer-40"></div>

                            <div className="de_tab">

                            <ul className="de_nav">
                                <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>Bids</span></li>
                                <li id='Mainbtn1' className=''><span onClick={handleBtnClick1}>History</span></li>
                            </ul>
                                        
                            <div className="de_tab_content">
                                {openMenu && (  
                                <div className="tab-1 onStep fadeIn">
                                    {nft.bids && nft.bids.map((bid, index) => (
                                        <div className="p_list" key={index}>
                                            <div className="p_list_pp">
                                                <span>
                                                    <img className="lazy" src={bid.avatar} alt=""/>
                                                    <i className="fa fa-check"></i>
                                                </span>
                                            </div>                                    
                                            <div className="p_list_info">
                                                Bid {bid.is_author && 'accepted'} <b>{bid.value} ETH</b>
                                                <span>by <b>{bid.username}</b> at {bid.timestamp}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                )}

                                {openMenu1 && ( 
                                <div className="tab-2 onStep fadeIn">
                                    {nft.history && nft.history.map((bid, index) => (
                                        <div className="p_list" key={index}>
                                            <div className="p_list_pp">
                                                <span>
                                                    <img className="lazy" src={bid.avatar} alt=""/>
                                                    <i className="fa fa-check"></i>
                                                </span>
                                            </div>                                    
                                            <div className="p_list_info">
                                                Bid {bid.is_author && 'accepted'} <b>{bid.value} ETH</b>
                                                <span>by <b>{bid.username}</b> at {bid.timestamp}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                )}
                                
                            </div>     
                        </div>          
                    </div>
                </div>
            </div>
        </section>
        <Footer />
        </div>
    );
}

export default memo(ItemDetailRedux);