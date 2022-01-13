import ".././style.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import ToggleMenu from "../../../assets/toggleMenu.png";
import { db } from "../../../config/firebase/firebase";
import VendorSidebar from "../../../components/header/VendorSidebar";
import Topbar from "../../../components/topbar/Topbar";
import WiningCard from "../../../components/Cards/winingcard";

const CurrentAuction = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const Data = useSelector((state) => state?.auth.auth);

  const auth = useSelector((state) => state?.auth.auth);
  const [toggleBool, setToggleBool] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);

  useEffect(() => {
    let arr = [];
    db.collection("products")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = doc?.data();
          if (
            data?.bids &&
            data?.bids.length &&
            data?.timerStatus === "Ongoing"
          ) {
            for (let i = 0; i < data?.bids.length; i++) {
              if (data?.bids[i].uid === Data[0]?.uid) {
                let dup = data;
                dup.id = doc?.id;
                arr.push(dup);
                console.log(dup);
                break;
              }
            }
          }
        });
        setDataProduct(arr);
      })
      .catch((error) => {
        toast.error("Error getting documents: ", error);
      });
  }, []);

  const toggleButton = () => {
    if (!toggleBool) {
      setToggleBool(true);
    } else {
      setToggleBool(!toggleBool);
    }
  };
  const toggleProduct = (item) => {
    console.log(item);
    let str = item?.productName;
    str = str.replace(/\s+/g, "-").toLowerCase();

    history.push(`/product/${item?.id}/${str}`);
  };

  return (
    <div>
      <div className="container-admin">
        <VendorSidebar
          toggleBool={toggleBool}
          togglebtn={toggleButton}
          name={auth[0]?.email?.split("@")[0]}
        />
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
              <WiningCard arr={dataProduct} togglepage={toggleProduct} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentAuction;