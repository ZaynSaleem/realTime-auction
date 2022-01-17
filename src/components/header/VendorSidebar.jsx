import "./head.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  FaChartLine,
  FaHeadset,
  FaRegPlusSquare,
  FaTruck,
  FaTimes,
} from "react-icons/fa";

const VendorSidebar = ({ toggleBool, name, togglebtn }) => {
  let history = useHistory();
  const Data = useSelector((state) => state?.auth.auth);

  return (
    <div
      className={
        toggleBool === false ? "dashboard-sidebar" : "dashboard-sidebar-toggle"
      }
    >
      <div className="sidebar-container">
        <div className="close-btn-sidebar">
          <button onClick={togglebtn}>
            <FaTimes />
          </button>
        </div>
        <div className="sidebar-wrapper">
          <div className="sidebar-head">
            <a href="/">
              <h1>
                <span>i</span>BID
              </h1>
            </a>
          </div>
          {Data && Data?.length && Data[0]?.role === "vendor" ? (
            <div className="items-wrapper">
              <div className="sidebar-item">
                <button
                  className="button-sidebar"
                  onClick={() => {
                    history.push("/vendor-dash");
                  }}
                >
                  <FaChartLine />
                  <span className="btn-text-vendor">Dashboard</span>
                </button>
              </div>
              <div className="sidebar-item">
                <button
                  className="button-sidebar"
                  onClick={() => {
                    history.push("/add-product");
                  }}
                >
                  <FaRegPlusSquare />
                  <span className="btn-text-vendor"> Add Product</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="items-wrapper">
              <div className="sidebar-item">
                <button
                  className="button-sidebar"
                  onClick={() => {
                    history.push("/user-dash");
                  }}
                >
                  <FaChartLine />
                  <span className="btn-text-vendor">Dashboard</span>
                </button>
                <button
                  className="button-sidebar"
                  onClick={() => {
                    history.push("/current-auction");
                  }}
                >
                  <FaChartLine />
                  <span className="btn-text-vendor">Current Auction</span>
                </button>
              </div>
            </div>
          )}

          <div className="end-wrapper">
            <div className="sidebar-item">
              <button className="button-sidebar">
                <FaHeadset />
                <span className="btn-text-vendor"> Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSidebar;
