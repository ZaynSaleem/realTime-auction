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
import { Link } from "react-router-dom";

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
              <span name="facebook">
                <FaFacebook />
              </span>
              <span name="instagram">
                <FaInstagram />
              </span>
              <span name="twitter">
                <FaTwitter />
              </span>
            </div>
            <div className="navbar-content-logo">
              <img src={logo} alt="image" width="100" height="37" />
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
                <Link to="/">Home</Link>
              </div>
              <div className="item-link">
                <Link to="/allproducts">Products</Link>
              </div>

              <div className="item-link">
                {Data?.length && Data[0]?.role === "vendor" ? (
                  <Link to="/add-product">Sell</Link>
                ) : Data[0]?.role === "user" ? (
                  <Link to="/sign-up">Sell</Link>
                ) : (
                  ""
                )}
              </div>
              <div className="item-link">
                <Link to="#">About</Link>
              </div>
              {Data && Data?.length && Data[0]?.role ? (
                Data[0]?.role === "vendor" ? (
                  <div className="item-link">
                    <Link to="/vendor-dash">Dashboard</Link>
                  </div>
                ) : (
                  <div className="item-link">
                    <Link to="/user-dash">Dashboard</Link>
                  </div>
                )
              ) : (
                ""
              )}
              {Data?.length && Data[0]?.email === "admin@admin.com" ? (
                <div className="item-link">
                  <Link to="/dashboard">Dashboard</Link>
                </div>
              ) : (
                ""
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
            <Link to="/">Home</Link>
          </div>
          <div className="item-link">
            <Link to="/allproducts">Products</Link>
          </div>

          <div className="item-link">
            {Data?.length && Data[0]?.role === "vendor" ? (
              <Link to="/add-product">Sell</Link>
            ) : Data[0]?.role === "user" ? (
              <Link to="/sign-up">Sell</Link>
            ) : (
              ""
            )}
          </div>
          <div className="item-link">
            <Link to="#">About</Link>
          </div>
          {Data && Data?.length && Data[0]?.role ? (
            Data[0]?.role === "vendor" ? (
              <div className="item-link">
                <Link to="/vendor-dash">Dashboard</Link>
              </div>
            ) : (
              <div className="item-link">
                <Link to="/user-dash">Dashboard</Link>
              </div>
            )
          ) : (
            ""
          )}
          {Data?.length && Data[0]?.email === "admin@admin.com" ? (
            <div className="item-link">
              <Link to="/dashboard">Dashboard</Link>
            </div>
          ) : (
            ""
          )}
          <div className="item-link">
            <a onClick={loginUser}>Logout</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
