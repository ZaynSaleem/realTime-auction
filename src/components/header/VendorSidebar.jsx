import "./head.css";
import imgAvatar from "../../assets/img_avatar.png";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/AuthAction";
import { useHistory } from "react-router";
import { FaChartLine, FaRegPlusSquare } from "react-icons/fa";

const VendorSidebar = ({ toggleBool, name }) => {
  let dispatch = useDispatch();
  let history = useHistory();

  const logoutUser = () => {
    dispatch(logout());
    history.push("/sign-in");
  };

  return (
    <div
      className="dashboard-sidebar"
      style={toggleBool === false ? { width: "15%" } : { width: "0%" }}
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
              <p>{name}</p>
            </div>
          </div>
          <div className="items-wrapper">
            <div className="sidebar-items">
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
     
            </div>

            <div className="sidebar-items">
              <button onClick={logoutUser}> logout </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSidebar;
