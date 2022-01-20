import React from "react";
import "./footer.css";
import logo from "../../assets/logo-ibid.png";
import {
  FaAngleDoubleRight,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="custom_container">
        <div className="footer-card-wrapper">
          <div className="footer-card">
            <div className="navbar-content-logo">
              <img src={logo} alt="logo image" width="100" height="37"/>
            </div>
            <div className="footer-call-us">
              Call us toll free: +1-541-754-3010
            </div>
            <div className="footer-send-email">
              Send us an email: contact@example.com
            </div>
            <div className="navbar-social-content">
              <button name="facebook">
                <FaFacebook />
              </button>
              <button name="instagram">
                <FaInstagram />
              </button>
              <button name="twitter">
                <FaTwitter />
              </button>
            </div>
          </div>

          <div className="footer-card">
            <h4>Useful Links</h4>
            <span className="footer-subtext">
              {" "}
              <FaAngleDoubleRight /> Mobile Phone
            </span>
            <span className="footer-subtext">
              {" "}
              <FaAngleDoubleRight /> Headphones
            </span>
            <span className="footer-subtext">
              {" "}
              <FaAngleDoubleRight /> Laptop
            </span>
          </div>

          <div className="footer-card">
            <h4>Our Policy</h4>
            <span className="footer-subtext">
              <FaAngleDoubleRight /> Homepage
            </span>
            <span className="footer-subtext">
              <FaAngleDoubleRight /> Blog
            </span>
            <span className="footer-subtext">
              <FaAngleDoubleRight /> Services
            </span>
          </div>

          <div className="footer-card">
            <h4>Partners</h4>
            <span className="footer-subtext">
              <FaAngleDoubleRight /> iStep
            </span>
            <span className="footer-subtext">
              <FaAngleDoubleRight /> Artex
            </span>
            <span className="footer-subtext">
              <FaAngleDoubleRight /> Style Shop
            </span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="custom_container">
          <div className="footer-text">
            © {new Date().getFullYear()} iBID. Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
