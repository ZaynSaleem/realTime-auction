import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import BreadCrumb from "../../../components/breadCrumb";
import Navbar from "../../../components/header/Navbar";
import Card from "../../../components/Cards/Card";
import Loader from "../../../components/Loader/loader";
import { db } from "../../../config/firebase/firebase";
import { useHistory } from "react-router-dom";
import './style.css'
const MultipleProducts = () => {
  const Data = useSelector((state) => state?.auth.auth);
  let history = useHistory();

  const [product, setProduct] = useState([]);
  const [loaderBool, setLoaderBool] = useState(false);

  useEffect(() => {
    setLoaderBool(true);
    let arr = [];

    db.collection("products")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (
            doc?.data()?.timerStatus === "Ongoing" &&
            !doc?.data()?.productStatus
          ) {
            let obj = doc?.data();
            obj.id = doc?.id;

            arr.push(obj);
          }
        });
        setProduct(arr);
        setLoaderBool(false);
      });
  }, []);
  const toggleProduct = (item) => {
    let str = item?.productName;
    str = str.replace(/\s+/g, "-").toLowerCase();

    history.push(`/product/${item?.id}/${str}`);
  };

  return loaderBool && loaderBool ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      <Navbar />
      <BreadCrumb title="Products" />
      <div className="main-content">
        <div className="custom_container">
          <div className="card-wrapper-product">
            {product && product?.length
              ? product.map((item, index) => {
                  return (
                    <Card
                      roles={Data[0]?.role}
                      image={item?.imageUrl[0]}
                      productname={item?.productName}
                      category={item?.catId}
                      bids={item?.bids?.length}
                      startTime={item?.startTime}
                      endTime={item?.endTime}
                      items={item}
                      toggleProduct={toggleProduct}
                    />
                  );
                })
              : "No product in current"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleProducts;