import React from "react";
import "./style.css";
import imgAvatar from "../../assets/img_avatar.png";
import { FaBars, FaSignOutAlt } from "react-icons/fa";

const Topbar = (props) => {
  return (
    <div className="vendor-dashboard-top-bar">
      <div className="vendor-top-container">
        <div className="vendor-button-toggle">
          <button onClick={props.togglebtn}>
            {" "}
            <FaBars/>
            {/* <img src={props.img} /> */}
          </button>
        </div>
        {/* <div className="content-top">Vendor-Dash</div> */}
        <div className="sidebar-details">
          <div className="sidebar-name">
            <p>Zain</p>
          </div>
          <div className="icon-sidebar">
            <img src={imgAvatar} />
          </div>
          <div className="logout-icon">
            <button>

            <FaSignOutAlt/>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Topbar;
