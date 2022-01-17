import React, { useState } from "react";
import {
  FaAlignRight,
  FaFacebook,
  FaInstagram,
  FaTruck,
  FaTwitter,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../../store/actions/AuthAction";
import "./head.css";
import logo from "../../assets/logo-ibid.png";

const Navbar = (props) => {
  const Data = useSelector((state) => state?.auth.auth);
  const [navBool, setNavBool] = useState(false);

  let dispatch = useDispatch();
  let history = useHistory();
  const logoutUser = () => {
    dispatch(logout());
    history.push("/sign-in");
  };
  const loginUser = () => {
    history.push("/sign-in");
  };
  return (
    <>
      <div className="navbar-tops">
        <div className="custom_container">
          <div className="navbar-top-content">
            <div className="call-us">Call us toll free: +1-541-754-3010</div>
            <div className="send-email">
              Send us an email: contact@example.com
            </div>
            <div className="order-tracking">
              <FaTruck /> Order Tracking
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-second">
        <div className="custom_container">
          <div className="navbar-second-wrapper">
            <div className="navbar-social-content">
              <button>
                <FaFacebook />
              </button>
              <button>
                <FaInstagram />
              </button>
              <button>
                <FaTwitter />
              </button>
            </div>
            <div className="navbar-content-logo">
              <img src={logo} />
            </div>
            <div className="toggle-button">
              <button onClick={() => setNavBool(!navBool)}>
                <FaAlignRight />
              </button>
            </div>

            {Data && Data?.length ? (
              <div className="sign-in-button">
                <div className="action-name">
                  {Data[0]?.email?.split("@")[0]}
                </div>
                <div className="action-auth">
                  <button onClick={logoutUser}>Logout</button>
                </div>
              </div>
            ) : (
              <div className="sign-in-button">
                <div className="action-name">My Account</div>
                <div className="action-auth">
                  <button onClick={loginUser}>Login</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="navbar-wrapper">
        <div className="custom_container">
          <div className="navbar-content">
            <div className="navbar-content-items">
              <div className="item-link">
                <a href="/">Home</a>
              </div>
              <div className="item-link">
                <a href="/allproducts">Products</a>
              </div>
              <div className="item-link">
                <a href="#">Buy</a>
              </div>
              <div className="item-link">
                <a href="#">Sell</a>
              </div>
              <div className="item-link">
                <a href="#">About</a>
              </div>
              {Data && Data?.length && Data[0]?.role ? (
                Data[0]?.role === "vendor" ? (
                  <div className="item-link">
                    <a href="/vendor-dash">Dashboard</a>
                  </div>
                ) : (
                  <div className="item-link">
                    <a href="/user-dash">Dashboard</a>
                  </div>
                )
              ) : (
                <div className="item-link">
                  <a href="/dashboard">Dashboard</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="sidenav-wrapper"
        style={navBool === false ? { display: "none" } : { display: "block" }}
      >
        <div className="sidenav-items">
          <div className="item-link">
            <a href="/">Home</a>
          </div>
          <div className="item-link">
            <a href="/allproducts">Products</a>
          </div>
          <div className="item-link">
            <a href="#">Buy</a>
          </div>
          <div className="item-link">
            <a href="#">Sell</a>
          </div>
          <div className="item-link">
            <a href="#">About</a>
          </div>
          <div className="item-link">
            <a onClick={loginUser}>Logout</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
