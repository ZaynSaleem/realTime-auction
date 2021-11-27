import "./style.css";
import ToggleMenu from "../../assets/toggleMenu.png";
import { FaGavel, FaListAlt, FaProductHunt, FaUserAlt } from "react-icons/fa";
import DashboardCard from "../../components/Cards/DashboardCard";
import { useState } from "react";
import Sidebar from "../../components/header/Sidebar";

const Dashboard = () => {
  const [toggleBool, setToggleBool] = useState(false);

  const toggleButton = () => {
    if (!toggleBool) {
      setToggleBool(true);
    } else {
      setToggleBool(!toggleBool);
    }
  };

  return (
    <div className="container-admin">
      <Sidebar toggleBool={toggleBool} />

      <div
        className="dashboard-content"
        style={toggleBool === false ? { width: "80%" } : { width: "100%" }}
      >
        <div className="dashboard-content-container">
          <div className="dashboard-top-bar">
            <div className="button-toggle">
              <button onClick={toggleButton}>
                {" "}
                <img src={ToggleMenu} />
              </button>
            </div>
            <div className="content-top">Dashboard</div>
          </div>

          <div className="dashboard-card-wrapper">
            <div className="container-card-wrapper">
              <DashboardCard
                icon={<FaUserAlt />}
                headText="No Of Vendors"
                count="457"
                colorIcon="#28a745"
                color="#ffff"
                cardBgColor="rgb(143 225 135)"
              />
              <DashboardCard
                icon={<FaGavel />}
                headText="No Of Bidders"
                count="34895"
                colorIcon="#dc3545"
                color="#ffff"
                cardBgColor="rgb(255 114 129)"
              />
              <DashboardCard
                icon={<FaListAlt />}
                headText="No Of Categories"
                count="65"
                colorIcon="#ffc107"
                color="#ffff"
                cardBgColor="rgb(255 223 110)"
              />
              <DashboardCard
                icon={<FaProductHunt />}
                headText="No Of Products"
                count="45700"
                colorIcon="#007bff"
                color="#ffff"
                cardBgColor="rgb(175 199 255)"
              />

              <DashboardCard
                icon={<FaUserAlt />}
                headText="No Of Products"
                count="457"
                colorIcon="rgb(23 178 184)"
                color="#ffff"
                cardBgColor="rgb(124 209 215)"
              />

              <DashboardCard
                icon={<FaUserAlt />}
                headText="No Of Products"
                count="457"
                colorIcon="#343a40"
                color="#ffff"
                cardBgColor="rgb(153 153 153)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
