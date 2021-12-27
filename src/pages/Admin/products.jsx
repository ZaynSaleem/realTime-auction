import React, { useEffect } from "react";
import "./style.css";
import ToggleMenu from "../../assets/toggleMenu.png";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import Sidebar from "../../components/header/Sidebar";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { db } from "../../config/firebase/firebase";
import { addCat, dltTodo, updateCat } from "../../store/actions";
import { getVendor } from "../../store/actions/VendorAction";

import Loader from "../../components/Loader/loader";

const VendorProducts = () => {
  const dispatch = useDispatch();
  const Data = useSelector((state) => state?.vendor.data);
  const [toggleBool, setToggleBool] = useState(false);
  const [loaderBool, setLoaderBool] = useState(false);
  const [productData, setProductData] = useState([]);

  const {
    formState: { errors },
    setValue,
  } = useForm({});
  let arr = [];
  useEffect(() => {
    setLoaderBool(true);
    db.collection("products")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let obj = {
            id: doc.id,
            productName: doc.data()?.productName,
            categoryName: doc.data()?.catId,
            productStatus: doc.data()?.productStatus,
            adminStatus : doc.data()?.adminStatus,
            startingBid: doc.data()?.startingBid,
          };
          arr.push(obj);
        });
        setProductData(arr);
        setLoaderBool(false);
      });
  }, []);

  const toggleButton = () => {
    if (!toggleBool) {
      setToggleBool(true);
    } else {
      setToggleBool(!toggleBool);
    }
  };

  const handleStatus = (e) => {
    let id = e.target.value;
    let boolSwitch = e.target.checked;
    db.collection("products")
      .doc(id)
      .update({
        adminStatus: boolSwitch,
      })
      .then(() => {
        let dup = [...productData];
        let updated = dup.findIndex((x) => x.id === id);
        dup[updated].adminStatus = boolSwitch;

        setProductData(dup);
      });
  };

  return (
    <div>
      <div className="container-admin">
        <Sidebar toggleBool={toggleBool} />

        <div
          className="dashboard-content"
          style={toggleBool === false ? { width: "80%" } : { width: "100%" }}
        >
          <Loader bool={loaderBool} />
          <div className="dashboard-content-container">
            <div className="dashboard-top-bar">
              <div className="button-toggle">
                <button onClick={toggleButton}>
                  {" "}
                  <img src={ToggleMenu} />
                </button>
              </div>
              <div className="content-top">Products</div>
            </div>

            <div
              className="dashboard-card-wrapper"
              style={{ display: loaderBool === true ? "none" : "block" }}
            >
              <div className="container-category-wrapper">
                <div className="table-wrapper">
                  <div className="table-form">
                    <Table bordered>
                      <thead dark>
                        <tr>
                          <th>#</th>
                          <th>Product Name</th>
                          <th>Category Name</th>
                          <th>Vendor status</th>
                          <th>Starting Bid</th>
                          <th>Admin Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productData && productData?.length ? (
                          productData.map((item, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{++index}</th>
                                <td>{item?.productName}</td>
                                <td>{item?.categoryName}</td>
                                <td>
                                  {!item?.productStatus ? (
                                    <span className="status-active">
                                      Live
                                    </span>
                                  ) : (
                                    <span className="status-vendor">
                                      disabled
                                    </span>
                                  )}
                                </td>
                                <td>{item?.startingBid}</td>
                                <td>
                                  {!item?.adminStatus ? (
                                    <span className="status-active">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="status-vendor">
                                      disabled by admin
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <div className="btn-switch">
                                    <label class="switch">
                                      <input
                                        checked={item.status}
                                        value={item?.id}
                                        type="checkbox"
                                        onChange={(e) => handleStatus(e)}
                                      />
                                      <span class="slider-switch round"></span>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>No DATA</tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProducts;
