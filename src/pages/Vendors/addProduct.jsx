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
import VendorSidebar from "../../components/header/VendorSidebar";

const AddProduct = () => {
  const dispatch = useDispatch();
  const Data = useSelector((state) => state?.vendor.data);
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
    // db.collection("users")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       arr.push(doc.data());
    //     });
    //     dispatch(getVendor(arr));
    //   });
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

  const onSubmit = (data) => {
    console.log(data);
    db.collection("products")
      .add({
        uid: auth[0]?.uid,
        productName: data.product_name,
        catId: data.product_cat,
        startTime: data.start_time,
        endTime: data.end_time,
        startingBid: data.starting_bid,
        bids: [],
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        // let obj = {
        //   uid: auth[0]?.uid,
        //   productName: data.product_name,
        //   catId: data.product_cat,
        //   startTime: data.start_time,
        //   endTime: data.end_time,
        //   startingBid: data.starting_bid,
        //   bids: [],
        // };
        // dispatch(addCat(obj));
        toast.success("New Product Added!");
        // setModal(!modal);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    //     setcategoryName("");
    //     if (!editId) {
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
  };

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
              <div className="content-top">Add Product</div>
            </div>

            <div className="dashboard-card-wrapper">
              <div className="container-category-wrapper">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-vendor-wrapper">
                    <div className="form-input-vendor">
                      <span>Product Name</span>
                      <input
                        type="text"
                        {...register("product_name", {
                          required: true,
                          maxLength: 30,
                        })}
                      />
                      {errors.product_name &&
                        errors.product_name.type === "required" && (
                          <p>This is required</p>
                        )}
                    </div>

                    <div className="form-input-vendor">
                      <span>Product Category</span>
                      <select {...register("product_cat", { required: true })}>
                        <option value="" disabled selected hidden>
                          Select Category
                        </option>
                        <option value="abc">abc</option>
                      </select>
                      {errors.product_cat &&
                        errors.product_cat.type === "required" && (
                          <p>This is required</p>
                        )}
                    </div>

                    <div className="form-input-vendor">
                      <span>Start Time</span>
                      <input
                        type="datetime-local"
                        {...register("start_time", {
                          required: true,
                          onChange: (e) => console.log(e.target.value),
                        })}
                      />
                      {errors.start_time &&
                        errors.start_time.type === "required" && (
                          <p>This is required</p>
                        )}
                    </div>

                    <div className="form-input-vendor">
                      <span>End Time</span>
                      <input
                        type="datetime-local"
                        {...register("end_time", { required: true })}
                      />
                      {errors.end_time &&
                        errors.end_time.type === "required" && (
                          <p>This is required</p>
                        )}
                    </div>

                    <div className="form-input-vendor">
                      <span>Starting Bid</span>
                      <input
                        type="number"
                        {...register("starting_bid", { required: true })}
                      />
                      {errors.starting_bid &&
                        errors.starting_bid.type === "required" && (
                          <p>This is required</p>
                        )}
                    </div>

                    <div className="form-input-vendor">
                      <button type="submit">Add Product</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
