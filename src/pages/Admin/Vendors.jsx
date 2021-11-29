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
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { db } from "../../config/firebase/firebase";
import { addCat, dltTodo, updateCat } from "../../store/actions";
import { getVendor } from "../../store/actions/VendorAction";

const Vendor = () => {
  const dispatch = useDispatch();
  const Data = useSelector((state) => state?.vendor.data);
  // console.log(Data);
  const [toggleBool, setToggleBool] = useState(false);
  const [modal, setModal] = useState(false);
  const [btnBool, setBtnBool] = useState(false);
  const [editId, setEditId] = useState("");
  const [categoryName, setcategoryName] = useState("");

  const {
    formState: { errors },
    setValue,
  } = useForm({});
  let arr = [];
  useEffect(() => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });
        dispatch(getVendor(arr));
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
        <Sidebar toggleBool={toggleBool} />

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
              <div className="content-top">Vendors</div>
            </div>

            <div className="dashboard-card-wrapper">
              <div className="container-category-wrapper">
                <div className="table-wrapper">
                  <div className="table-form">
                    <Table bordered>
                      <thead dark>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Data && Data?.length ? (
                          Data.map((item, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{++index}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td className="button-action">
                                  {/* <button
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
                                  </button> */}
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

export default Vendor;
