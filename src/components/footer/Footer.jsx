import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="custom_container">
        <div className="footer-card-wrapper">
          <div className="footer-card">
            <h1> <span>i</span>BID</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              nemo minima qui dolor, iusto iure
            </p>
          </div>

          <div className="footer-card">
            <h4>Information</h4>
            <span className="footer-subtext">About us</span>
            <span className="footer-subtext">My Account</span>
            <span className="footer-subtext">Price List</span>
            <span className="footer-subtext">Contacts</span>
            <span className="footer-subtext">Registration</span>
          </div>

          <div className="footer-card">
            <h4>Help Center</h4>
            <span className="footer-subtext">Assistance</span>
            <span className="footer-subtext">FAQ</span>
            <span className="footer-subtext">Testimonials</span>
            <span className="footer-subtext">Account Refill</span>
            <span className="footer-subtext">Payments</span>
          </div>

          <div className="footer-card">
            <h4>Partners</h4>
            <span className="footer-subtext">iStep</span>
            <span className="footer-subtext">Artex</span>
            <span className="footer-subtext">Style Shop</span>
            <span className="footer-subtext">CrystalTech</span>
            <span className="footer-subtext">VIP Fashion</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="custom_container">
          <div className="footer-text">©  2021 iBID. Privacy Policy</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
