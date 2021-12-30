import "./style.css";
import ToggleMenu from "../../assets/toggleMenu.png";
import {
  FaAngleDoubleRight,
  FaGavel,
  FaListAlt,
  FaProductHunt,
  FaUserAlt,
} from "react-icons/fa";
import DashboardCard from "../../components/Cards/DashboardCard";
import { useState } from "react";
import Sidebar from "../../components/header/Sidebar";
import Topbar from "../../components/topbar/Topbar";

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
        className={
          toggleBool === false
            ? "vendor-dashboard-content"
            : "vendor-dashboard-content-toggle"
        }
      >
        <Topbar togglebtn={toggleButton} img={ToggleMenu} />

        <div className="vendor-dashboard-card-wrapper">
          <div className="vendor-container-category-wrapper">
            <div className="container-card-wrapper">
              <div className="breadcumbs-text">
                iBid <FaAngleDoubleRight /> Dashboard
              </div>
              <div className="breadcumbs-text">
               Dashboard
              </div>
              
              {/*  */}
            </div>
          </div>

          <div className="vendor-container-category-wrapper">
            <div className="container-card-wrapper">
              <DashboardCard
                icon={<FaUserAlt />}
                headText="No Of Vendors"
                count="457"
                colorIcon="#81d3a1"
                color="#ffff"
                textColor="#499b75"
              />
              <DashboardCard
                icon={<FaGavel />}
                headText="No Of Bidders"
                count="34895"
                colorIcon="#dc3545"
                color="#ffff"
                textColor=""
              />
              <DashboardCard
                icon={<FaListAlt />}
                headText="No Of Categories"
                count="65"
                colorIcon="#ffc107"
                color="#ffff"
                textColor=""
              />
              <DashboardCard
                icon={<FaProductHunt />}
                headText="No Of Products"
                count="45700"
                colorIcon="#007bff"
                color="#ffff"
                textColor=""
              />

              <DashboardCard
                icon={<FaUserAlt />}
                headText="No Of Products"
                count="457"
                colorIcon="rgb(23 178 184)"
                color="#ffff"
                textColor=""
              />

              <DashboardCard
                icon={<FaUserAlt />}
                headText="No Of Products"
                count="457"
                colorIcon="#343a40"
                color="#ffff"
                textColor=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
