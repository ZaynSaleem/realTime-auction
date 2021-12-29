import React from "react";
import "./style.css";
import imgAvatar from "../../assets/img_avatar.png";

const Topbar = (props) => {
  return (
    <div className="vendor-dashboard-top-bar">
      <div className="vendor-top-container">
        <div className="vendor-button-toggle">
          <button onClick={props.togglebtn}>
            {" "}
            <img src={props.img} />
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
        </div>
      </div>
    </div>
  );
};

export default Topbar;
