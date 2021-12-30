import React, { useEffect } from "react";
import "./style.css";
import ToggleMenu from "../../assets/toggleMenu.png";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";

import imgAvatar from "../../assets/img_avatar.png";

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
import Topbar from "../../components/topbar/Topbar";

const Vendor = () => {
  const dispatch = useDispatch();
  const Data = useSelector((state) => state?.vendor.data);
  // console.log(Data);
  const [toggleBool, setToggleBool] = useState(false);
  const [loaderBool, setLoaderBool] = useState(false);
  const [vendorData, setVendorData] = useState([]);
  // const [btnStatusBool, setBtnStatusBool] = useState("")

  const {
    formState: { errors },
    setValue,
  } = useForm({});
  let arr = [];
  useEffect(() => {
    setLoaderBool(true);
    db.collection("users")
      .where("role", "==", "vendor")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());

          let obj = {
            id: doc.id,
            email: doc.data()?.email,
            name: doc.data()?.name,
            role: doc.data()?.role,
            uid: doc.data()?.uid,
            status: doc.data()?.status,
          };
          arr.push(obj);
        });
        // dispatch(getVendor(arr));
        setVendorData(arr);
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
    console.log(e.target.checked);
    console.log(e.target.value);
    let id = e.target.value;
    let boolSwitch = e.target.checked;
    db.collection("users")
      .doc(id)
      .update({
        status: boolSwitch,
      })
      .then(() => {
        let dup = [...vendorData];
        let updated = dup.findIndex((x) => x.id === id);
        dup[updated].status = boolSwitch;
        console.log(dup);
        setVendorData(dup);
      });
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
          className={
            toggleBool === false
              ? "vendor-dashboard-content"
              : "vendor-dashboard-content-toggle"
          }
        >
          <Topbar togglebtn={toggleButton} img={ToggleMenu} />
          
          <div className="vendor-dashboard-card-wrapper">
          <Loader bool={loaderBool} />
        

            <div
              className="vendor-container-category-wrapper"
              style={{ display: loaderBool === true ? "none" : "block" }}
            >
              <div className="container-category-wrapper">
                <div className="table-wrapper">
                  <div className="table-form">
                    <Table bordered>
                      <thead dark>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendorData && vendorData?.length ? (
                          vendorData.map((item, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{++index}</th>
                                <td>{item?.name}</td>
                                <td>{item?.email}</td>
                                <td>
                                  {!item?.status ? (
                                    <span className="status-active">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="status-vendor">
                                      blocked
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

export default Vendor;
