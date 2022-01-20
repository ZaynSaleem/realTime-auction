import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import BreadCrumb from "../../../components/breadCrumb";
import Navbar from "../../../components/header/Navbar";
import Loader from "../../../components/Loader/loader";
import { db } from "../../../config/firebase/firebase";
import { useHistory } from "react-router-dom";
import "./style.css";
import InformationLine from "../../../components/informationline";
import ProductCard from "../../../components/Cards/productscard";
import Footer from "../../../components/footer/Footer";
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
          <div className="card-main">
            {product && product?.length ? (
              product.map((item, index) => {
                return (
                  <ProductCard
                    key={index}
                    roles={Data[0]?.role}
                    image={
                      item?.imageUrl && item?.imageUrl?.length
                        ? item?.imageUrl[0]
                        : ""
                    }
                    productname={item?.productName}
                    bids={item?.bids?.length}
                    startTime={item?.startTime}
                    endTime={item?.endTime}
                    items={item}
                  />
                );
              })
            ) : (
              <InformationLine title="No Product in latest Auction" />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MultipleProducts;
