import React, { useEffect, useState } from "react";
import "./style.css";
import ToggleMenu from "../../../assets/toggleMenu.png";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Table } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { db } from "../../../config/firebase/firebase";

import {
  dltProduct,
  getVendorProduct,
} from "../../../store/actions/VendorAction";
import VendorSidebar from "../../../components/header/VendorSidebar";
// import Timer from "./timer";
import { useHistory } from "react-router";

const ViewProductDetails = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  // const dataProduct = useSelector((state) => state?.vendor.products);
  const auth = useSelector((state) => state?.auth.auth);
  const [toggleBool, setToggleBool] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const [editId, setEditId] = useState("");

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
      .where("uid", "==", auth[0]?.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let obj = {
            id: doc?.id,
            uid: doc?.data()?.uid,
            productName: doc?.data()?.productName,
            catId: doc?.data()?.catId,
            startTime: doc?.data()?.startTime,
            endTime: doc?.data()?.endTime,
            startingBid: doc?.data()?.startingBid,
            timerStatus: doc?.data()?.timerStatus,
            adminStatus: doc?.data()?.adminStatus,
            productStatus: doc?.data().productStatus,
            imageUrl: doc?.data()?.imageUrl,
            bids: [],
          };
          arr.push(obj);
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

  return (
    <div>
      <div className="container-admin">
        <VendorSidebar
          toggleBool={toggleBool}
          name={auth[0]?.email?.split("@")[0]}
        />
        <div
          className="vendor-dashboard-content"
          style={toggleBool === false ? { width: "85%" } : { width: "100%" }}
        >
          <div className="vendor-dashboard-top-bar">
            <div className="vendor-top-container">
              <div className="vendor-button-toggle">
                <button onClick={toggleButton}>
                  {" "}
                  <img src={ToggleMenu} />
                </button>
              </div>
              <div className="content-top">Vendor-Dash</div>
            </div>
          </div>

          <div className="vendor-dashboard-card-wrapper">
            <div className="vendor-container-category-wrapper">
              {/* Hello Product View */}
              <div className="image-wrapper">
                <img alt="img" />
              </div>
              <div className="detail-wrapper">
                <div className="timer-products">
                  <p>2d 6h 7m 2s</p>
                </div>
                <div className="product-name">
                  <h4>Vance Parks</h4>
                </div>
                <div className="category-name">
                  <h4>abc</h4>
                </div>
                <div className="bid-price">
                  <h4>600$</h4>
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

export default ViewProductDetails;
