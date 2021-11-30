import React, { useEffect } from "react";
import "./style.css";
import ToggleMenu from "../../assets/toggleMenu.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { db } from "../../config/firebase/firebase";
import VendorSidebar from "../../components/header/VendorSidebar";
import { useHistory, useParams } from "react-router-dom";

const AddProduct = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector((state) => state?.vendor.products);

  const auth = useSelector((state) => state?.auth.auth);
  // console.log(auth[0]?.email?.split("@")[0]);
  // console.log(auth);
  const [toggleBool, setToggleBool] = useState(false);
  // const [modal, setModal] = useState(false);
  const [btnBool, setBtnBool] = useState(false);
  // const [editId, setEditId] = useState("");
  // const [categoryName, setcategoryName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [minEndTime, setMinEndTime] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({});
  let arr = [];
  const d = new Date();
  let text = d?.toISOString();

  useEffect(() => {
    if (startTime && startTime !== "") {
      let stDate = new Date(startTime);
      stDate.setHours(stDate.getHours() + 7);
      let end_t = stDate.toISOString();
      let et = end_t.split(".")[0];
      setMinEndTime(et);
    }
  }, [startTime]);

  useEffect(() => {
    console.log(id);
  }, [id]);

  const toggleButton = () => {
    if (!toggleBool) {
      setToggleBool(true);
    } else {
      setToggleBool(!toggleBool);
    }
  };
  const onSubmit = (data) => {
    setBtnBool(true);
    // console.log(data);
    db.collection("products")
      .add({
        uid: auth[0]?.uid,
        productName: data.product_name,
        catId: data.product_cat,
        startTime: data.start_time,
        endTime: data.end_time,
        startingBid: data.starting_bid,
        timerStatus: false,
        bids: [],
      })
      .then((docRef) => {
        setBtnBool(false);

        // console.log("Document written with ID: ", docRef.id);
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
        history.push("/vendor-dash");
        // setModal(!modal);
      })
      .catch((error) => {
        toast.error("Error adding document: ");
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
                        id="start_time"
                        type="datetime-local"
                        {...register("start_time", {
                          required: true,
                          min: text.split(".")[0],
                          onChange: (e) => setStartTime(e.target.value),
                        })}
                      />
                      {errors.start_time && (
                        <p>This is required or must be current time</p>
                      )}
                    </div>

                    <div className="form-input-vendor">
                      <span>End Time</span>
                      <input
                        type="datetime-local"
                        {...register("end_time", {
                          required: true,
                          min: minEndTime,
                        })}
                      />
                      {errors.end_time && (
                        <p>Must be greater than start time</p>
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
                      {btnBool === false ? (
                        <button type="submit">Add Product</button>
                      ) : (
                        <button type="submit" disabled>
                          {" "}
                          <div className="spinner-border spinner-border-sm">
                            {" "}
                          </div>{" "}
                          Add Product
                        </button>
                      )}
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
