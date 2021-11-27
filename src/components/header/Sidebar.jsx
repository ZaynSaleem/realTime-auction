import "./head.css";
import imgAvatar from "../../assets/img_avatar.png";

const Sidebar = ({ toggleBool }) => {
  return (
    <div
      className="dashboard-sidebar"
      style={toggleBool === false ? { width: "20%" } : { width: "0%" }}
    >
      <div className="sidebar-container">
        <div className="sidebar-wrapper">
          <div className="sidebar-head">
            <h1>
              <span>i</span>BID
            </h1>
          </div>
          <div className="sidebar-details">
            <div className="icon-sidebar">
              <img src={imgAvatar} />
            </div>
            <div className="sidebar-name">
              <p>Welcome</p>
              <p>John Doe</p>
            </div>
          </div>
          <div className="items-wrapper">
            <div className="sidebar-items">
              <a href="/dashboard"> Dashboard </a>
            </div>

            <div className="sidebar-items">
              <a href="add-category"> Add category </a>
            </div>

            <div className="sidebar-items">
              <a href=""> Products </a>
            </div>
            <div className="sidebar-items">
              <a href=""> Vendors </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
