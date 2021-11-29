import React, { useEffect } from "react";
import "./style.css";
import ToggleMenu from "../../assets/toggleMenu.png";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { Table } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { db } from "../../config/firebase/firebase";
import { addCat, dltTodo, updateCat } from "../../store/actions";
import { getVendor, getVendorProduct } from "../../store/actions/VendorAction";
import VendorSidebar from "../../components/header/VendorSidebar";

const VendorDash = () => {
  const dispatch = useDispatch();
  const dataProduct = useSelector((state) => state?.vendor.products);
  const auth = useSelector((state) => state?.auth.auth);
  console.log(auth[0]?.email?.split("@")[0]);
  console.log(auth);
  const [toggleBool, setToggleBool] = useState(false);
  const [modal, setModal] = useState(false);
  const [btnBool, setBtnBool] = useState(false);
  const [editId, setEditId] = useState("");
  const [categoryName, setcategoryName] = useState("");

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
          console.log(doc.id, " => ", doc.data());
          arr.push(doc.data());
        });
        dispatch(getVendorProduct(arr));
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  const toggleButton = () => {
    if (!toggleBool) {
      setToggleBool(true);
    } else {
      setToggleBool(!toggleBool);
    }
  };

  const toggle = () => {
    setValue("category", "");
    setEditId("");
    // setModal(!modal);
    setBtnBool(false);
  };

  //   const onSubmit = (data) => {
  //     setcategoryName("");
  //     if (!editId) {
  //       db.collection("category")
  //         .add({
  //           categoryName: data.category,
  //         })
  //         .then((docRef) => {
  //           console.log("Document written with ID: ", docRef.id);
  //           let obj = {
  //             id: docRef.id,
  //             category: data.category,
  //           };
  //           dispatch(addCat(obj));
  //           toast.success("New Category Added!");
  //           setModal(!modal);
  //         })
  //         .catch((error) => {
  //           console.error("Error adding document: ", error);
  //         });
  //     } else {
  //       console.log(editId);
  //       setcategoryName("");
  //       setBtnBool(!btnBool);
  //       setModal(!modal);
  //       console.log(data);
  //       db.collection("category")
  //         .doc(editId)
  //         .update({
  //           categoryName: data.category,
  //         })
  //         .then(() => {
  //           dispatch(updateCat(editId, data.category));
  //           console.log("Document successfully updated!");
  //         });
  //     }
  //   };

  //   const editCat = (id) => {
  //     setEditId(id);
  //     let data = Data.find((x) => x.id === id);
  //     if (data) {
  //       setValue("category", data?.category);
  //       setModal(!modal);
  //       setBtnBool(true);
  //     }
  //   };

  return (
    <div>
      <div className="container-admin">
        {/* <VendorSidebar toggleBool={toggleBool} /> */}
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
                                <td>{item.startingBid}</td>
                                <td>{item.bids}</td>
                                <td className="button-action">
                                  <button
                                    className="btn btn-success"
                                    // onClick={() => editCat(item.id)}
                                  >
                                    {" "}
                                    <FaRegEdit size={20} />
                                  </button>

                                  <button
                                    className="btn btn-danger"
                                    // onClick={() => deleteCat(item.id)}
                                  >
                                    {" "}
                                    <FaTrashAlt size={20} />
                                  </button>
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
