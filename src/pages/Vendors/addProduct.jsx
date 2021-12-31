import React, { useEffect } from "react";
import "./style.css";
import ToggleMenu from "../../assets/toggleMenu.png";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import firebase, { db } from "../../config/firebase/firebase";
import VendorSidebar from "../../components/header/VendorSidebar";
import { useHistory, useParams } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import { FaTimesCircle } from "react-icons/fa";

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
  const [btnUpdateBool, setBtnUpdateBool] = useState(false);
  const [imageArr, setImageArr] = useState([]);

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
    if (id.id && id.id !== "") {
      db.collection("products")
        .doc(id.id)
        .get()
        .then((doc) => {
          console.log(doc.data());
          setValue("product_name", doc?.data()?.productName);
          setValue("product_cat", doc?.data()?.catId);
          setValue("start_time", doc?.data()?.startTime);
          setValue("end_time", doc?.data()?.endTime);
          setValue("starting_bid", doc?.data()?.startingBid);
          setValue("image_file", doc?.data()?.imageUrl);

          setBtnUpdateBool(true);
        })
        .catch((error) => {
          toast.error("Error getting documents: ", error);
        });
    } else {
      console.log("no Id");
    }
  }, [id.id]);

  const toggleButton = () => {
    if (!toggleBool) {
      setToggleBool(true);
    } else {
      setToggleBool(!toggleBool);
    }
  };

  const onSubmit = async (data) => {
    setBtnBool(true);
    // console.log(data?.image_file[0]?.name);
    let fileUpload = [...imageArr];
    let urlArr = [];
    // let imageFunc = imageUploadHandler();
    if (fileUpload && fileUpload?.length) {
      for (let i = 0; i < fileUpload?.length; i++) {
        let imageFunc = await imageUploadHandler(fileUpload[i]);
        console.log(imageFunc, "url");
        urlArr.push(imageFunc);
      }
      if (urlArr && urlArr?.length) {
        if (btnUpdateBool === false) {
          db.collection("products")
            .add({
              uid: auth[0]?.uid,
              productName: data?.product_name,
              catId: data?.product_cat,
              startTime: data?.start_time,
              endTime: data?.end_time,
              startingBid: data?.starting_bid,
              timerStatus: false,
              adminStatus: false,
              productStatus: false,
              imageUrl: urlArr,
              bids: [],
            })
            .then((docRef) => {
              console.log(docRef);
              setBtnBool(false);
              toast.success("New Product Added!");
              history.push("/vendor-dash");
              // setModal(!modal);
            })
            .catch((error) => {
              toast.error("Error adding document: ");
            });
        } else {
          db.collection("products")
            .doc(id.id)
            .update({
              productName: data?.product_name,
              catId: data?.product_cat,
              startTime: data?.start_time,
              endTime: data?.end_time,
              startingBid: data?.starting_bid,
              imageUrl: urlArr,
              bids: [],
            })
            .then(() => {
              setBtnUpdateBool(false);
              setBtnBool(false);
              toast.success("Document successfully updated!");
              history.push("/vendor-dash");
            })
            .catch((error) => {
              setBtnBool(false);
              toast.error("Error adding document: ");
            });
        }
      }
    }
    // console.log(imageArr)

    // let storageRef = firebase
    //   .storage()
    //   .ref("productImages/" + fileUpload?.name);

    // storageRef.put(fileUpload).then(function () {
    //   storageRef.getDownloadURL().then(function (url) {
    //     // console.log(url);
    //     if (btnUpdateBool === false) {
    //       db.collection("products")
    //         .add({
    //           uid: auth[0]?.uid,
    //           productName: data?.product_name,
    //           catId: data?.product_cat,
    //           startTime: data?.start_time,
    //           endTime: data?.end_time,
    //           startingBid: data?.starting_bid,
    //           timerStatus: false,
    //           adminStatus: false,
    //           productStatus: false,
    //           imageUrl: url,
    //           bids: [],
    //         })
    //         .then((docRef) => {
    //           console.log(docRef);
    //           setBtnBool(false);
    //           toast.success("New Product Added!");
    //           history.push("/vendor-dash");
    //           // setModal(!modal);
    //         })
    //         .catch((error) => {
    //           toast.error("Error adding document: ");
    //         });
    //     } else {
    //       db.collection("products")
    //         .doc(id.id)
    //         .update({
    //           productName: data?.product_name,
    //           catId: data?.product_cat,
    //           startTime: data?.start_time,
    //           endTime: data?.end_time,
    //           startingBid: data?.starting_bid,
    //           imageUrl: url,
    //           bids: [],
    //         })
    //         .then(() => {
    //           setBtnUpdateBool(false);
    //           setBtnBool(false);
    //           toast.success("Document successfully updated!");
    //           history.push("/vendor-dash");
    //         })
    //         .catch((error) => {
    //           setBtnBool(false);
    //           toast.error("Error adding document: ");
    //         });
    //     }
    //   });
    // });
  };
  const imageHandlerOnchange = (e) => {
    let file = e?.target?.files;
    setImageArr([...imageArr, ...file]);
  };
  const deleteImageHandler = (i) => {
    let dup = [...imageArr];
    let filtData = dup.filter((x, index) => index !== i);

    setImageArr(filtData);
  };

  const imageUploadHandler = (data) => {
    return new Promise((resolve, reject) => {
      try {
        let storageRef = firebase.storage().ref("productImages/" + data?.name);
        storageRef.put(data).then(function () {
          storageRef.getDownloadURL().then(function (url) {
            // return url;
            resolve(url);
          });
        });
        // resolve(storageRef);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <div>
      <div className="container-admin">
        {/* <VendorSidebar toggleBool={toggleBool} /> */}
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

          <div className="vendor-dashboard-card-wrapper">
            <div className="vendor-container-category-wrapper">
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
                    {errors.end_time && <p>Must be greater than start time</p>}
                  </div>

                  <div className="form-input-vendor">
                    <span>Starting Bid</span>
                    <input
                      type="number"
                      onChange={(e) => console.log(e)}
                      {...register("starting_bid", { required: true })}
                    />
                    {errors.starting_bid &&
                      errors.starting_bid.type === "required" && (
                        <p>This is required</p>
                      )}
                  </div>

                  <div className="form-input-vendor">
                    <span>Choose Image</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      {...register("image_file", {
                        required: true,
                        onChange: (e) => imageHandlerOnchange(e),
                        // accept:"image/*"
                      })}
                    />
                    {errors.image_file &&
                      errors.image_file.type === "required" && (
                        <p>This is required</p>
                      )}
                  </div>

                  <div className="form-input-vendor">
                    {btnUpdateBool === false ? (
                      btnBool === false ? (
                        <button type="submit">Add Product</button>
                      ) : (
                        <button type="submit" disabled>
                          {" "}
                          <div className="spinner-border spinner-border-sm">
                            {" "}
                          </div>{" "}
                          Add Product
                        </button>
                      )
                    ) : btnBool === false ? (
                      <button type="submit">Update Product</button>
                    ) : (
                      <button type="submit" disabled>
                        {" "}
                        <div className="spinner-border spinner-border-sm">
                          {" "}
                        </div>{" "}
                        Update Product
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
          {imageArr && imageArr.length ? (
            <div className="vendor-container-category-wrapper">
              <div className="image-form">
                {imageArr.map((item, index) => {
                  // console.log(item);
                  return (
                    <div className="image-card" key={index}>
                      <div className="image-overlay-icon">
                        <button
                          className="btn-close"
                          onClick={() => deleteImageHandler(index)}
                        >
                          <FaTimesCircle />
                        </button>
                      </div>
                      <img src={URL.createObjectURL(item)} alt="image" />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
