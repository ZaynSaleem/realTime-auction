import "./style.css";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Navbar from "../../../components/header/Navbar";
import BreadCrumb from "../../../components/breadCrumb";
import Footer from "../../../components/footer/Footer";
import { useParams } from "react-router-dom";
import { db } from "../../../config/firebase/firebase";
import Loader from "../../../components/Loader/loader";
import notFound from "../../../assets/404.png";

const Product = () => {
  const params = useParams();
  const Data = useSelector((state) => state?.auth.auth);

  const [tabId, setTabId] = useState("history");
  const [product, setProduct] = useState("");
  const [day, setDay] = useState("00");
  const [hour, setHour] = useState("00");
  const [min, setMin] = useState("00");
  const [sec, setSec] = useState("00");
  const [bidValue, setBidValue] = useState("");
  const [maxBid, setMaxBid] = useState("");
  const [loaderBool, setLoaderBool] = useState(false);
  const [timerbool, setTimerbool] = useState(false);

  useEffect(() => {
    setLoaderBool(true);
    db.collection("products")
      .doc(params?.id)
      .get()
      .then((doc) => {
        if (doc?.data()?.bids && doc?.data()?.bids.length) {
          let shots = doc?.data()?.bids;
          let max = shots?.reduce((max, obj) =>
            max?.bidPrice > obj?.bidPrice ? max : obj
          );
          setMaxBid(max?.bidPrice);
        } else {
          setMaxBid(doc?.data()?.startingBid);
        }

        db.collection("category")
          .doc(doc?.data()?.catId)
          .get()
          .then((item) => {
            let dup = doc?.data();
            dup.catId = item?.data()?.categoryName;
            setProduct(dup);
            if (item?.data()?.timerStatus === "Expired") {
              setTimerbool(true);
            } else {
              setTimerbool(false);
            }
            timerCountdown(doc?.data()?.startTime, doc?.data()?.endTime);
            setLoaderBool(false);
          });
      });
  }, []);

  const timerCountdown = (startTime, endTime) => {
    if (new Date(startTime).getTime() < new Date().getTime()) {
      if (endTime) {
        let countDownDate = new Date(endTime).getTime();

        let x = setInterval(function () {
          let now = new Date().getTime();

          let distance = countDownDate - now;

          setDay(Math.floor(distance / (1000 * 60 * 60 * 24)));
          setHour(
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          );
          setMin(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
          setSec(Math.floor((distance % (1000 * 60)) / 1000));

          if (distance < 0) {
            clearInterval(x);
            setTimerbool(true);
            setDay(0);
            setHour(Math.floor("0"));
            setMin("0");
            setSec("0");

            db.collection("products")
              .doc(params?.id)
              .update({
                timerStatus: "Expired",
              })
              .catch((error) => {
                toast.error(error);
              });
          }
        }, 1000);
      }
    }
  };
  const bidsHandler = () => {
    if (bidValue > maxBid) {
      let dupProduct = product;
      let obj = {
        uid: Data[0]?.uid,
        bidPrice: +bidValue,
        bidDate: new Date().toString(),
        userName: Data[0]?.name,
      };

      dupProduct?.bids?.push(obj);
      setProduct(dupProduct);

      db.collection("products")
        .doc(params?.id)
        .update({
          bids: dupProduct?.bids,
        })
        .then(() => {
          alert("Bid Submitted");
        });
    } else {
      alert("Must be greater than " + maxBid);
      return false;
    }
  };

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={product?.imageUrl[i]} width={50} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return loaderBool && loaderBool ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      <Navbar />
      <BreadCrumb title={product?.productName} />
      <div className="main-content">
        <div className="custom_container">
          <div className="product-detail-wrapper">
            <div className="lazy-slider">
              {product?.imageUrl && product?.imageUrl?.length ? (
                <Slider {...settings}>
                  {product?.imageUrl?.length ? (
                    product?.imageUrl.map((item, index) => {
                      return (
                        <div>
                          <img src={item} key={index} alt="image" />
                        </div>
                      );
                    })
                  ) : (
                    <div>
                      <img src={notFound} />
                    </div>
                  )}
                </Slider>
              ) : (
                ""
              )}
            </div>

            <div className="content-product">
              <div className="content-head">
                <h2>
                  Starting bid:{" "}
                  <span style={{ color: "#2695ff" }}>
                    $
                    {product?.startingBid
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </h2>
              </div>

              <div className="auction-description">
                <div className="auction-condition">Item condition: New</div>
                <div className="auction-sku">
                  SKU: <span>BF054</span>
                </div>
                <div className="auction-category">
                  Categories:{" "}
                  <span style={{ fontWeight: "700", color: "#686868" }}>
                    {product?.catId}
                  </span>
                </div>
              </div>

              {!timerbool ? (
                <div className="auction-timer">
                  <span>Time left:</span>
                  <div className="auction-countdown">
                    <div className="auction-days">
                      <span>
                        <h4>{day}</h4>days
                      </span>
                    </div>
                    <div className="auction-hours">
                      <span>
                        <h4>{hour}</h4>hours
                      </span>
                    </div>{" "}
                    <div className="auction-mintues">
                      <span>
                        <h4>{min}</h4>mintues
                      </span>
                    </div>
                    <div className="auction-seconds">
                      <span>
                        <h4>{sec}</h4>second
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="auction-timezone">
                <p>Auction ends: {product?.endTime}</p>
                <p>Timezone: GMT + 5</p>
              </div>
              <div className="make-a-bid">
                <div className="form-bid">
                  <input
                    type="number"
                    onChange={(e) => setBidValue(e.target.value)}
                    min={product?.startingBid}
                    defaultValue={product?.startingBid}
                    size="4"
                  />
                </div>
                <div className="btn-bid">
                  {Data[0]?.role && Data[0]?.role === "user" && !timerbool ? (
                    <button onClick={bidsHandler}>BID</button>
                  ) : (
                    <button
                      disabled
                      dataToggle="tooltip"
                      title="sign-in as a user to submit a bid"
                    >
                      BID
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="auction-tabs">
            <div className="button-description">
              <button
                className={tabId === "description" ? "active" : ""}
                onClick={() => setTabId("description")}
              >
                Description
              </button>
            </div>
            <div className="button-addition">
              <button
                className={tabId === "information" ? "active" : ""}
                onClick={() => setTabId("information")}
              >
                {" "}
                Addtional information
              </button>
            </div>
            <div className="button-history">
              <button
                className={tabId === "history" ? "active" : ""}
                onClick={() => setTabId("history")}
              >
                {" "}
                Auction History
              </button>
            </div>
            <div className="button-vendorinfo">
              <button
                className={tabId === "vendorinfo" ? "active" : ""}
                onClick={() => setTabId("vendorinfo")}
              >
                {" "}
                Vendor Info
              </button>
            </div>
          </div>

          <div className="auction-tabcontent">
            <div
              className="content-description"
              id="description"
              style={
                tabId === "description"
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <p>
                {product?.description ? product?.description : "No description"}
              </p>
            </div>
            <div
              className="content-information"
              id="information"
              style={
                tabId === "information"
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <table class="table" bordered>
                <tbody>
                  <tr>
                    <td scope="row" className="td-custom">
                      Color
                    </td>
                    <td>White</td>
                  </tr>
                  <tr>
                    <td scope="row" className="td-custom">
                      Condition
                    </td>
                    <td>New</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              className="auction-history"
              style={
                tabId === "history" ? { display: "block" } : { display: "none" }
              }
            >
              <table>
                <thead>
                  <tr>
                    <td>Date</td>
                    <td>Bid</td>
                    <td>User</td>
                    <td>Auto</td>
                  </tr>
                </thead>
                <tbody>
                  {product?.bids?.length ? (
                    product?.bids?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{new Date(item?.bidDate).toDateString()}</td>
                          <td className="table-bid-price">${item?.bidPrice}</td>
                          <td>{item?.userName ? item?.userName : "na"}</td>
                          <td></td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>No bids</tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
