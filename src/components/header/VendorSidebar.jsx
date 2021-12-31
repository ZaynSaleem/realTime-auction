import "./head.css";
import imgAvatar from "../../assets/img_avatar.png";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/AuthAction";
import { useHistory } from "react-router";
import { FaChartLine, FaHeadset, FaRegPlusSquare, FaTruck,FaTimes } from "react-icons/fa";

const VendorSidebar = ({ toggleBool, name, togglebtn }) => {
  let dispatch = useDispatch();
  let history = useHistory();


  return (
    <div
      className={toggleBool === false ?  "dashboard-sidebar"  :  "dashboard-sidebar-toggle" }
      // style={toggleBool === false ? { width: "15%" } : { width: "0%" }}
    >
      <div className="sidebar-container">
          <div className="close-btn-sidebar">
            <button onClick={togglebtn}>

            <FaTimes/>
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
            {/* <div className="sidebar-items">
              <div className="icon-dash-vendor">
                <FaChartLine />
              </div>
              <div className="text-dash-vendor">
                <a href="/vendor-dash"> Dashboard </a>
              </div>
            </div>

            <div className="sidebar-items">
              <div className="icon-dash-vendor">
                <FaRegPlusSquare />
              </div>
              <div className="text-dash-vendor">
                <a href="/add-product">Add Product</a>
              </div>
            </div> */}

            <div className="sidebar-item">
              <button className="button-sidebar" onClick={() => {history.push("/vendor-dash")}}>
                <FaChartLine />
                <span className="btn-text-vendor">Dashboard</span>
              </button>
            </div>
            <div className="sidebar-item">
              <button className="button-sidebar" onClick={() => {history.push("/add-product")}}>
                <FaRegPlusSquare />
                <span className="btn-text-vendor"> Add Product</span>
              </button>
            </div>

            <div className="sidebar-item">
              <button className="button-sidebar" onClick={() => {history.push("/vendor-dash")}}>
                <FaTruck />
                <span className="btn-text-vendor"> Delivered</span>
              </button>
            </div>

            {/* <div className="sidebar-items">
              <button onClick={logoutUser}> logout </button>
            </div> */}
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

export default VendorSidebar;
