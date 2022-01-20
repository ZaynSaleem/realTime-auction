import React, { lazy, Suspense, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../../config/firebase/firebase";
import "./style.css";

const InformationLine = lazy(() =>
  import("../../../components/informationline")
);

const ProductCard = lazy(() =>
  import("../../../components/Cards/productscard")
);
const Footer = lazy(() => import("../../../components/footer/Footer"));
const BreadCrumb = lazy(() => import("../../../components/breadCrumb"));
const Navbar = lazy(() => import("../../../components/header/Navbar"));
const Loader = lazy(() => import("../../../components/Loader/loader"));

const MultipleProducts = () => {
  const Data = useSelector((state) => state?.auth.auth);

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

  return (
    <Suspense fallback={<div></div>}>
      {loaderBool && loaderBool ? (
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
      )}
    </Suspense>
  );
};

export default MultipleProducts;
