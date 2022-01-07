import React from "react";
import { FaFacebookSquare, FaTwitter, FaTwitterSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../../store/actions/AuthAction";
import "./head.css";

const Navbar = (props) => {
  const Data = useSelector((state) => state?.auth.auth);
  // console.log(Data);
  // if (props?.role) {
  //   props?.role(Data[0]?.role);
  // }

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
              {Data && Data?.length ? (
                <>
                  <div className="actions">{Data[0]?.email?.split("@")[0]}</div>
                  <div className="logout">
                    <button onClick={logoutUser}>Logout</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="actions">My Account</div>
                  <div className="logout">
                    <button onClick={loginUser}>Login</button>
                  </div>
                </>
              )}
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
              {Data && Data?.length && Data[0]?.role === "vendor" ? (
                <div className="nav-items">
                  <a href="/vendor-dash">Dashboard</a>
                </div>
              ) : null}
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
