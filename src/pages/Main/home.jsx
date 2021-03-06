import "./style.css";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaAngleRight,
  FaUserAlt,
  FaGlassMartini,
  FaTrophy,
  FaRegMoneyBillAlt,
  FaGavel,
} from "react-icons/fa";

import { db } from "../../config/firebase/firebase";
import supportIcon from "../../assets/support.png";
import trackingIcon from "../../assets/tracking.png";
import moneyIcon from "../../assets/money_icons.png";
import deliveryIcon from "../../assets/deliveries.png";
import imageNotFound from "../../assets/404Home.jpg";
import sliderImage from "../../assets/sliderHome-min.jpg";

const Navbar = lazy(() => import("../../components/header/Navbar"));

const Slider = lazy(() => import("../../components/Slider/Slider"));

const StepsCard = lazy(() => import("../../components/Cards/StepsCard"));
const Footer = lazy(() => import("../../components/footer/Footer"));
const Loader = lazy(() => import("../../components/Loader/loader"));
const ProductCard = lazy(() => import("../../components/Cards/productscard"));
const InformationLine = lazy(() => import("../../components/informationline"));

const Home = () => {
  let history = useHistory();
  const Data = useSelector((state) => state?.auth.auth);

  const [productData, setProductData] = useState([]);
  const [loaderBool, setLoaderBool] = useState(false);

  useEffect(() => {
    productsHandler();
  }, []);

  const productsHandler = () => {
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
            let obj = doc.data();
            obj.id = doc?.id;

            if (arr && arr?.length > 3) {
              return false;
            } else {
              arr.push(obj);
            }
          }
        });

        setProductData(arr);
        setLoaderBool(false);
      });
  };

  return (
    <Suspense fallback={<div></div>}>
      {loaderBool && loaderBool ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <Navbar />

          <Slider image={sliderImage} />

          <div className="main-content">
            <div className="custom_container">
              <div className="detail-card-wrapper">
                <div className="detail-card">
                  <div className="detail-card-image">
                    <img
                      src={supportIcon}
                      alt="image"
                      height="72px"
                      width="57px"
                    />
                  </div>
                  <div className="detail-text-wrapper">
                    <h4>Call Center</h4>
                    <p>Objectively empowered</p>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-card-image">
                    <img
                      src={trackingIcon}
                      alt="image"
                      height="72px"
                      width="57px"
                    />
                  </div>
                  <div className="detail-text-wrapper">
                    <h4>Order Tracking</h4>
                    <p>Objectively empowered</p>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-card-image">
                    <img
                      src={deliveryIcon}
                      alt="image"
                      height="72px"
                      width="57px"
                    />
                  </div>
                  <div className="detail-text-wrapper">
                    <h4>Fatest Delivery</h4>
                    <p>Efficiently unleash media</p>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-card-image">
                    <img
                      src={moneyIcon}
                      alt="image"
                      height="72px"
                      width="57px"
                    />
                  </div>
                  <div className="detail-text-wrapper">
                    <h4>Instant Buying</h4>
                    <p>Podcasting operational</p>
                  </div>
                </div>
              </div>

              <div className="main-content-head">
                <div className="text-content">
                  <h1>LATEST AUCTION</h1>
                </div>
                <div className="line-gavel-wrapper">
                  <div className="line-gavel">
                    <hr />
                  </div>
                  <div className="icon-gavel">
                    <FaGavel />
                  </div>
                </div>
              </div>
              <div className="card-main">
                {productData && productData?.length ? (
                  productData.map((item, index) => {
                    return (
                      <ProductCard
                        roles={Data[0]?.role}
                        image={
                          item?.imageUrl?.length
                            ? item?.imageUrl[0]
                            : imageNotFound
                        }
                        productname={item?.productName}
                        bids={item?.bids?.length}
                        startTime={item?.startTime}
                        endTime={item?.endTime}
                        items={item}
                        key={index}
                      />
                    );
                  })
                ) : (
                  <InformationLine title="No Product in latest Auction" />
                )}
              </div>
            </div>
          </div>

          <div className="steps-wrapper">
            <div className="custom_container">
              <div className="steps-head">
                <div className="head-text">
                  <p> How ?</p>{" "}
                  <h1>
                    How <span>It Works</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="steps-card-wrapper">
                <StepsCard
                  circleIcon={<FaUserAlt />}
                  angleIcon={<FaAngleRight size={25} />}
                  head="Register"
                  bodyText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed consequatur quaerat magnam sequi nobis ut et iure."
                />
                <StepsCard
                  circleIcon={<FaRegMoneyBillAlt />}
                  angleIcon={<FaAngleRight size={25} />}
                  head="Buy or Bid"
                  bodyText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed consequatur quaerat magnam sequi nobis ut et iure."
                />
                <StepsCard
                  circleIcon={<FaGlassMartini />}
                  angleIcon={<FaAngleRight size={25} />}
                  head="Submit a bid"
                  bodyText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed consequatur quaerat magnam sequi nobis ut et iure."
                />
                <StepsCard
                  circleIcon={<FaTrophy />}
                  head="Win"
                  bodyText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed consequatur quaerat magnam sequi nobis ut et iure."
                />
              </div>
            </div>
          </div>

          <div className="register-now-wrapper">
            <div className="custom_container">
              <div className="register-now-main">
                <div className="register-now-text">
                  <h1> Create an account and start Buy, Bid or Sell Now!</h1>
                </div>
                <div className="register-now-button">
                  <button onClick={() => history.push("/sign-up")}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      )}
    </Suspense>
  );
};

export default Home;
