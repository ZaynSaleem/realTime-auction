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

const VendorDash = () => {
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
            id: doc.id,
            uid: doc.data().uid,
            productName: doc.data().productName,
            catId: doc.data().catId,
            startTime: doc.data().startTime,
            endTime: doc.data().endTime,
            startingBid: doc.data().startingBid,
            timerStatus: doc.data().timerStatus,
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
      console.log(id)
      setEditId(id);
      history.push(`edit-product/${id}`)
      // let data = Data.find((x) => x.id === id);
      // if (data) {
      //   setValue("category", data?.category);
      //   setModal(!modal);
      //   setBtnBool(true);
      // }
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
              <div className="content-top">Vendor-Dash</div>
            </div>

            <div className="dashboard-card-wrapper">
              <div className="container-category-wrapper">
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
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataProduct && dataProduct?.length ? (
                          dataProduct.map((item, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{++index}</th>
                                <td>{item.productName}</td>
                                <td>{item.startTime}</td>
                                <td>{item.endTime}</td>
                                <td>
                                  {new Date(item?.startTime).getTime() <
                                  new Date().getTime() ? (
                                    <Timer
                                      startTime={item?.startTime}
                                      endTime={item?.endTime}
                                    />
                                  ) : (
                                    "NOT STARTED"
                                  )}
                                </td>
                                <td>{item.startingBid}</td>
                                <td>{item.bids}</td>
                                <td className="button-action">
                                  {new Date(item?.startTime).getTime() <
                                  new Date().getTime() ? (
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
                                        onClick={() => editCat(item.id)}
                                      >
                                        {" "}
                                        <FaRegEdit size={20} />
                                      </button>

                                      <button
                                        className="btn btn-danger"
                                        onClick={() => deleteCat(item.id)}
                                      >
                                        {" "}
                                        <FaTrashAlt size={20} />
                                      </button>
                                    </>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDash;
