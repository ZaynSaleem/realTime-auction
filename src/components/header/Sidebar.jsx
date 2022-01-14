import "./head.css";

import { useHistory } from "react-router";
import {
  FaChartLine,
  FaHeadset,
  FaRegPlusSquare,
  FaTimes,
  FaUser,
  FaUsers,
  FaProductHunt,
} from "react-icons/fa";

const Sidebar = ({ toggleBool, togglebtn }) => {
  let history = useHistory();

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

          <div className="items-wrapper">
            <div className="sidebar-item">
              <button
                className="button-sidebar"
                onClick={() => history.push("/dashboard")}
              >
                <FaChartLine />
                <span className="btn-text-vendor">Dashboard</span>
              </button>
            </div>
            <div className="sidebar-item">
              <button
                className="button-sidebar"
                onClick={() => history.push("/add-category")}
              >
                <FaRegPlusSquare />
                <span className="btn-text-vendor"> Add Category</span>
              </button>
            </div>

            <div className="sidebar-item">
              <button
                className="button-sidebar"
                onClick={() => history.push("/products")}
              >
                <FaProductHunt />
                <span className="btn-text-vendor"> Products</span>
              </button>
            </div>

            <div className="sidebar-item">
              <button
                className="button-sidebar"
                onClick={() => history.push("/vendors")}
              >
                <FaUser />
                <span className="btn-text-vendor"> Vendors</span>
              </button>
            </div>

            <div className="sidebar-item">
              <button
                className="button-sidebar"
                onClick={() => history.push("/bidders")}
              >
                <FaUsers />
                <span className="btn-text-vendor"> Users</span>
              </button>
            </div>
          </div>
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

export default Sidebar;
