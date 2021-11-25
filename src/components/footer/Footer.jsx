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
            <h2>Information</h2>
            <h4>About us</h4>
            <h4>My Account</h4>
            <h4>Price List</h4>
            <h4>Contacts</h4>
            <h4>Registration</h4>
          </div>

          <div className="footer-card">
            <h2>Help Center</h2>
            <h4>Assistance</h4>
            <h4>FAQ</h4>
            <h4>Testimonials</h4>
            <h4>Account Refill</h4>
            <h4>Payments</h4>
          </div>

          <div className="footer-card">
            <h2>Partners</h2>
            <h4>iStep</h4>
            <h4>Artex</h4>
            <h4>Style Shop</h4>
            <h4>CrystalTech</h4>
            <h4>VIP Fashion</h4>
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
