import React, { useEffect, useState } from "react";
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints,
} from "react-socks";
import { useSelector, useDispatch } from "react-redux";
// import { header } from "react-bootstrap";
import { Link } from "@reach/router";
import useOnclickOutside from "react-cool-onclickoutside";

import { getWalletInfo, fetchNftsBreakdown } from "../../store/actions/thunks";
import * as selectors from "../../store/selectors";
import Logo from "../../assets/luv_nft_estate_logo_map.png";

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? "active aaa" : "non-active",
      };
    }}
  />
);

const Header = function () {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  const dispatch = useDispatch();
  const accountInfo = useSelector(selectors.accountState);

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
  };
  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const closeMenu1 = () => {
    setOpenMenu1(false);
  };
  const closeMenu2 = () => {
    setOpenMenu2(false);
  };
  const closeMenu3 = () => {
    setOpenMenu3(false);
  };
  const ref = useOnclickOutside(() => {
    closeMenu();
  });
  const ref1 = useOnclickOutside(() => {
    closeMenu1();
  });
  const ref2 = useOnclickOutside(() => {
    closeMenu2();
  });
  const ref3 = useOnclickOutside(() => {
    closeMenu3();
  });

  const [showmenu, btn_icon] = useState(false);
  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        totop.classList.add("show");
      } else {
        header.classList.remove("sticky");
        totop.classList.remove("show");
      }
      if (window.pageYOffset > sticky) {
        closeMenu();
      }
    });
    dispatch(getWalletInfo());
    dispatch(fetchNftsBreakdown());
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  useEffect(() => {
    // setIsAdmin(accountInfo.data.manager === accountInfo.data.account);
    accountInfo.data &&
      setIsAdmin(accountInfo.data.manager === accountInfo.data.account);
  }, [accountInfo]);

  const accountChangedHandler = () => {
    dispatch(getWalletInfo());
    window.location.reload();
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  window.ethereum.on("accountsChanged", accountChangedHandler);
  window.ethereum.on("chainChanged", chainChangedHandler);

  return (
    <header id="myHeader" className="navbar white">
      <div className="container">
        <div className="row w-100-nav">
          <div className="logo px-0">
            <div className="navbar-title navbar-item">
              <NavLink to="/">
                <img src={Logo} className="img-fluid luvLogo" alt="#" />
              </NavLink>
            </div>
          </div>

          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu && (
                <div className="menu">
                  {isAdmin && (
                    <div className="navbar-item">
                      <NavLink to="/create" onClick={() => btn_icon(!showmenu)}>
                        💎
                      </NavLink>
                    </div>
                  )}
                  <div className="navbar-item">
                    <NavLink to="/" onClick={() => btn_icon(!showmenu)}>
                      🏠
                    </NavLink>
                  </div>
                  <div className="navbar-item">
                    <NavLink to="/explore" onClick={() => btn_icon(!showmenu)}>
                      🗺
                    </NavLink>
                  </div>
                  <div className="navbar-item">
                    <NavLink to="/about" onClick={() => btn_icon(!showmenu)}>
                      🤔
                    </NavLink>
                  </div>
                </div>
              )}
            </Breakpoint>

            <Breakpoint xl>
              <div className="menu">
                {isAdmin && (
                  <div className="navbar-item">
                    <NavLink to="/create" onClick={() => btn_icon(!showmenu)}>
                      💎
                    </NavLink>
                  </div>
                )}
                <div className="navbar-item">
                  <NavLink to="/" onClick={() => btn_icon(!showmenu)}>
                    🏠
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink to="/explore" onClick={() => btn_icon(!showmenu)}>
                    🗺
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink to="/about" onClick={() => btn_icon(!showmenu)}>
                    🤔
                  </NavLink>
                </div>
              </div>
            </Breakpoint>
          </BreakpointProvider>

          {/* <div className="mainside">
              <div className="btn-main" onClick={connectWallet}>
                Connect
              </div>
            </div> */}
        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
    </header>
  );
};
export default Header;
