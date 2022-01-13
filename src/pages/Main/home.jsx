import React, { useEffect, useState } from "react";

import Navbar from "../../components/header/Navbar";
import Slider from "../../components/Slider/Slider";
import card1 from "../../assets/card1.jpg";
import card2 from "../../assets/card2.jpg";
import card3 from "../../assets/card3.jpg";
import card4 from "../../assets/card4.jpg";
import logo from "../../assets/logo-ibid.png";
import "./style.css";
import Card from "../../components/Cards/Card";
import {
  FaAngleRight,
  FaUserAlt,
  FaGlassMartini,
  FaTrophy,
  FaRegMoneyBillAlt,
  FaGavel,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import StepsCard from "../../components/Cards/StepsCard";
import Footer from "../../components/footer/Footer";
import sliderImage from "../../assets/sliderHome.jpg";
import { db } from "../../config/firebase/firebase";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/loader";

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

            arr.push(obj);
          }
        });
        setProductData(arr);
        setLoaderBool(false);
      });
  };
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
      {/* <Navbar /> */}
      <div className="navbar-tops">
        <div className="custom_container">
          <div className="navbar-top-content">
            <div className="call-us">Call us toll free: +1-541-754-3010</div>
            <div className="send-email">
              Send us an email: contact@example.com
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-wrapper">
        <div className="custom_container">
          <div className="navbar-content">
            <div className="navbar-content-logo">
              <img src={logo} />
            </div>
            <div className="navbar-content-items">
              <div className="item-link">
                <a href="#">Home</a>
              </div>
              <div className="item-link">
                <a href="#">Products</a>
              </div>
              <div className="item-link">
                <a href="#">Buy</a>
              </div>
              <div className="item-link">
                <a href="#">Sell</a>
              </div>
              <div className="item-link">
                <a href="#">About</a>
              </div>
            </div>
            <div className="sign-in-button">
              <button>SignIn</button>
            </div>
          </div>
        </div>
      </div>

      <Slider image={sliderImage} />
      <div className="main-content">
        <div className="custom_container">
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
            <div className="home-card">
              <div className="card-image">
                <img src={card1} />
                <div className="timer-card">20d 6h 26m 26s</div>
                <div className="gavel-bid">
                  <button>
                    <FaGavel />
                  </button>
                </div>
              </div>
              <div className="content-card">
                <div className="title-card">Dual Sim Smartphone</div>
                <div className="price-card">
                  current bid:<span>$151</span>
                </div>
              </div>
            </div>
            <div className="home-card">
              <div className="card-image">
                <img src={card2} />
                <div className="timer-card">20d 6h 26m 26s</div>
                <div className="gavel-bid">
                  <button>
                    <FaGavel />
                  </button>
                </div>
              </div>
              <div className="content-card">
                <div className="title-card">Dual Sim Smartphone</div>
                <div className="price-card">
                  current bid:<span>$151</span>
                </div>
              </div>
            </div>
            <div className="home-card">
              <div className="card-image">
                <img src={card3} />
                <div className="timer-card">20d 6h 26m 26s</div>
                <div className="gavel-bid">
                  <button>
                    <FaGavel />
                  </button>
                </div>
              </div>
              <div className="content-card">
                <div className="title-card">Dual Sim Smartphone</div>
                <div className="price-card">
                  current bid:<span>$151</span>
                </div>
              </div>
            </div>
            <div className="home-card">
              <div className="card-image">
                <img src={card4} />
                <div className="timer-card">20d 6h 26m 26s</div>
                <div className="gavel-bid">
                  <button>
                    <FaGavel />
                  </button>
                </div>
              </div>
              <div className="content-card">
                <div className="title-card">Dual Sim Smartphone</div>
                <div className="price-card">
                  current bid:<span>$151</span>
                </div>
              </div>
            </div>

            {/* {productData && productData?.length
              ? productData.map((item, index) => {
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
              : "No product in current"} */}
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
              <button>Register</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
