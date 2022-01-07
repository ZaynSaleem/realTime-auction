import React, { useEffect, useState } from "react";
import Navbar from "../../../components/header/Navbar";
import Slider from "react-slick";
import card1 from "../../../assets/card1.jpg";
import card2 from "../../../assets/card2.jpg";
import card3 from "../../../assets/card3.jpg";
import card4 from "../../../assets/card4.jpg";
import BreadCrumb from "../../../components/breadCrumb";
import Footer from "../../../components/footer/Footer";
import "./style.css";
import { useParams } from "react-router-dom";
import { db } from "../../../config/firebase/firebase";
import { useSelector } from "react-redux";

const Product = () => {
  const params = useParams();
  const Data = useSelector((state) => state?.auth.auth);

  const [tabId, setTabId] = useState("history");
  const [product, setProduct] = useState("");
  const [day, setDay] = useState("00");
  const [hour, setHour] = useState("00");
  const [min, setMin] = useState("00");
  const [sec, setSec] = useState("00");
  const [status, setStatus] = useState("");
  const [bidValue, setBidValue] = useState("");
  //   const settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //   };

  useEffect(() => {
    console.log(Data);
    console.log(new Date().toString());
    db.collection("products")
      .doc(params?.id)
      .get()
      .then((doc) => {
        // console.log("Function Useeffect Up");

        // setProduct(doc?.data())
        // console.log(doc?.data());
        db.collection("category")
          .doc(doc?.data()?.catId)
          .get()
          .then((item) => {
            let dup = doc.data();
            dup.catId = item?.data()?.categoryName;
            setProduct(dup);
            // console.log("Function Useeffect");
            timerCountdown(doc.data()?.startTime, doc.data()?.endTime);
            // console.log(dup);
          });
      });
    // console.log(params?.id);
    // console.log(params);
    // console.log(role, "Product");
  }, []);

  const timerCountdown = (startTime, endTime) => {
    if (new Date(startTime).getTime() < new Date().getTime()) {
      if (endTime) {
        let countDownDate = new Date(endTime).getTime();

        // statusHandler(id, "Ongoing");
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
            // setStatus("EXPIRED");
            // statusHandler(props.id, "Expired");
          }
        }, 1000);
      }
    }
  };
  const bidsHandler = () => {
    // let arr = [];
    if (bidValue > product?.startingBid) {
      let dupProduct = product;
      let obj = {
        uid: Data[0]?.uid,
        bidPrice: +bidValue,
        bidDate: new Date().toString(),
        userName: Data[0]?.name,
      };
      // arr.push(obj);
      dupProduct?.bids?.push(obj);
      setProduct(dupProduct);
      // product?.bids?.push(obj);
      // console.log(dupProduct?.bids, "Dup PRoduct");
      db.collection("products")
        .doc(params?.id)
        .update({
          bids: dupProduct?.bids,
        })
        .then(() => {
          alert("Bid Submitted");
        });
    } else {
      alert("Must be greater than starting bid");
      return false;
    }
  };

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={`https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg`}
            width={50}
          />
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
  return (
    <div>
      {/* {console.log(product?.productName)} */}
      <Navbar />
      <BreadCrumb title={product?.productName} />
      <div className="main-content">
        <div className="custom_container">
          <div className="product-detail-wrapper">
            <div className="lazy-slider">
              <Slider {...settings}>
                <div>
                  <img src={card1} />
                </div>
                <div>
                  <img src={card2} />
                </div>
                <div>
                  <img src={card3} />
                </div>
              </Slider>
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

              {/* <p className="auction-condition">Item condition: New</p> */}

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

              <div className="auction-timer">
                Time left:
                <div className="auction-countdown">
                  {/* <div className="auction-months">
                    <h4>4</h4>
                    <span>Months</span>
                  </div>{" "}
                  <div className="auction-weeks">
                    <span>
                      <h4>3</h4>Weeks
                    </span>
                  </div>{" "} */}
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
                  {Data[0]?.role && Data[0]?.role === "user" ? (
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
                Going forward knowledge is power or we need to button up our
                approach old boys club. Please use “solutionise” instead of
                solution ideas! 🙂 draw a line in the sand, for take five, punch
                the tree, and come back in here with a clear head. Out of scope
                data-point work flows , nor critical mass, and time to open the
                kimono yet move the needle.
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
