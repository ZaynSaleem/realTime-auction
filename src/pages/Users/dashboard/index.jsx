import React, { useEffect, useState } from "react";
// import ".././style.css";
import ToggleMenu from "../../../assets/toggleMenu.png";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Table } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ".././style.css";
import { db } from "../../../config/firebase/firebase";

import {
  dltProduct,
  getVendorProduct,
} from "../../../store/actions/VendorAction";
import VendorSidebar from "../../../components/header/VendorSidebar";
import Timer from "../../../components/timer/timer";
import { useHistory } from "react-router";
import Topbar from "../../../components/topbar/Topbar";

import card1 from "../../../assets/card1.jpg";

const UserDash = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const Data = useSelector((state) => state?.auth.auth);

  // const dataProduct = useSelector((state) => state?.vendor.products);
  const auth = useSelector((state) => state?.auth.auth);
  const [toggleBool, setToggleBool] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const [editId, setEditId] = useState("");
  const [status, setStatus] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({});
  let arr = [];

  useEffect(() => {
    db.collection("products")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc?.data()?.winner);

          //   let dup = doc?.data();

          //   if (dup) {
          //     dup.id = doc?.id;
          //     arr.push(dup);
          //   }
        });
        // setDataProduct(arr);
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

  const editCat = (id) => {
    // console.log(id)
    setEditId(id);
    history.push(`edit-product/${id}`);
    // let data = Data.find((x) => x.id === id);
    // if (data) {
    //   setValue("category", data?.category);
    //   setModal(!modal);
    //   setBtnBool(true);
    // }
  };
  const handleUpdate = (e) => {
    // console.log(e);
    let id = e.target.value;
    console.log(id);
    let boolSwitch = e.target.checked;
    db.collection("products")
      .doc(id)
      .update({
        productStatus: boolSwitch,
      })
      .then(() => {
        let dup = [...dataProduct];
        let updated = dup.findIndex((x) => x.id === id);
        dup[updated].productStatus = boolSwitch;
        console.log(dup);
        setDataProduct(dup);
      });
  };

  const deleteCat = (id) => {
    db.collection("products")
      .doc(id)
      .delete()
      .then(() => {
        toast.success("Deleted Successfully");
        let dupData = [...dataProduct];
        let newArr = dupData.filter((x) => x.id !== id);
        setDataProduct(newArr);
      })
      .catch((error) => {
        toast.error("Error removing document: ", error);
      });
  };
  const updateTimerStatus = (id, result) => {
    console.log(id, " => ", result);
    // if (result === "Expired") {
    let dupArr = [...dataProduct];
    let filtArr = dupArr.filter((x) => x.id === id);
    // console.log(filtArr[0].bids);
    if (filtArr && filtArr[0]?.bids.length) {
      let shots = filtArr[0]?.bids;
      let max = shots?.reduce((max, obj) =>
        max?.bidPrice > obj?.bidPrice ? max : obj
      );
      db.collection("products")
        .doc(id)
        .update({
          timerStatus: result,
          winner: max,
        })
        .catch((error) => {
          toast.error(error);
        });
      // console.log(max);
    } else {
      db.collection("products")
        .doc(id)
        .update({
          timerStatus: result,
        })
        .catch((error) => {
          toast.error(error);
        });
    }
    // } else {
    // db.collection("products")
    //   .doc(id)
    //   .update({
    //     timerStatus: result,
    //   })
    //   .catch((error) => {
    //     toast.error(error);
    //   });
    // }
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
              <div className="user-card-wrapper">
                <div className="user-wining-card">
                    <div className="user-card-image">
                        <img src={card1} alt="image"/>
                    </div>
                    <div className="user-card-content">
                        <p>HHHH</p>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default UserDash;
