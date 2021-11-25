import React from "react";
import { FaFacebookSquare, FaTwitter, FaTwitterSquare } from "react-icons/fa";
import "./head.css";
import toggleMenu from "../../assets/toggleMenu.png";

const Navbar = () => {
  return (
    <div className="home-container">
      <div className="navbar-top">
        <div className="custom_container">
          <div className="navbar-top-inner">
            <div className="top-social-left">
              <div className="facebook">
                <FaFacebookSquare />
              </div>
              <div className="twitter">
                <FaTwitter />
              </div>
            </div>
            <div className="top-right">
              <div className="actions">My Account</div>
              <div className="logout">
                <button>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar-main">
        <div className="custom_container">
          <div className="navbar-inner">
            <div className="navbar-logo">
              <span>i</span>BID
            </div>
            <div className="navbar-menu">
              <div className="nav-items">
                <a href="#">Home</a>
              </div>
              <div className="nav-items">
                <a href="#">About</a>
              </div>
              <div className="nav-items">
                <a href="#">Sell</a>
              </div>
              <div className="nav-items">
                <a href="#">Buy</a>
              </div>
              <div className="nav-items">
                <a href="#">Products</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="navbar-main">
        <div className="custom-container">
          {" "}
          <button>
            <img src={toggleMenu} />
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;
