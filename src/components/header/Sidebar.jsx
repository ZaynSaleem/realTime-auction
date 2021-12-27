import "./head.css";
import imgAvatar from "../../assets/img_avatar.png";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/AuthAction";
import { useHistory } from "react-router";

const Sidebar = ({ toggleBool }) => {
  let dispatch = useDispatch();
  let history = useHistory();

  const logoutUser = () => {
    dispatch(logout());
    history.push("/sign-in");
  };

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
              <a href="/products"> Products </a>
            </div>
            <div className="sidebar-items">
              <a href="/vendors"> Vendors </a>
            </div>
            <div className="sidebar-items">
              <a href="/bidders"> Users </a>
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

export default Sidebar;
