import "./style.css";
import React, { useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import ToggleMenu from "../../assets/toggleMenu.png";

import firebase, { db } from "../../config/firebase/firebase";
import VendorSidebar from "../../components/header/VendorSidebar";
import Topbar from "../../components/topbar/Topbar";
import BreadCrumb from "../../components/breadCrumb";
import Loader from "../../components/Loader/loader";

const AddProduct = () => {
  const id = useParams();

  const history = useHistory();

  const auth = useSelector((state) => state?.auth.auth);
  const [toggleBool, setToggleBool] = useState(false);
  const [btnBool, setBtnBool] = useState(false);
  const [loaderBool, setLoaderBool] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [minEndTime, setMinEndTime] = useState("");
  const [btnUpdateBool, setBtnUpdateBool] = useState(false);
  const [imageArr, setImageArr] = useState([]);
  const [category, setCategory] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({});

  const d = new Date();
  let text = d?.toISOString();
  useEffect(() => {
    if (startTime && startTime !== "") {
      let stDate = new Date(startTime);
      stDate.setHours(stDate.getHours() + 0);
      let end_t = stDate.toISOString();
      let et = end_t.split(".")[0];
      setMinEndTime(et);
    }
  }, [startTime]);

  useEffect(() => {
    setLoaderBool(true);
    categoryCaller();
    if (id.id && id.id !== "") {
      setBtnUpdateBool(true);
      db.collection("products")
        .doc(id.id)
        .get()
        .then((doc) => {
          setValue("product_name", doc?.data()?.productName);
          setValue("product_cat", doc?.data()?.catId);
          setValue("start_time", doc?.data()?.startTime);
          setValue("end_time", doc?.data()?.endTime);
          setValue("starting_bid", doc?.data()?.startingBid);
          setValue("image_file", doc?.data()?.imageUrl);
          setValue("description", doc?.data()?.description);
          setImageArr(doc?.data()?.imageUrl);
          setLoaderBool(false);
        })
        .catch((error) => {
          toast.error("Error getting documents: ", error);
        });
    } else {
      setValue("product_name", "");
      setValue("product_cat", "");
      setValue("start_time", "");
      setValue("end_time", "");
      setValue("starting_bid", "");
      setValue("description", "");
      setImageArr([]);
      setLoaderBool(false);

      setBtnUpdateBool(false);
    }
  }, [id.id]);

  const toggleButton = () => {
    if (!toggleBool) {
      setToggleBool(true);
    } else {
      setToggleBool(!toggleBool);
    }
  };

  const categoryCaller = () => {
    let catArr = [];
    db.collection("category")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let obj = {
            catId: doc?.id,
            categoryname: doc?.data()?.categoryName,
          };
          catArr.push(obj);
        });
        setCategory(catArr);
      });
  };

  const onSubmit = async (data) => {
    setBtnBool(true);

    let fileUpload = [...imageArr];
    let urlArr = [];

    if (fileUpload && fileUpload?.length) {
      for (let i = 0; i < fileUpload?.length; i++) {
        let imageFunc = await imageUploadHandler(fileUpload[i]);

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
              timerStatus: "",
              adminStatus: false,
              productStatus: false,
              imageUrl: urlArr,
              bids: [],
              winner: "",
              description: data?.description,
            })
            .then((docRef) => {
              setBtnBool(false);
              toast.success("New Product Added!");
              history.push("/vendor-dash");
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
              description: data?.description,
              imageUrl: urlArr,
            })
            .then(() => {
              history.push("/vendor-dash");
              toast.success("Document successfully updated!");
              setBtnUpdateBool(false);
              setBtnBool(false);
            })
            .catch((error) => {
              toast.error("Error adding document: ");
              setBtnBool(false);
            });
        }
      }
    }
  };
  const imageHandlerOnchange = (e) => {
    let file = e?.target?.files;
    setImageArr([...imageArr, ...file]);
  };
  const deleteImageHandler = (item, i) => {
    if (window.confirm("Are you sure you want to delete?")) {
      let dup = [...imageArr];
      let filtData = dup.filter((x, index) => index !== i);
      setImageArr(filtData);

      if (btnUpdateBool) {
        let storageRef = firebase.storage().refFromURL(item);

        storageRef
          .delete()
          .then(() => {
            toast.success("deleted");

            db.collection("products")
              .doc(id.id)
              .update({
                imageUrl: filtData,
              })
              .catch((error) => {
                setBtnBool(false);
                toast.error(error);
              });
          })
          .catch((error) => {
            toast.error(error);
          });
        setImageArr(filtData);
      }

      setImageArr(filtData);
    }
  };

  const imageUploadHandler = (data) => {
    return new Promise((resolve, reject) => {
      try {
        let storageRef = firebase
          .storage()
          .ref("productImages/" + data?.name + new Date().getTime());
        storageRef.put(data).then(function () {
          storageRef.getDownloadURL().then(function (url) {
            resolve(url);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
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
              <BreadCrumb title="Add Product" bool={true} />

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
                        {category && category?.length
                          ? category?.map((item, index) => {
                              return (
                                <option key={index} value={item?.catId}>
                                  {item?.categoryname}
                                </option>
                              );
                            })
                          : ""}
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
                      <span>Choose Image</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        {...register("image_file", {
                          required: true,
                          onChange: (e) => imageHandlerOnchange(e),
                        })}
                      />
                      {errors.image_file &&
                        errors.image_file.type === "required" && (
                          <p>This is required</p>
                        )}
                    </div>

                    <div className="form-input-vendor">
                      <span>Description</span>
                      <textarea
                        className="form-control"
                        name="description"
                        {...register("description", { required: true })}
                        type="text"
                      ></textarea>
                      {errors.description &&
                        errors.description.type === "required" && (
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
                          Updating
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {imageArr && imageArr?.length ? (
            <div className="vendor-container-category-wrapper">
              <div className="image-form">
                {imageArr?.map((item, index) => {
                  return (
                    <div className="image-card" key={index}>
                      <div className="image-overlay-icon">
                        <button
                          className="btn-close"
                          onClick={() => deleteImageHandler(item, index)}
                        >
                          <FaTimesCircle />
                        </button>
                      </div>
                      {!btnUpdateBool ? (
                        <img src={URL.createObjectURL(item)} alt="image" />
                      ) : item && item?.length ? (
                        <img src={item} alt="image" />
                      ) : (
                        <img src={URL.createObjectURL(item)} alt="image" />
                      )}
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
