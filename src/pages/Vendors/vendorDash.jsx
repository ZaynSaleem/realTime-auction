import "./style.css";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import { toast } from "react-toastify";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import VendorSidebar from "../../components/header/VendorSidebar";
import ToggleMenu from "../../assets/toggleMenu.png";
import { db } from "../../config/firebase/firebase";
import Timer from "../../components/timer/timer";
import Topbar from "../../components/topbar/Topbar";
import BreadCrumb from "../../components/breadCrumb";
import Loader from "../../components/Loader/loader";

const VendorDash = () => {
  let history = useHistory();

  const auth = useSelector((state) => state?.auth.auth);
  const [toggleBool, setToggleBool] = useState(false);
  const [loaderBool, setLoaderBool] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const [editId, setEditId] = useState("");
  const [status, setStatus] = useState("");

  let arr = [];

  useEffect(() => {
    setLoaderBool(true);
    db.collection("products")
      .where("uid", "==", auth[0]?.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let dup = doc?.data();

          if (dup) {
            dup.id = doc?.id;
            arr.push(dup);
          }
        });
        setDataProduct(arr);
        setLoaderBool(false);
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
    setEditId(id);
    history.push(`edit-product/${id}`);
  };
  const handleUpdate = (e) => {
    let id = e.target.value;
    // console.log(id);
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
        // console.log(dup);
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
    let dupArr = [...dataProduct];
    let filtArr = dupArr.filter((x) => x.id === id);
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
  };
  const toggleProduct = (item) => {
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

          {loaderBool ? (
            <Loader bool={loaderBool} />
          ) : (
            <div className="vendor-dashboard-card-wrapper">
              <BreadCrumb title="Dashboard" bool={true} />

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
                            return (
                              <tr
                                key={index}
                                style={{
                                  color: item?.adminStatus ? "grey" : "",
                                }}
                              >
                                <td scope="row">{++index}</td>
                                <td>
                                  <a onClick={() => toggleProduct(item)}>
                                    {item?.productName}
                                  </a>
                                </td>
                                <td>{item?.startTime}</td>
                                <td>{item?.endTime}</td>
                                <td>
                                  {!item?.adminStatus ? (
                                    <Timer
                                      statusUpdate={setStatus}
                                      statusTimer={status}
                                      startTime={item?.startTime}
                                      endTime={item?.endTime}
                                      id={item?.id}
                                      statusHandler={updateTimerStatus}
                                    />
                                  ) : (
                                    "00:00:00"
                                  )}
                                </td>
                                <td>{item?.startingBid}</td>
                                <td>{item?.bids.length}</td>
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
                                    new Date().getTime() ||
                                  item?.adminStatus ? (
                                    <>
                                      <button
                                        className="btn btn-success"
                                        disabled
                                      >
                                        {" "}
                                        <FaRegEdit size={20} />
                                      </button>

                                      <button
                                        className="btn btn-danger"
                                        disabled
                                      >
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
                                      <label className="switch">
                                        <input
                                          checked={item?.productStatus}
                                          value={item?.id}
                                          type="checkbox"
                                          disabled
                                          onChange={(e) => handleUpdate(e)}
                                        />
                                        <span className="slider-switch round"></span>
                                      </label>
                                    </div>
                                  ) : (
                                    <div className="btn-switch">
                                      <label className="switch">
                                        <input
                                          checked={item?.productStatus}
                                          value={item?.id}
                                          type="checkbox"
                                          onChange={(e) => handleUpdate(e)}
                                        />
                                        <span className="slider-switch round"></span>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDash;
