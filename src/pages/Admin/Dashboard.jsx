import "./style.css";
import { useEffect } from "react";
import { useState } from "react";
import ToggleMenu from "../../assets/toggleMenu.png";
import {
  FaGavel,
  FaHourglassEnd,
  FaListAlt,
  FaProductHunt,
  FaUserAlt,
  FaUsers,
} from "react-icons/fa";
import DashboardCard from "../../components/Cards/DashboardCard";
import Sidebar from "../../components/header/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import BreadCrumb from "../../components/breadCrumb";
import { db } from "../../config/firebase/firebase";
import Loader from "../../components/Loader/loader";

const Dashboard = () => {
  const [toggleBool, setToggleBool] = useState(false);
  const [loaderBool, setLoaderBool] = useState(false);

  const [vendors, setVendors] = useState(0);
  const [users, setUsers] = useState(0);
  const [category, setCategory] = useState(0);
  const [products, setProducts] = useState(0);
  const [onGoing, setOnGoing] = useState(0);
  const [Expired, setExpired] = useState(0);

  useEffect(() => {
    vendorsQuantityHandler();
    usersQuantityHandler();
    categoryQuantityHandler();
    productsQuantityHandler();
    onGoingProductHandler();
    expiredProductHandler();
  }, []);

  const vendorsQuantityHandler = () => {
    setLoaderBool(true);
    db.collection("users")
      .where("role", "==", "vendor")
      .get()
      .then((querySnapshot) => {
        setVendors(querySnapshot?.docs?.length);
        setLoaderBool(false);
      });
  };
  const usersQuantityHandler = () => {
    db.collection("users")
      .where("role", "==", "user")
      .get()
      .then((querySnapshot) => {
        setUsers(querySnapshot?.docs?.length);
      });
  };

  const categoryQuantityHandler = () => {
    db.collection("category")
      .get()
      .then((querySnapshot) => {
        setCategory(querySnapshot?.docs?.length);
      });
  };
  const productsQuantityHandler = () => {
    db.collection("products")
      .get()
      .then((querySnapshot) => {
        setProducts(querySnapshot?.docs?.length);
      });
  };
  const onGoingProductHandler = () => {
    db.collection("products")
      .where("timerStatus", "==", "Ongoing")
      .get()
      .then((querySnapshot) => {
        setOnGoing(querySnapshot?.docs?.length);
      });
  };
  const expiredProductHandler = () => {
    db.collection("products")
      .where("timerStatus", "==", "Expired")
      .get()
      .then((querySnapshot) => {
        setExpired(querySnapshot?.docs?.length);
      });
  };

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

        {loaderBool ? (
          <Loader bool={loaderBool} />
        ) : (
          <div className="vendor-dashboard-card-wrapper">
            <BreadCrumb title="Dashboard" bool={true} />
            <div className="vendor-container-category-wrapper">
              <div className="container-card-wrapper">
                <DashboardCard
                  icon={<FaUserAlt />}
                  headText="No Of Vendors"
                  count={vendors}
                  colorIcon="#81d3a1"
                  color="#ffff"
                  textColor="#499b75"
                />
                <DashboardCard
                  icon={<FaUsers />}
                  headText="No Of Users"
                  count={users}
                  colorIcon="#dc3545"
                  color="#ffff"
                  textColor=""
                />
                <DashboardCard
                  icon={<FaListAlt />}
                  headText="No Of Categories"
                  count={category}
                  colorIcon="#ffc107"
                  color="#ffff"
                  textColor=""
                />
                <DashboardCard
                  icon={<FaProductHunt />}
                  headText="No Of Products"
                  count={products}
                  colorIcon="#007bff"
                  color="#ffff"
                  textColor=""
                />

                <DashboardCard
                  icon={<FaGavel />}
                  headText="Live Auction"
                  count={onGoing}
                  colorIcon="rgb(23 178 184)"
                  color="#ffff"
                  textColor=""
                />

                <DashboardCard
                  icon={<FaHourglassEnd />}
                  headText="Expired Products"
                  count={Expired}
                  colorIcon="#343a40"
                  color="#ffff"
                  textColor=""
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
