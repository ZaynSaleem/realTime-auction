import React from "react";
import "./style.css";
import imgAvatar from "../../assets/img_avatar.png";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/actions/AuthAction";

const Topbar = (props) => {
  const auth = useSelector((state) => state?.auth.auth);

  let dispatch = useDispatch();
  let history = useHistory();

  const logoutUser = () => {
    dispatch(logout());
    history.push("/sign-in");
  };
  return (
    <div className="vendor-dashboard-top-bar">
      <div className="vendor-top-container">
        <div className="vendor-button-toggle">
          <button onClick={props.togglebtn}>
            {" "}
            <FaBars />
          </button>
        </div>
        <div className="sidebar-details">
          <div className="sidebar-name">
            <p>{auth[0]?.email?.split("@")[0]}</p>
          </div>
          <div className="icon-sidebar">
            <img src={imgAvatar} />
          </div>
          <div className="logout-icon">
            <button dataToggle="tooltip" title="logout" onClick={logoutUser}>
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
