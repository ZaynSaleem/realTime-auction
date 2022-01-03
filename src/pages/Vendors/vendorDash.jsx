import React, { useEffect, useState } from "react";
import "./style.css";
import ToggleMenu from "../../assets/toggleMenu.png";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Table } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { db } from "../../config/firebase/firebase";

import { dltProduct, getVendorProduct } from "../../store/actions/VendorAction";
import VendorSidebar from "../../components/header/VendorSidebar";
import Timer from "./timer";
import { useHistory } from "react-router";
import Topbar from "../../components/topbar/Topbar";

const VendorDash = () => {
  const dispatch = useDispatch();
  let history = useHistory();
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
  const updateTimerStatus = (id, result) => {
    // console.log(id, " => ", result);
    db.collection("products")
      .doc(id)
      .update({
        timerStatus: result,
      })
      .catch((error) => {
        toast.error(error);
      });

    // console.log(status);
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
          // style={toggleBool === false ? { width: "85%" } : { width: "100%" }}
        >
          {/* <div className="vendor-dashboard-top-bar">
            <div className="vendor-top-container">
              <div className="vendor-button-toggle">
                <button onClick={toggleButton}>
                  {" "}
                  <img src={ToggleMenu} />
                </button>
              </div>
              <div className="content-top">Vendor-Dash</div>
            </div>
          </div> */}
          <Topbar togglebtn={toggleButton} img={ToggleMenu} />

          <div className="vendor-dashboard-card-wrapper">
            <div className="vendor-container-category-wrapper">
              <div className="table-wrapper">
                <div className="table-form">
                  <Table bordered>
                    <thead dark>
                      <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Timer</th>
                        <th>Starting Bid</th>
                        <th>no.of Bids</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataProduct && dataProduct?.length ? (
                        dataProduct.map((item, index) => {
                          // console.log(item);
                          return (
                            <tr
                              key={index}
                              style={{ color: item?.adminStatus ? "grey" : "" }}
                            >
                              <th scope="row">{++index}</th>
                              <td>{item?.productName}</td>
                              <td>{item?.startTime}</td>
                              <td>{item?.endTime}</td>
                              <td>
                                {
                                  !item?.adminStatus ? (

                                    <Timer
                                    statusUpdate={setStatus}
                                    statusTimer={status}
                                    startTime={item?.startTime}
                                    endTime={item?.endTime}
                                    id={item?.id}
                                    statusHandler={updateTimerStatus}
                                    />
                                    ):(
                                      "00:00:00"
                                    )
                                }
                              </td>
                              <td>{item?.startingBid}</td>
                              <td>{item?.bids}</td>
                              <td>
                                {" "}
                                {!item?.adminStatus ? (
                                  !item?.productStatus ? (
                                    <span className="status-active">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="status-vendor">
                                      disabled
                                    </span>
                                  )
                                ) : (
                                  <span className="status-vendor">
                                    disabled by admin
                                  </span>
                                )}
                              </td>
                              <td className="button-action">
                                {new Date(item?.startTime).getTime() <
                                  new Date().getTime() || item?.adminStatus ? (
                                  <>
                                    <button
                                      className="btn btn-success"
                                      disabled
                                    >
                                      {" "}
                                      <FaRegEdit size={20} />
                                    </button>

                                    <button className="btn btn-danger" disabled>
                                      {" "}
                                      <FaTrashAlt size={20} />
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="btn btn-success"
                                      onClick={() => editCat(item?.id)}
                                    >
                                      {" "}
                                      <FaRegEdit size={20} />
                                    </button>

                                    <button
                                      className="btn btn-danger"
                                      onClick={() => deleteCat(item?.id)}
                                    >
                                      {" "}
                                      <FaTrashAlt size={20} />
                                    </button>
                                  </>
                                )}
                              </td>
                              <td>
                                {" "}
                                {item?.adminStatus ? (
                                  <div className="btn-switch">
                                    <label class="switch">
                                      <input
                                        checked={item?.productStatus}
                                        value={item?.id}
                                        type="checkbox"
                                        disabled
                                        onChange={(e) => handleUpdate(e)}
                                      />
                                      <span class="slider-switch round"></span>
                                    </label>
                                  </div>
                                ) : (
                                  <div className="btn-switch">
                                    <label class="switch">
                                      <input
                                        checked={item?.productStatus}
                                        value={item?.id}
                                        type="checkbox"
                                        onChange={(e) => handleUpdate(e)}
                                      />
                                      <span class="slider-switch round"></span>
                                    </label>
                                  </div>
                                )}
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

          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default VendorDash;
