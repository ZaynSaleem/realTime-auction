import "./style.css";
import imgAvatar from "../../assets/img_avatar.png";

const Dashboard = () => {
  return (
    <div className="container-admin">
      <div className="dashboard-sidebar">
        <div className="sidebar-container">
            <div className="sidebar-wrapper">
                <div className="sidebar-head">
                    <h1><span>i</span>BID</h1>
                </div>
                <div className="sidebar-details">
                    <div className="icon-sidebar">
                        <img src={imgAvatar}/>
                    </div>
                    <div className="sidebar-name">
                        <p>Welcome</p>
                        <p>John Doe</p>
                    </div>
                    {/* <div className="sidebar-items">
                        <a href=""> Add category </a>
                    </div>
                    <div className="sidebar-items">
                        <a href=""> Products </a>
                    </div>
                    <div className="sidebar-items">
                        <a href=""> Vendors </a>
                    </div> */}
                   
                </div>
            </div>
        </div>
     
      </div>
      <div className="dashboard-content">
          <div className="dashboard-content-container">
              Hell
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
